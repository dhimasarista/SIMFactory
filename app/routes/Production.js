const { errorHandling, errorLogging} = require('../utils/errorHandling');
const { promisify } = require('util');
const pool = require("../../config/database");
const queryAsync = promisify(pool.query).bind(pool);
const LineTeam = require("../models/LineTeam");

const lineTeam = new LineTeam();

class Production{
    constructor(app){
        this.app = app;

        this.prodControlRoutes();
    }

    prodControlRoutes(){
        this.app.get("/production/control", async (req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;

            const data = await lineTeam.findAll();
            try {
                // Rendering views: prod_control.ejs
                res.render("prod_control", {
                    path: path, 
                    user: user,
                    lines: data
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        });

        this.app.put("/production/control/line-status", async (req, res) => {
            const dataFromClient = req.body;

            const data = {
                status: dataFromClient.status,
                id: parseInt(dataFromClient.id)
            }

            try {
                const result = await queryAsync("UPDATE lines_teams SET ? where teams_id = ?", [data, data.id])
                res.json(result);
            } catch (error) {
                errorLogging(error);
            }
        })
        this.app.route("/production/plan")
        .get(async (req, res) => {
            // Mengambil user dari cookie
            const user = req.cookies.user;
            const path = req.path;
            const queryModels = `SELECT * FROM models WHERE NOT EXISTS(
                SELECT 1 FROM models_materials WHERE models_materials.model_id = models.id
            )`;
            const queryMaterials = `SELECT * FROM materials`;
            const query = `
            SELECT
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
            try {
                const [models, materials, modelsMaterials] = await Promise.all([
                    await queryAsync(queryModels), queryAsync(queryMaterials), queryAsync(query)
                ]);
                // Rendering views: prod_control.ejs
                res.render("prod_plan", {
                    path: path, 
                    user: user,
                    models: models,
                    materials: materials,
                    modelsMaterials: modelsMaterials
                });
            } catch (error) {
                errorHandling(res, user, path, error);
            }
        })
        .post(async (req, res) => {
            const { modelId, materials } = req.body;
            
            try {
                materials.forEach(async element => {
                    await queryAsync("INSERT INTO `models_materials` (`model_id`, `material_id`) VALUES (?, ?)", [modelId, element]);
                });
                res.json({ success: true, message: 'Data success inserted.' });
            } catch (error) {
                errorLogging(error);
            }
        })
    }
}

module.exports = Production;