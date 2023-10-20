const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

class Monitoring{
    constructor(app) {
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/monitoring/production")
        .get((req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            res.render("500", {
                user,
                path,
                errors: ["Belum dibuat"]
            });
        });

        this.app.route("/monitoring/materials")
        .get( async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            const queryMaterials = "SELECT * FROM materials";

            try {
                const results = await queryAsync(queryMaterials)
                res.render("monitoring_materials", {
                    user,
                    path,
                    materials: results
                });   
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });

        this.app.route("/monitoring/schedules")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            res.render("monitoring_schedules", {
                user,
                path,
                errors: ["Belum dibuat"]
            });
        })
    }
}

module.exports = Monitoring;