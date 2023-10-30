const employee = require('../controllers/employee');
const departmentHandler = require('../controllers/department');

class Employee {
    constructor(app, io){
        this.app = app;

        this.setupRoutes();
    }

    // Routing grup
    setupRoutes(){
      this.app.route("/hr/employee")
        .get(employee.renderPage) // Halaman Employee
        .post(employee.addEmployee); // Menambahkan Karyawan Baru

        this.app.route("/hr/employee/:id")
        .get(employee.getById) // JSON: Mengambil Data Karyawan By ID
        .delete(employee.deleteById) // Menghapus Data Karyawan By ID
        .put(employee.updateEmploye); // Memperbarui Data Karyawan

        this.app.route("/hr/employee/request/add-user/:id")
        .put(employee.addUser);
    }
}
class Department{
    constructor(app){
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/hr/department")
        .get(departmentHandler.render)
        .post(departmentHandler.addDepartment)
    }
}

module.exports = {
    Employee,
    Department
}