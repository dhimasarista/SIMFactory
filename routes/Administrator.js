const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);
const bcrypt = require('bcrypt');
const errorHandling = require('../utils/errorHandling');
const getDataEmployee = require("../models/query/getDataEmployee");

class Administrator{
    constructor(app){
        this.app = app;
    }

    // MVC
    getAndRender(){
        this.app.get("/administrator", async (req, res) => {
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

        });
    }
    // Rest API
    getEmployeeById() {
        this.app.get("/administrator/employee/:id", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const id = req.params.id;
    
            try {
                const query = `SELECT employees.*, departments.name AS department_name FROM employees INNER JOIN departments ON employees.department_id = departments.id WHERE employees.id = ?`;
                const results = await queryAsync(query, [id]);
                res.json(results[0]);
            } catch (error) {
                errorHandling(res, error);
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
                const results = await queryAsync(query, [employeeId]);
                // Data dikirimkan dalam bentuk JSON
                res.json(results);
            } catch (error) {
                errorHandling(res, error);
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
                errorHandling(res, error);
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
                const results = await queryAsync(queryUpdate, [data, idToNumber]);
                res.status(200).send(results);
            } catch(error) {
                errorHandling(res, error);
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
                errorHandling(res, error);
            }
        });
    }
}

class User{
    constructor(app){
        this.app = app;
    }

    renderUserProfile(){
        this.app.get("/user/profile/", async (req, res) => {
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
                errorHandling(res, error);
            }
        });
    }

    updateUser() {
        this.app.put("/user/profile/:id", async (req, res) => {
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
                errorHandling(res, error);
            }
        });
    }
    
}

module.exports = {
    Administrator,
    User
};