// Import Modules
const dotenv = require('dotenv'); // Menggunakan file .env
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require('path');
const compression = require('compression');
const cors = require("cors");
const http = require('http');

// Another Modules
const { blue, symbol } = require("./app/utils/logging");
const setupRoutes = require("./app/routes/routes");
const userAuthorization = require("./app/middlewares/userAuthorization");
const sessionSetup = require("./app/middlewares/sessionSetup");
const metrics = require('./app/middlewares/metrics');
const { unMatchedRoutes, internalServer } = require('./app/middlewares/error');
const LineTeam = require('./app/models/LineTeam');

// Main Code
const app = express(); // Inisialisasi Aplikasi Express
const port = process.env.PORT || 3000; // Mengatur Port server
const server = http.createServer(app); // Create HTTP server
dotenv.config(); // Load variabel environment dari file .env

// Middlewares
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": ['Content-Type', 'Authorization']
}));

metrics(app);
app.use(compression()); // Kompresi HTTP Resources yang dikirimkan ke klien
sessionSetup(app); // Session
app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parsing Permintaan JSON
app.use(cookieParser()); // Menggunakan cookie-parser
userAuthorization(app); // Autentikasi Aplikasi dan setiap rute yang ada

// Setup Routes
setupRoutes(app);
unMatchedRoutes(app); // 404
internalServer(app); // 500
new LineTeam().changeStatus();

// Start the server
server.listen(port, () => {
  console.clear();
  console.log(blue, `${symbol} Server started on http://localhost:${port}`);
});

