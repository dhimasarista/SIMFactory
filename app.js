// Import Modules
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const Index = require("./routes/Index");
const { ProductionControl } = require("./routes/Production");
const { Employee } = require("./routes/HumanResource");
const { Login, Logout } = require("./routes/Authentication");
const pool = require("./configs/database");
const admins = require("./models/admins");
const employees = require("./models/employees");
const { blue, symbol } = require("./utils/logging");

// Create an Express app
const app = express();
const promisePool = pool.promise();

console.clear();
// Models
admins(pool);
employees(pool);

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
});

// Routes
new Index(app).get();
new ProductionControl(app).get();
new Employee(app).get();
new Login(app).get();
new Login(app).post(promisePool);
new Logout(app).get();

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(blue, `${symbol} Server started on http://localhost:${port}`);
});
