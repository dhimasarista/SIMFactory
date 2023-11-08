const session = require('express-session');
const secretCode = require("../utils/secretCode");

const sessionSetup = (app) => {
    app.use(session({
        secret: secretCode,
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 60 * 60 * 1000, // Waktu kedaluwarsa sesi dalam milidetik (contoh: 1 jam)
          // secure: true, // Hanya kirim cookie melalui HTTPS
          // httpOnly: true, // Lindungi cookie dari akses JavaScript di sisi klien
          // signed: true
        },
      }));

    app.use((req, res, next) => {
      if (req.session && req.session.user) {
        // Pengguna aktif, perbarui waktu kedaluwarsa sesi
        req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000); // Perbarui sesi menjadi 1 jam lagi
        req.session.cookie.maxAge = 60 * 60 * 1000;
      }
      next();
    })
}

module.exports = sessionSetup;