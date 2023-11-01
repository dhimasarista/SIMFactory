const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);
const {errorHandling, errorLogging} = require('../utils/errorHandling');

const UserModel = require("../models/User");
const userData = new UserModel();

const user = {
    render: async (req, res) => {
        const user = req.session;
        const path = req.path;
        const id = user.id;

        userData.id = id;

        // user dengan id 1 adalah admin dan user(default)
        if (user.id === 1 && path === "/user/profile"){
            res.redirect("/dashboard");
        } else {
            const photo = await queryAsync("SELECT photo FROM employees where id = ?", [id]);
            const data = await userData.findData("findById");
            
            try {
                res.render("profile", { 
                    user, 
                    photo,
                    path, 
                    data: data[0]
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        }
        
    },
    updateUser: async (req, res) => {
        const id = parseInt(req.params.id);
        const username = req.body.username;
        const password = req.body.password;

        userData.username = username;
        userData.password = password;

        try {
            const updateData = userData.changeData("updateUser");
            res.clearCookie('user');
            // res.cookie("user", {id: id, username: updatedUsername, role: "employee", department: selectData[0].department_id} , { maxAge: 3600000 }); // 1 Jam
            res.status(200).json(updateData)
        } catch (error) {
            errorLogging(error);
        }
    },
    employeeData: async (req, res) => {
        const user = req.session;
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