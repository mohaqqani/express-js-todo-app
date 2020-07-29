import express from 'express';

//import controller file
import * as userController from '../controllers/users.controller';

// get an instance of express router
const router = express.Router();

router.route('/login')
    .post(userController.login);

router.route('/register')
    .post(userController.register);

router.route('/forgetPassword')
    .post(userController.forgetPassword);

export default router;
