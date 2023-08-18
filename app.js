// Import Modules
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require('express-flash');
const path = require('path');
const { blue, symbol } = require("./utils/logging");
const dhim = require("./utils/dhim");
const setupRoutes = require("./routes/routes");
const userAuthorization = require("./middlewares/userAuthorization");
const sessionSetup = require("./middlewares/sessionSetup");
// Cluster Module
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

// Create an Express app
const app = express();

if (cluster.isMaster) {
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
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
  // app.use(cacheMiddleware); // Caching secara global
  userAuthorization(app);

  // Routes
  setupRoutes(app);

  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(blue, `${symbol} Server started on http://localhost:${port}`);
  });
}
