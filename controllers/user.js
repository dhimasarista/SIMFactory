const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const {errorHandling, errorLogging} = require('../utils/errorHandling');
const getDataEmployee = require("../models/query/getDataEmployee");

const user = {
    render: async (req, res) => {
        const user = req.cookies.user;
        const path = req.path;
        const id = user.id;

        const query = getDataEmployee() + " WHERE employees.id = ?";
        try {
            const results = await queryAsync(query, [id]); // Array of Object
            res.render("profile", { 
                user, 
                path, 
                data: results[0]
            });
        } catch (error) {
            errorHandling(res, user, path, error);
        }
    },
    updateUser: async (req, res) => {
        const id = parseInt(req.params.id);
        const username = req.body.username;
        const password = req.body.password;

        const querySelect = `SELECT * FROM users WHERE id = ?`;
        const queryUpdate = `UPDATE users SET username = ?, password = ? WHERE id = ?`;

        try {
            const selectData = await queryAsync(querySelect, [id]);

            if (!selectData || selectData.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedUsername = username || selectData[0].username;
            const updatedPassword = password ? await bcrypt.hash(password, 10) : selectData[0].password;

            const updateData = await queryAsync(queryUpdate, [updatedUsername, updatedPassword, id]);
            res.clearCookie('user');
            // res.cookie("user", {id: id, username: updatedUsername, role: "employee", department: selectData[0].department_id} , { maxAge: 3600000 }); // 1 Jam
            res.status(200).json(updateData)
        } catch (error) {
            errorLogging(error);
        }
    },
    employeeData: async (req, res) => {
        const user = req.cookies.user;
        const path = req.path;
        const id = req.params.id;

        try {
            const query = `SELECT employees.*, departments.name AS department_name FROM employees INNER JOIN departments ON employees.department_id = departments.id WHERE employees.id = ?`;
            const results = await queryAsync(query, [id]);
            res.json(results[0]);
        } catch (error) {
            errorLogging(error);
        }
    },
    searchEmployee: async(req, res) => {
        // Mengambil parameter id di URL kemudian diparsing ke integer
        const employeeId = parseInt(req.params.id);
        const query = `SELECT * FROM employees WHERE id = ?`;
        try {
            const results = await queryAsync(query, [employeeId]);
            // Data dikirimkan dalam bentuk JSON
            res.json(results);
        } catch (error) {
            errorLogging(error);
        }
    }
}

module.exports = user;