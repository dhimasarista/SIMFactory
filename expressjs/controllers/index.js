const { promisify } = require('util');
const pool = require("../config/database");
const queryAsync = promisify(pool.query).bind(pool);;
const { errorHandling, errorLogging} = require('../utils/errorHandling');

module.exports = {
    render: async (req, res) => {
        // Mengambil user dari cookie
        const user = req.cookies.user;
        const path = req.path;

        const queryModels = 'SELECT * FROM models';
        try {
            // Menghitung total karyawan
            const [totalProduced, totalEmployees, totalModels, models] = await Promise.all([
                queryAsync("SELECT SUM(total_output) as total FROM models"),
                queryAsync("SELECT COUNT(*) AS total FROM employees"),
                queryAsync("SELECT COUNT(*) AS total FROM models"),
                queryAsync(queryModels)
            ]);  // Array of Object
            
            // (MVC) Rendering views: index.ejs
            res.render("dashboard", {
                errors: [],
                user: user,
                path: path,
                totalEmployees: totalEmployees[0].total,
                totalModels: totalModels[0].total,
                models: models,
                totalProduced: totalProduced[0].total
            });
        } catch (error) {
            errorHandling(res, user, path, error);
        }
    }
}