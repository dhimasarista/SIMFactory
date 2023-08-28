const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const errorHandling = require('../utils/errorHandling');

const administrator = require('../controllers/administrator');
const user = require('../controllers/user');

class Administrator{
    constructor(app){
        this.app = app;
    }
    
    setupAdministratorRoutes(){
        // Grouping Routes
        this.app.route("/administrator")
        .get(administrator.render)
        .post(administrator.addUser);

        // Grouping Routes
        this.app.route("/administrator/:id")
        .put(administrator.editUser)
        .delete(administrator.deleteUser);

        // Mengambil Data Karyawan berdasarkan ID
        this.app.get("/administrator/employee/:id", user.employeeData);

        // Mencari Data Karyawan berdasarkan ID
        this.app.get("/administrator/search-employee/:id", user.searchEmployee);
    }
}

class User{
    constructor(app){
        this.app = app;
    }

    setupUserRoutes(){
        this.app.get("/user/profile/", user.render);
        this.app.put("/user/profile/:id", user.updateUser);
    }    
}

module.exports = {
    Administrator,
    User
};