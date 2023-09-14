const Production = require("./Production");
const { Employee, Department } = require("./HumanResource");
const { Login, Logout } = require("./Authentication");
const { Administrator, User} = require("./Administrator");
const Index = require("./Index");
const Errors = require("./Erros");
const Uploads= require("./Uploads");
const { Material } = require("./Warehouse");
const Testing = require("./Testing");
const Monitoring = require("./Monitoring");
const Engineering = require("./Engineering");

const setupRoutes = (app) => {
  new Index(app);
  new Employee(app  ); 
  new Department(app);
  new Production(app);
  new Administrator(app); 
  new User(app);
  new Login(app);
  new Logout(app);
  new Errors(app);
  new Material(app);
  new Uploads(app);
  new Monitoring(app);
  new Engineering(app);

  // Testing
  new Testing(app);
};

module.exports = setupRoutes;
