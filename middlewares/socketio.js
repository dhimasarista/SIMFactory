const socketMiddleware = (io) => {

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Mengirim pesan saat klien terhubung
    socket.emit('message', 'Welcome to the server!');

    // Menerima pesan dari klien
    socket.on('chatMessage', (message) => {
      console.log('Received chat message:', message);
      // Broadcast pesan kepada semua klien
      io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = socketMiddleware;
