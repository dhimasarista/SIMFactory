const { ProductionControl } = require("./Production");
const { Employee, Department } = require("./HumanResource");
const { Login, Logout } = require("./Authentication");
const Administrator = require("./Administrator");
const Index = require("./Index");

const setupRoutes = (app) => {
  new Index(app).get(); // Halaman Utama
  new ProductionControl(app).get(); // Halaman production/control
  new Employee(app).get(); // Halaman Daftar Employees
  new Employee(app).post(); // Menambahkan Employee
  new Employee(app).delete(); // Menghapus Employee
  new Department(app).get(); // Halaman Daftar Departments
  new Department(app).post(); // Menambahkan Department
  new Login(app).get(); // Halaman autentikasi
  new Login(app).post(); // Melakukan validasi
  new Logout(app).get(); // Routing logout melalui path /logout
  new Administrator(app).get(); // Halaman Administrator
  new Administrator(app).searchEmployeeById(); // Mencari employee dengan id
  new Administrator(app).getEmployeeById(); // Kemudian menampilkan hasil pencarian
  new Administrator(app).addUser(); // Jika ada, Tambahkan sebagai user
  new Administrator(app).deleteUser(); // Menghapus user
};

module.exports = setupRoutes;
