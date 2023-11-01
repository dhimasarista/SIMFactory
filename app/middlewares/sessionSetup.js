const session = require('express-session');
const secretCode = require("../utils/secretCode");

const sessionSetup = (app) => {
    app.use(session({
        secret: secretCode,
        resave: true,
        saveUninitialized: true,
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