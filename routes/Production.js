const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

class Production{
    constructor(app){
        this.app = app;

        this.prodControlRoutes();
    }

    prodControlRoutes(){
        this.app.get("/production/control",(req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            try {
                // Rendering views: prod_control.ejs
                res.render("prod_control", {
                    path: path, 
                    user: user
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });
        this.app.route("/production/plan")
        .get(async (req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            const query = `SELECT * FROM models`;
            try {
                const result = await queryAsync(query)
                // Rendering views: prod_control.ejs
                res.render("prod_plan", {
                    path: path, 
                    user: user,
                    data: result
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
    }
}

module.exports = Production;