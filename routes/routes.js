const { ProductionControl } = require("./Production");
const { Employee, Department } = require("./HumanResource");
const { Login, Logout } = require("./Authentication");
const { Administrator, Profile} = require("./Administrator");
const Index = require("./Index");
const { Errors500, Errors400 } = require("./Erros");

const setupRoutes = (app) => {
  new Index(app).get(); // Halaman Utama
  new ProductionControl(app).getAndRender(); // Halaman production/control
  new Employee(app).getAndRender(); // Halaman Daftar Employees
  new Employee(app).getById(); // Mengambil Data Employee berdasarkan ID
  new Employee(app).add(); // Menambahkan Employee
  new Employee(app).delete(); // Menghapus Employee
  new Department(app).getAndRender(); // Halaman Daftar Departments
  new Department(app).add(); // Menambahkan Department
  // new Department(app).delete() // Menghapus Department
  new Login(app).render(); // Halaman autentikasi
  new Login(app).post(); // Melakukan validasi
  new Logout(app).clearAndRedirect(); // Routing logout melalui path /logout
  new Administrator(app).getAndRender(); // Halaman Administrator
  new Administrator(app).searchEmployeeById(); // Mencari employee dengan id
  new Administrator(app).getEmployeeById(); // Kemudian menampilkan hasil pencarian
  new Administrator(app).addUser(); // Jika ada, Tambahkan sebagai user
  new Administrator(app).editUser(); // Update User berupa username dan password
  new Administrator(app).deleteUser(); // Menghapus user
  new Profile(app).getAndRender(); // Halaman profile user
  new Profile(app).updateUser(); // Memperbarui data user
  new Errors500(app).error500(); // Error dibagian internal server
  new Errors400(app).error404(); // Error ketika dia yang kamu cari tidak ada
};

module.exports = setupRoutes;
