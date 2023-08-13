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

    post(){
        const { username } = req.body;
        const id = Math.floor(Math.random() * 99999999);

        const data = {
            id: id,
            username: username
        }
        this.app.post("/administrator", async (req, res) => {
            const query = `INSERT INTO users SET ?`;
        })
    }
    // Mencari employee by id
    searchEmployee(){
        this.app.get("/employee/:id", async(req, res) => {
            // Mengambil paramater id di url kemudian di parsing ke integer
            const employeeId = parseInt(req.params.id);
            const query = `SELECT * FROM employees WHERE id = ?`;
            try {
                const results = await queryAsync(query, [employeeId]); // Array of object
                // Data dikirimkan dalam bentuk json
                res.json(results);
            } catch (error) {
                console.error('Query Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}

module.exports = Administrator;