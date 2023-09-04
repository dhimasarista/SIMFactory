const { promisify } = require('util');
const pool = require("../configs/database");
const { errorLogging } = require('../utils/errorHandling');
const queryAsync = promisify(pool.query).bind(pool);

class Material{
    constructor(app){
        this.app = app;
    }

    render(){
        this.app.get("/warehouse/material", async (req, res) => {
            const user = req.cookies.user;
            const path = req.path;
            const query = `
            SELECT
                materials.id AS material_id,
                materials.name,
                materials.stocks,
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
                res.render("material",{
                    path,
                    user,
                    data: results
                })
            } catch (error) {
                errorLogging(error);
            }
        });
    }
}

module.exports = {
    Material
}