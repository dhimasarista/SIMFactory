const { promisify } = require('util');
const { green, symbol } = require('../utils/logging');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);;


module.exports = class Index{
    constructor(app){
        this.app = app;
    }
    // Method halaman utama
    get(){
        this.app.get("/", async (req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;

            // Menghitung total karyawan
            const totalEmployees = await queryAsync("SELECT COUNT(*) AS total FROM employees"); // Array of Object
            
            // (MVC) Rendering views: index.ejs
            res.render("index", {
                errors: [],
                user,
                path,
                totalEmployees: totalEmployees[0].total,
            });
        });
    }
}