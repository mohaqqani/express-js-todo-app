import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import bb from 'express-busboy';
import createError from 'http-errors';
import http from 'http';
import socket from 'socket.io';
import session from 'express-session';
import sharedSession from 'express-socket.io-session';

import io from './utils/socket-utils';

import todoListRoutes from './routes/todo-list.route';
import userRoutes from './routes/users.route';


const app = express();

// setting up socket connection
const server = http.Server(app);
// const io = socket(server);


//Using Busyboy for multipart/form-data
bb.extend(app);


app.use(session({
    secret: process.env.SESSION_SECRET || 'dummy',
    resave: true,
    saveUninitialized: true
}));


io.use(sharedSession(session));

// socket.io connection
// io.on('connection', (socket) => {
//     // Accept a login event with user's data
//     socket.on("login", userdata => {
//         console.log("loginSocket",userdata);
//         socket.handshake.session.userdata = userdata;
//         socket.handshake.session.save();
//     });
// });

// Middleware to allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// app configurations
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 8181;


// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todoCrudTask', {
    // useMongoClient: true,
});

// add Source Map Support for stack traces
SourceMapSupport.install();


app.use('/todoList', todoListRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    return res.end('Api working');
})

// catch 404

app.use((req, res, next) => {
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
})

// start the server
app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});
