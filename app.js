// Import Modules
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require('express-flash');
const path = require('path');
const { blue, symbol } = require("./utils/logging");
const dhim = require("./utils/dhim_codehub");
const setupRoutes = require("./routes/routes");
const userAuthorization = require("./middlewares/userAuthorization");
const sessionSetup = require("./middlewares/sessionSetup");

// Create an Express app
const app = express();

console.clear();
console.log(dhim);

// Middlewares
sessionSetup(app); // Session
app.use(flash());
app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); // Parsing Permintaan JSON
app.use(cookieParser()); // Menggunakan cookie-parser
userAuthorization(app);

// Routes
setupRoutes(app);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(blue, `${symbol} Server started on http://localhost:${port}`);
});
