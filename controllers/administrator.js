const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const errorHandling = require('../utils/errorHandling');

const administrator = {
    render: async (req, res) => {
        const user = req.cookies.user;
        const path = req.path;

        try {
            const query = "SELECT users.*, departments.name AS department_name FROM users JOIN departments ON users.department_id = departments.id ORDER BY created_at DESC";

            const results = await queryAsync(query); // Array of Object
            res.render("administrator", {
                user: user, 
                path: path, 
                userList: results,
                });
        } catch (error) {
            errorHandling(res, error);
        }
    },
    addUser: async (req, res) => {
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
            errorHandling(res, error);
        }
    },
    editUser: async (req, res) => {
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
            const results = await queryAsync(queryUpdate, [data, idToNumber]);
            res.status(200).send(results);
        } catch(error) {
            errorHandling(res, error);
        }
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id);
        const query = `DELETE FROM users WHERE id = ?`;
        try {
            const results = await queryAsync(query, id);
            res.status(200).send(results);
        } catch(error) {
            errorHandling(res, error);
        }
    }
}

module.exports = administrator;