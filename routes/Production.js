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
            const queryModels = `SELECT * FROM models`;
            const queryMaterials = `SELECT * FROM materials`;
            const queryModelsMaterials = `SELECT * FROM models_materials`;
            try {
                const [models, materials, modelsMaterials] = await Promise.all([
                    await queryAsync(queryModels), queryAsync(queryMaterials), queryAsync(queryModelsMaterials)
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