const { promisify } = require('util');
const { green, symbol, red } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

const errorHandling = require('../utils/errorHandling');

const employee = require('../controllers/employee');
const department = require('../controllers/department');

class Employee {
    constructor(app){
        this.app = app;
    }

    // Routing grup
    setupEmployeeRoutes(){
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
    }

    setupDepartmentRoutes(){
        this.app.route("/hr/department")
        .get(department.render)
        .post(department.addDepartment)
    }
}

module.exports = {
    Employee,
    Department
}