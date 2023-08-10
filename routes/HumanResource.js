class Employee {
    constructor(app){
        this.app = app;
    }

    // Halaman HumanResource/Employee
    get(){
        this.app.get("/hr/employee", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: hr_employee.ejs
            res.render("hr_employee", {user:user, path});
        });
    }
}
class Department{
    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/hr/department", (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: hr_department.ejs
            res.render("hr_department", {user: user, path})
        })
    }
}

module.exports = {
    Employee,
    Department
}