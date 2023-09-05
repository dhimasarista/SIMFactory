const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

class Engineering {
    constructor(app) {
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/engineering/model")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const query = `SELECT * FROM models`;

            // kode awal model 024682
            try {
                const results = await queryAsync(query);
                res.render("engineering_model", {
                    user,
                    path,
                    data: results
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });

        this.app.route("/engineering/material")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const query = `SELECT * FROM materials`;
            try {
                const results = await queryAsync(query);

                res.render("engineering_material", {
                    user,
                    path,
                    data: results
                })
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
        .post(async (req, res) => {
            const { id, name, manufacturer } = req.body;
            const data = {
                id: id,
                name: name,
                manufacturer: manufacturer
            }

            try {
                const query = `INSERT INTO materials SET ?`;
                const results = await queryAsync(query, data);
                res.json(results);
            } catch (error) {
                errorLogging(error);
            }
        });

        this.app.delete("/engineering/material/:id", async (req, res) => {
            const id = req.params.id;

            try {
                const results = await queryAsync("DELETE FROM materials WHERE id = ?", [id]);
                res.json(results[0]);
            } catch (error) {
                errorLogging(error);
            }
        })
    }
}

module.exports = Engineering;