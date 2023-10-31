const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);;
const { errorHandling, errorLogging} = require('../utils/errorHandling');

const LineTeam = require("../models/LineTeam");
const lineTeam = new LineTeam();
module.exports = {
    render: async (req, res) => {
        // Mengambil user dari cookie
        const user = req.cookies.user;
        const path = req.path;
        
        const queryModels = 'SELECT * FROM models';
        let data = [];
            
        try {
            // Menghitung total karyawan
            const [totalProduced, totalEmployees, totalModels, models] = await Promise.all([
                queryAsync("SELECT SUM(total_output) as total FROM models"),
                queryAsync("SELECT COUNT(*) AS total FROM employees"),
                queryAsync("SELECT COUNT(*) AS total FROM models"),
                queryAsync(queryModels)
            ]);  // Array of Object

            const linesTeamsData = await lineTeam.findAll();
            
            const date = new Date();
            const currentHour = date.getHours();
            const firstShift = 8;
            const firstShiftEnd = 20;
            const secondShift = 20;
            const secondShiftEnd = 8;

            const first = currentHour >= firstShift && currentHour < firstShiftEnd ? 1 : null;
            const second = currentHour >= secondShift && currentHour < secondShiftEnd ? 2 : null;
            
            // Melakukan pengecekan untuk menampilkan shift yang aktif berdasarkan jam
            for (let index = 0; index < linesTeamsData.length; index++) {
                if (first === linesTeamsData[index]["shift"]) {
                    data.push(linesTeamsData[index]);
                } else if(second === linesTeamsData[index]["shift"]){
                    data.push(linesTeamsData[index]);
                }
            }
            
            // (MVC) Rendering views: index.ejs
            res.render("dashboard", {
                errors: [],
                user: user,
                path: path,
                totalEmployees: totalEmployees[0].total,
                totalModels: totalModels[0].total,
                models: models,
                totalProduced: totalProduced[0].total,
                linesTeams: data
            });
        } catch (error) {
            errorHandling(res, user, path, error);
        }
    }
}