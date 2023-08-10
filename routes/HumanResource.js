const { promisify } = require('util');
const { green, symbol } = require('../utils/logging');
let queryAsync;

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

    get(pool){
        this.app.get("/hr/department",  async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            queryAsync = promisify(pool.query).bind(pool);
            try {
                const results = await queryAsync('SELECT * FROM departments ORDER BY created_at DESC');
                // Rendering views: hr_department.ejs
                res.render("hr_department", {user: user, path, department: results});
            } catch (error) {
                console.log(error);
            }

        })
    }

    post(pool){
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