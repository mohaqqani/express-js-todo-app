// import model
import Users from '../models/users.model';

// import utils and helpers
import PrintLog from '../utils/req-body-logger';
import * as EmailUtils from '../utils/email-utils';

export const login = (req, res) => {
    PrintLog('login', req.body);
    Users.find({ userName: req.body.userName, password: req.body.password, isActive: true }, (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            if (user.length) {
                return res.json({ 'success': true, 'message': 'User found successfully', user });
            } else {
                return res.json({ 'success': false, 'message': 'User with the given credentials not found' });
            }
        }
    });
}


export const register = (req, res) => {
    PrintLog('register', req.body);
    const newUser = new Users(req.body);
    newUser.save((err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {
            return res.json({ 'success': true, 'message': 'User Registered successfully', todo });
        }
    })
}
export const forgetPassword = (req, res) => {
    PrintLog('forget Password', req.body);
    Users.find({ userName: req.body.userName }).exec((err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        } else {

            let emailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: user.userName,
                subject: 'Todo App Password Reset',
                html: '' +
                    '<p> Dear User</p>' +
                    '<p>We have received your password change request for the account on Todo App. This email contains the updated password information to access the app</p>' +
                    '<p>Password: &nbsp;<b>' + user.password + '</b></p>' +
                    '<br/>' +
                    '<br/>' +
                    '<p>This is a system generated email. Do not reply</p>'
            };

            EmailUtils.transporter().sendMail(emailOptions, (err, info) => {
                if (err) {
                    return res.json({ 'success': false, 'message': 'Some Error' });
                } else {
                    PrintLog('forgetPassword Email Response',info)
                    return res.json({ 'success': true, 'message': 'Email Sent to registered email address' });
                }
            })
        }
    })

}
