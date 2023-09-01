const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);;
const { errorHandling, errorLogging} = require('../utils/errorHandling');

module.exports = {
    render: async (req, res) => {
        // Mengambil user dari cookie
        const user = req.cookies.user;
        const path = req.path;
        console.log(user);
        
        try {
            // Menghitung total karyawan
            const totalEmployees = await queryAsync("SELECT COUNT(*) AS total FROM employees"); // Array of Object
            
            // (MVC) Rendering views: index.ejs
            res.render("dashboard", {
                errors: [],
                user: user,
                path: path,
                totalEmployees: totalEmployees[0].total,
            });
        } catch (error) {
            errorHandling(res, user, path, error);
        }
    }
}