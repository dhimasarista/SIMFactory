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
  new Employee(app).setupEmployeeRoutes(); 
  new Department(app).setupDepartmentRoutes();
  new Material(app).render() //
  new Login(app).render(); // Halaman autentikasi
  new Login(app).post(); // Melakukan validasi
  new Logout(app).clearAndRedirect(); // Routing logout melalui path /logout
  new Administrator(app).getAndRender(); // Halaman Administrator
  new Administrator(app).searchEmployeeById(); // Mencari employee dengan id
  new Administrator(app).getEmployeeById(); // Kemudian menampilkan hasil pencarian
  new Administrator(app).addUser(); // Jika ada, Tambahkan sebagai user
  new Administrator(app).editUser(); // Update User berupa username dan password
  new Administrator(app).deleteUser(); // Menghapus user
  new User(app).renderUserProfile(); // Halaman profile user
  new User(app).updateUser(); // Memperbarui data user
  new Errors500(app).error500(); // Error dibagian internal server
  new Errors400(app).error404(); // Error ketika dia yang kamu cari tidak ada

  new Uploads(app).uploadImage();
  new Uploads(app).deleteImage();
  new Uploads(app).uploadPdf();
  new Uploads(app).deletePdf();
};

module.exports = setupRoutes;
