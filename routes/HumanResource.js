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

            const employees = await queryAsync("SELECT employees.*, departments.name AS department_name FROM employees JOIN departments ON employees.department_id = departments.id ORDER BY created_at DESC");
            const departments = await queryAsync("SELECT * FROM departments");
            res.render("hr_employee", {user, path, employees, departments});
        });
    }

    post(){
        this.app.post("/hr/employee", async (req, res) => {
            const { name, department_id } = req.body;
            const resultMaxIdEmployee = await queryAsync("SELECT MAX(id) as maxId FROM employees");
            const currentMaxId = resultMaxIdEmployee[0].maxId || "2000"; // Jike belum ada, mulai dari 00999
            const newId = parseInt(currentMaxId) + 1;
            const data = {
                id: newId,
                name: name,
                department_id: department_id
            }

            try {
                const results = await queryAsync("INSERT INTO employees SET ?", data);
                res.json({data: results});
                console.log(green, `${symbol} Employee: ${name} Succesfully Added`);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }

    delete(){
        this.app.delete("/hr/employee/:id", async (req, res) => {
            const idToDelete = req.params.id;
            const query = `DELETE FROM employees  WHERE employees.id = ?`;

            try {
                const deleteData = await queryAsync(query, [idToDelete]);
                // res.json({data: deleteData});
                res.sendStatus(204); // Send a "No Content" status to indicate successful deletion
                console.log(green, `${symbol} Employee: ${idToDelete} Succesfully Deleted`);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
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
                
                const query = `
                    SELECT d.*, COALESCE(de.dept_total, 0) AS total_employees
                    FROM departments d
                    LEFT JOIN (
                        SELECT department_id, COUNT(id) AS dept_total
                        FROM employees
                        GROUP BY department_id
                    ) de ON d.id = de.department_id
                    ORDER BY d.created_at DESC
                `;
                // const departmentsEmployees = await queryAsync("SELECT department.name AS department_name, COUNT(employees.id) AS total_employees FROM departments LEFT JOIN employees USING (id) GROUP BY name")

                // Rest API Version: res.json(results);
                // MVC Version:
                const results = await queryAsync(query);
                res.render("hr_department", {user: user, path, departments: results});
            } catch (error) {
                console.log(error);
            }

        })
    }

    post(){
        this.app.post("/hr/department", async (req, res) => {
            const { name } = req.body;
            const resultMaxIdDepart = await queryAsync("SELECT MAX(id) as maxId FROM departments")
            const maxIdDepart = resultMaxIdDepart[0].maxId || "99";
            const newIdDepart = parseInt(maxIdDepart + 1);

            const data = {
                id: newIdDepart,
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