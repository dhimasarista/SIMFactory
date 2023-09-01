const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { green, symbol } = require('../utils/logging');


const department = {
    render: async (req, res) => {
        
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
            errorHandling(res, user, path, error);
        }
    },
    addDepartment: async (req, res) => {
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
            errorLogging(error);
        }
    }
}

module.exports = department;