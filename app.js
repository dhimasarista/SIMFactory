// Import Modules
const dotenv = require('dotenv'); // Hanya menggunakan file .env
const cookieParser = require("cookie-parser");
const express = require("express");
// const flash = require('express-flash');
const path = require('path');
const compression = require('compression');

// Import Kode lainnya
const { blue, symbol, magenta, qm } = require("./utils/logging");
const dhim = require("./utils/dhim");
const setupRoutes = require("./routes/routes");
const userAuthorization = require("./middlewares/userAuthorization");
const sessionSetup = require("./middlewares/sessionSetup");

// Cluster Module
const cluster = require("cluster");
const { unMatchedRoutes, internalServer } = require('./middlewares/error');
const numCPUs = require("os").cpus().length;

const app = express(); // Inisialisasi Aplikasi Express
dotenv.config(); // Load variabel environment dari file .env

if (cluster.isMaster) {
  // Fork workers setiap CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // Penanganan Worker
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {

  // Logging
  console.clear();
  console.log(dhim);
  console.log(magenta, `${qm} Starting ${numCPUs} workers...`);

  // Middlewares
  app.use(compression()); // Kompresi HTTP Resources yang dikirimkan ke klien
  sessionSetup(app); // Session
  // app.use(flash());
  app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
  app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
  app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
  app.use(express.urlencoded({extended: true})); 
  app.use(express.json()); // Parsing Permintaan JSON
  app.use(cookieParser()); // Menggunakan cookie-parser
  // app.use(cacheMiddleware); // Caching secara global
  userAuthorization(app);

  // Routes
  setupRoutes(app);

  // Middleware untuk menangani error
  unMatchedRoutes(app); // 404
  internalServer(app); // 500

  // Start the server
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(blue, `${symbol} Server started on http://localhost:${port}`);
  });
}
