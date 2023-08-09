class Employee {
    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/hr/employee", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            res.render("hr_employee", {user:user, path});
        });
    }
}

module.exports = {
    Employee
}