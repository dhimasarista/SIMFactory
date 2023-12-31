const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const { errorHandling, errorLogging} = require('../utils/errorHandling');
const batchingData = require('../utils/batchingData');
const getDataEmployee = require('../models/query/getDataEmployee');

const administrator = {
    render: async (req, res) => {
        const user = req.cookies.user;
        const path = req.path;

        try {
            const query = "SELECT users.*, departments.name AS department_name FROM users JOIN departments ON users.department_id = departments.id WHERE username != 'admin' ORDER BY created_at ASC";

            const results = await queryAsync(query); // Array of Object
            res.render("administrator", {
                user: user, 
                path: path, 
                userList: results,
                });
        } catch (error) {
            errorHandling(res, user, path, error);
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
        const query = `INSERT IGNORE INTO users SET ?`;
        try {
            const results = await queryAsync(query, data);
            const update = {
                is_user: 1,
                is_request: 0,
            }
            if (results["insertId"] !== 0) {
                await queryAsync(`UPDATE employees SET ? WHERE id = ?`, [update, id]);
                res.status(200).send(results);
            } else {
                res.status(409).send(results);
            }
        } catch (error) {
            errorLogging(error);
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
            errorLogging(error);
        }
    },
    deleteUser: async (req, res) => {
        const id = parseInt(req.params.id);
        const query = `DELETE FROM users WHERE id = ?`;
        try {
            const results = await queryAsync(query, id);
            res.status(200).send(results);
        } catch(error) {
            errorLogging(error);
        }
    },
    userListReq: async (req, res) => {
        const query = getDataEmployee() + " WHERE is_request";
        try {
            const results = await batchingData({
                queryAsync: queryAsync,
                query: query,
                batchSize: 10,
            });

            res.json(results);
        } catch (error) {
            errorLogging(error); 
        }
    },
    // Fixing
    addUserByReq: async (req, res) => {
        const { id, department_id, username, password } = req.body;
        const data = {
            id: parseInt(id),
            username: username,
            password: await bcrypt.hash(id, 10),
            department_id: department_id
        }
        const query = `INSERT IGNORE INTO users SET ?`;
        try {
            await queryAsync("UPDATE employees SET is_user = 1, is_request = 0 WHERE id = ?", [data.id])
            const results = await queryAsync(query, data);
            res.json(results);
        } catch (error) {
            errorLogging(error); 
        }
    },
    // Fixed
    rejectAddUserByReq: async (req, res) => {
        const id = parseInt(req.body.id);
        try {
            const results = await queryAsync("UPDATE employees SET is_user = 0, is_request = 0 WHERE id = ?", [id]);
            res.json(results);
        } catch (error) {
            errorLogging(error); 
        }
    }
}

module.exports = administrator;