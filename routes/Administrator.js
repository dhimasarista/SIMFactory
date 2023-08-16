const { promisify } = require('util');
const { red, qm } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');

class Administrator{
    constructor(app){
        this.app = app;
    }

    // MVC
    get(){
        this.app.get("/administrator", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            try {
                const query = `SELECT * FROM users ORDER BY created_at DESC`
                const results = await queryAsync(query); // Array of Object
                res.render("administrator", {
                    user: user, 
                    path: path, 
                    userList: results,
                    });
            } catch (error) {
                console.log(red, `${qm} Query Error: ${error}`);
            }

        });
    }
    // Rest API
    getEmployeeById() {
        this.app.get("/administrator/employee/:id", async (req, res) => {
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
    
    // Rest API
    searchEmployeeById() {
        this.app.get("/administrator/search-employee/:id", async(req, res) => {
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

    // Rest API
    addUser(){
        this.app.post("/administrator", async (req, res) => {
            const { id, department_id, username, password } = req.body;
            const data = {
                id: id,
                username: username,
                password: await bcrypt.hash(id, 10),
                department_id: department_id
            }
            const query = `INSERT INTO users SET ?`;
            try {
                const results = await queryAsync(query, data);
                res.status(200).send(results);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
    }
    editUser(){
        this.app.put("/administrator/:id", async (req, res) => {
            const id = req.params.id;
            const idToNumber = Number(id);
            try {
                const query = `SELECT * FROM users WHERE id = ?`;
                const result = await queryAsync(query, [id]);
                
                const { username, password } = req.body;
                const data = {
                    username: username == undefined ? result[0].username : username,
                    password: password == "" ? result[0].password : await bcrypt.hash(password, 10)
                }

                const queryUpdate = `UPDATE users SET ? WHERE id = ?`;
                await queryAsync(queryUpdate, [data, idToNumber]);
                res.status(200).send(queryUpdate);
            } catch(error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })
    }
    deleteUser(){
        this.app.delete("/administrator/:id", async (req, res) => {
            const id = parseInt(req.params.id);
            const query = `DELETE FROM users WHERE id = ?`;
            try {
                const results = await queryAsync(query, id);
                res.status(200).send(results);
            } catch(error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}

module.exports = Administrator;