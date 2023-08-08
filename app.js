const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");

// Routes
const IndexRoute = require("./routes/IndexRoute");
const ProdMonitoringRoute = require("./routes/ProdMonitoring")
const {Login, Logout} = require("./routes/AuthRoutes");

//  DB Config
const pool = require("./configs/database");
const promisePool = pool.promise();
// Models
const admin = require("./models/admin");
const { blue, symbol } = require("./utils/logging");

// Create an Express app
const app = express();
admin(pool);

console.clear();

// Middlewares
app.set('view engine', 'ejs'); // Set view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Set the path to the "views" folder
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Use the cookie-parser
app.use((req, res, next) => {
  const user = req.cookies.user;
  if (!user && req.originalUrl !== "/login") {
    return res.redirect("/login");
  }

  next();
})
// Routes
new IndexRoute(app).get();
new ProdMonitoringRoute(app).prodMonitoringRoute();
new Login(app).get();
new Login(app).post(promisePool);
new Logout(app).get();


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(blue, `${symbol} Server started on http://localhost:${port}`);
});
