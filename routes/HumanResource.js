const { promisify } = require('util');
const { green, symbol, red } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const batchingData = require("../utils/batchingData");

class Employee {
    constructor(app){
        this.app = app;
    }

    // Halaman HumanResource/Employee
    getAndRender(){
        this.app.get("/hr/employee", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            // Rendering views: hr_employee.ejs

            const employeesQuery = "SELECT employees.*, departments.name AS department_name FROM employees JOIN departments ON employees.department_id = departments.id ORDER BY created_at DESC";
            try {
                let employees = await batchingData({
                    batchSize: 100,
                    queryAsync: queryAsync,
                    query: employeesQuery
                });
                
                // Fetching departments untuk form new-employee
                const departments = await queryAsync("SELECT * FROM departments");
                res.render("hr_employee", {user, path, employees, departments});
            } catch(error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }

    add(){
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
                res.status(200).send(results);
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
                const results = await queryAsync(query, [idToDelete]);
                res.status(200).send(results);
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

    getAndRender(){
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
                `; // ORDER BY d.created_at DESC
                     
                // const departmentsEmployees = await queryAsync("SELECT department.name AS department_name, COUNT(employees.id) AS total_employees FROM departments LEFT JOIN employees USING (id) GROUP BY name")
                const results = await queryAsync(query);
                res.render("hr_department", {user: user, path, departments: results});
            } catch (error) {
                console.log(error);
            }

        })
    }

    add(){
        this.app.post("/hr/department", async (req, res) => {
            const { name } = req.body;
            const resultMaxIdDepart = await queryAsync("SELECT MAX(id) as maxId FROM departments")
            const maxIdDepart = resultMaxIdDepart[0].maxId || 900;
            const newIdDepart = maxIdDepart + 1;

            const data = {
                id: newIdDepart,
                name: name
            }

            try {
                const query = "INSERT INTO `departments` SET ? ";
                const results = await queryAsync(query, data);
                res.status(200).send(results);
                console.log(green, `${symbol} Department: ${name} Succesfully Added`);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    delete(){
        this.app.delete("/hr/department/:id", async (req, res) => {
            const id = req.params.id;

            const query = `DELETE FROM departments WHERE id = ?`;
            try {
                const results = await queryAsync(query, id);
                res.status(200).send(results);
                console.log(red, `${symbol} Department: ${id} Succesfully Deleted`);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
    }
}

module.exports = {
    Employee,
    Department
}