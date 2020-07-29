const io = require('socket.io')();

// socket.io connection
io.on('connection', (socket) => {
    // Accept a login event with user's data
    socket.on("login", userdata => {
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
    });

    // This event will create one room for each list and we can broadcast notifications through those rooms
    socket.on('joinCollaborativeList',(list)=>{
        socket.join(list.title);
    });

});

module.exports = io;
