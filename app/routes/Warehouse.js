const { promisify } = require('util');
const pool = require("../../config/database");
const { errorLogging, errorHandling } = require('../utils/errorHandling');
const queryAsync = promisify(pool.query).bind(pool);

class Material{
    constructor(app){
        this.app = app;

        this.setupRoutes();
    }

    setupRoutes(){
        this.app.route("/warehouse/material")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const query = `
            SELECT
                materials.id AS material_id,
                materials.name,
                materials.stocks,
                materials.updated_by,
            GROUP_CONCAT(models.name SEPARATOR ', ') AS models_text
            FROM
                materials
            LEFT JOIN
                models_materials ON materials.id = models_materials.material_id
            LEFT JOIN
                models ON models_materials.model_id = models.id
            GROUP BY
                materials.id, materials.name;
            `;

            // Merender: views/material.ejs
            try {
                const results = await queryAsync(query)
                res.render("wh_material",{
                    path,
                    user,
                    data: results
                })
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
        .put(async (req, res) => {
            const { id, stocks } = req.body;
            const user = req.cookies.user;
            const query = `UPDATE materials SET stocks = ?, updated_by = ? WHERE id = ?`;
            try {
                const results = await queryAsync(query, [stocks, user.username, id]);
                res.json(results);
            } catch (error) {
                errorLogging(error);
            }
        });

        this.app.route("/warehouse/inventory")
        .get(async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;

            const query = 'SELECT * FROM models';

            try {
                const results = await queryAsync(query)
                res.render("wh_inventory", {
                    path, user,
                    data: results
                })
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
        .put(async (req, res) => {
            const { id, stocks } = req.body;
            const user = req.cookies.user;

            const data = {
                stocks  : stocks,
                updated_by: user.username
            }
            try {
                const checkData = await queryAsync("SELECT * FROM models_materials WHERE model_id = ?", [id]);
                if (checkData.length != 0) {
                    let queryResult = await queryAsync("UPDATE models SET ? WHERE id = ?", [data, id]);
                    const results = checkData != [] ? queryResult : 0;
                    res.json(results);    
                } else {
                    res.json("404");
                }
                
            } catch (error) {
                errorLogging(error);
            }
        })
    }
}

module.exports = {
    Material
}