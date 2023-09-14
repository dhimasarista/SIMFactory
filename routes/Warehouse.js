const { promisify } = require('util');
const pool = require("../configs/database");
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
        })
    }
}

module.exports = {
    Material
}