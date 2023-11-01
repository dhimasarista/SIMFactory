const { errorHandling, errorLogging} = require('../utils/errorHandling');
// const queryAsync = promisify(pool.query).bind(pool);
const axios = require("axios");
const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);

const LineTeam = require("../models/LineTeam");
const lineTeam = new LineTeam();

class Monitoring{
    constructor(app) {
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/monitoring/production")
        .get(async (req, res) => {
            const user = req.session;
            const path = req.path;
            try {
                const results = await lineTeam.findAll();
                res.render("monitoring_production", {
                    user,
                    path,
                    lines: results
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });

        this.app.route("/monitoring/materials")
        .get(async (req, res) => {
            const path = req.path;
            const user = req.session;
            const apiKey = "210401010174";

            try {
                const response = await axios.get("http://localhost:8080/materials/data", {
                    headers: {
                        "Authorization": `Bearer ${apiKey}`
                    }
                })

                const materialData = response.data;

                res.render("monitoring_materials", {
                    user, path, materials: materialData
                })
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })


        this.app.route("/monitoring/schedules")
        .get(async (req, res) => {
            const user = req.session;
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