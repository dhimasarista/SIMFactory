// socketio.js
const socketIO = require('socket.io');

const setupSocketIO =  (server) => {
  const io = socketIO(server);

// Daftar pengguna yang telah masuk
const loggedInUsers = {};

  // Konfigurasi Socket.IO
  io.on('connection', socket => {
    console.log('User connected:', socket.id);
  
    // Menghandle event saat pengguna masuk
    socket.on('userLoggedIn', userId => {
      socket.join(userId);
      loggedInUsers[userId] = true;
  
      // Mengirim pemberitahuan ke pengguna lain yang telah masuk sebelumnya
      for (const otherUserId in loggedInUsers) {
        if (otherUserId !== userId) {
          socket.to(otherUserId).emit('otherUserLoggedIn', userId);
        }
      }
  
      console.log(`User with ID ${userId} logged in`);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      // Menghapus pengguna dari daftar saat keluar
      for (const userId in loggedInUsers) {
        if (socket.id === loggedInUsers[userId]) {
          delete loggedInUsers[userId];
          break;
        }
      }
    });
  });

  return io;
};

module.exports = setupSocketIO;
