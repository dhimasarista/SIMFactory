const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

class Department {
    async findAll(){
        const query = `
        SELECT d.*, COALESCE(de.dept_total, 0) AS total_employees
        FROM departments d
        LEFT JOIN (
            SELECT department_id, COUNT(id) AS dept_total
            FROM employees
            GROUP BY department_id
        ) de ON d.id = de.department_id`; // ORDER BY d.created_at DESC

        const results = await queryAsync(query); // Array of Object

        return results;
    }

    async addData(name){
        const resultMaxIdDepart = await queryAsync("SELECT MAX(id) as maxId FROM departments")
        const maxIdDepart = resultMaxIdDepart[0].maxId || 900;
        const newIdDepart = maxIdDepart + 1;

        const data = {
            id: newIdDepart,
            name: name
        }
        const query = "INSERT INTO `departments` SET ? ";
        return await queryAsync(query, data);
    }
}

module.exports = Department