const session = require('express-session');
const secretCode = require("../utils/secret_code");

const sessionSetup = (app) => {
    app.use(session({
        secret: secretCode,
        resave: false,
        saveUninitialized: true
      }));
}

module.exports = sessionSetup;