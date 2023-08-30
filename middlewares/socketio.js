// socketio.js
const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {
        console.log('A user connected ' + socket);
        // Handle other socket events here
    });

    return io;
};
