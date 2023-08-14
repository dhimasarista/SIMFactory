const { promisify } = require('util');
const { green, symbol, red, qm } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

class Administrator{
    constructor(app){
        this.app = app;
    }

    get(){
        this.app.get("/administrator", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            try {
                const query = `SELECT * FROM users ORDER BY created_at DESC`
                const results = await queryAsync(query);

                res.render("administrator", {user, path, userList: results});
            } catch (error) {
                console.log(red, `${qm} Query Error: ${error}`);
            }

        });
    }
    employeeData() {
        this.app.get("/administrator/:id", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const id = req.params.id; // Change "term" to "id"
    
            try {
                // Perbaiki sintaks SQL dan queryAsync
                const query = `SELECT employees.*, departments.name AS department_name FROM employees INNER JOIN departments ON employees.department_id = departments.id WHERE employees.id = ?`;
                const results = await queryAsync(query, [id]);
                res.json(results[0]);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    
    // Mencari employee by id
    searchEmployee() {
        this.app.get("/employee/:id", async(req, res) => {
            // Mengambil parameter id di URL kemudian diparsing ke integer
            const employeeId = parseInt(req.params.id);
            const query = `SELECT * FROM employees WHERE id = ?`;
            try {
                const results = await queryAsync(query, [employeeId]); // Array of object
                // Data dikirimkan dalam bentuk JSON
                res.json(results);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}

module.exports = Administrator;