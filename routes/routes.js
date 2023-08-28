const { ProductionControl } = require("./Production");
const { Employee, Department } = require("./HumanResource");
const { Login, Logout } = require("./Authentication");
const { Administrator, User} = require("./Administrator");
const Index = require("./Index");
const { Errors500, Errors400 } = require("./Erros");
const { Uploads } = require("./Uploads");
const { Material } = require("./Warehouse");

const setupRoutes = (app) => {
  new Index(app).index(); // Halaman Utama
  new ProductionControl(app).getAndRender(); // Halaman production/control

  // Done
  new Employee(app).setupEmployeeRoutes(); 
  new Department(app).setupDepartmentRoutes();
  new Administrator(app).setupAdministratorRoutes(); 
  new User(app).setupUserRoutes();
  new Login(app).setupLoginRoutes();
  new Logout(app).clearAndRedirect(); // Routing logout melalui path /logout
  
  new Errors500(app).error500(); // Error dibagian internal server
  new Errors400(app).error404(); // Error ketika dia yang kamu cari tidak ada
  
  new Material(app).render();
  
  new Uploads(app).uploadImage();
  new Uploads(app).deleteImage();
  new Uploads(app).uploadPdf();
  new Uploads(app).deletePdf();
};

module.exports = setupRoutes;
