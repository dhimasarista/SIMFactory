// Import Modules
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const Index = require("./routes/Index");
const secretCode = require("./utils/secret_code")
const { ProductionControl } = require("./routes/Production");
const { Employee, Department } = require("./routes/HumanResource");
const { Login, Logout } = require("./routes/Authentication");
const { blue, symbol } = require("./utils/logging");
const dhim = require("./utils/dhim_codehub");

// Create an Express app
const app = express();

console.clear();
console.log(dhim);

// Middlewares
app.use(session({
  secret: secretCode,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.set('view engine', 'ejs'); // Mengatur View Engine ke EJS
app.set('views', path.join(__dirname, 'views')); // Mengatur path ke folder views
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files dari folder "public" 
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); // Parsing Permintaan JSON
app.use(cookieParser()); // Menggunakan cookie-parser
app.use((req, res, next) => {
  // Mengambil user dari cookies
  const user = req.cookies.user;
  // Jika tidak ada / belum login
  if (!user && req.originalUrl !== "/login") {
    // Maka semua path yang diakses akan dialihkan ke /login
    return res.redirect("/login");  
  }

  next();
});

// Routes
new Index(app).get();
new ProductionControl(app).get();
new Employee(app).get();
new Employee(app).post();
new Department(app).get();
new Department(app).post();
new Login(app).get();
new Login(app).post();
new Logout(app).get();

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(blue, `${symbol} Server started on http://localhost:${port}`);
});
