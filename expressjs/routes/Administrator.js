// Routing Handler
const administrator = require('../controllers/administrator');
const user = require('../controllers/user');

class Administrator{
    constructor(app){
        this.app = app;

        this.setupRoutes();
    }
    
    setupRoutes(){
        // Grouping Routes
        this.app.route("/administrator")
        .get(administrator.render)
        .post(administrator.addUser);

        this.app.route("/administrator/user/request")
        .get(administrator.userListReq)
        .post(administrator.addUserByReq);

        this.app.route("/administrator/user/reject/request")
        .post(administrator.rejectAddUserByReq);

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

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.get("/user/profile/", user.render);
        this.app.put("/user/profile/:id", user.updateUser);
    }    
}

module.exports = {
    Administrator,
    User
};