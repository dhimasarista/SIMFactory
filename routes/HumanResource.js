const { promisify } = require('util');
const { green, symbol } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);;

class Employee {
    constructor(app){
        this.app = app;
    }

    // Halaman HumanResource/Employee
    get(){
        this.app.get("/hr/employee", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: hr_employee.ejs

            const results = await queryAsync("SELECT * FROM employees ORDER BY created_at DESC");
            res.render("hr_employee", {user:user, path});
        });
    }

    post(){
        this.app.post("/hr/employee", (req, res) => {
            const { data } = req.body;


        })
    }
}
class Department{

    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/hr/department",  async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            try {
                const results = await queryAsync('SELECT * FROM departments ORDER BY created_at DESC');
                // Rendering views: hr_department.ejs
                res.render("hr_department", {user: user, path, department: results});
            } catch (error) {
                console.log(error);
            }

        })
    }

    post(){
        this.app.post("/hr/department", async (req, res) => {
            const { id, name } = req.body;

            const data = {
                id: id,
                name: name
            }

            try {
                const query = await queryAsync("INSERT INTO `departments` SET ? ", data);
                res.json({data: query});
                console.log(green, `${symbol} Department: ${name} Succesfully Added`);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}

module.exports = {
    Employee,
    Department
}