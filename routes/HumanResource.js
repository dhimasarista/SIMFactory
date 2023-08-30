const employee = require('../controllers/employee');
const department = require('../controllers/department');

class Employee {
    constructor(app, io){
        this.app = app;

        this.setupRoutes();
    }

    // Routing grup
    setupRoutes(){
    const server = require('http').Server(this.app); // Pastikan app adalah instansi Express Anda
    const io = require('socket.io')(server);
      this.app.route("/hr/employee")
        .get(employee.renderPage) // Halaman Employee
        .post(employee.addEmployee); // Menambahkan Karyawan Baru

        this.app.route("/hr/employee/:id")
        .get(employee.getById) // JSON: Mengambil Data Karyawan By ID
        .delete(employee.deleteById) // Menghapus Data Karyawan By ID
        .put(employee.updateEmploye); // Memperbarui Data Karyawan
    }
}
class Department{
    constructor(app){
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/hr/department")
        .get(department.render)
        .post(department.addDepartment)
    }
}

module.exports = {
    Employee,
    Department
}