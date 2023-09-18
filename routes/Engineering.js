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
            const queryModels = `SELECT
            models.id AS model_id,
            models.name AS model_name,
            models.target_quantity AS model_target,
            GROUP_CONCAT(materials.name SEPARATOR ', ') AS materials_text
            FROM
                models
            LEFT JOIN
                models_materials ON models.id = models_materials.model_id
            LEFT JOIN
                materials ON models_materials.material_id = materials.id
            GROUP BY
                models.id, models.name, models.target_quantity;
        `;

            // kode awal model 024682
            try {
                const [resultModels] = await Promise.all([
                    queryAsync(queryModels),
                ]);
                res.render("engineering_model", {
                    user,
                    path,
                    models: resultModels,
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
        .post(async (req, res) => {
            const { id, name } = req.body;

            const modelData = {
                id: parseInt(id),
                name: name,
            }
            try {
                const results = await queryAsync("INSERT INTO models SET ?", modelData);
                res.json(results);
            } catch (error) {
                errorLogging(error);
            }
        })
        .put(async (req, res) => {
            const { id, name, target } = req.body;

            const modelData = {
                name: name,
                target_quantity: target
            }

            console.log(modelData);
            try {
                const results = await queryAsync("UPDATE models SET ? WHERE id = ?", [modelData, parseInt(id)]);
                res.status(200).send(results);
            } catch (error) {
                errorLogging(error);
            }
        })

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
        // this.app.delete("/engineering/material/:id", async (req, res) => {
        //     const id = req.params.id;

        //     try {
        //         const results = await queryAsync("DELETE FROM materials WHERE id = ?", [id]);
        //         res.json(results);
        //     } catch (error) {
        //         errorLogging(error);
        //     }
        // });
    }
}

module.exports = Engineering;