const { red, qm, symbol, green } = require("../utils/logging");

const modelsMaterials = async (queryAsync) => {
    try {
        const modelsMaterialsTable = await queryAsync(
            `CREATE TABLE IF NOT EXISTS models_materials(
                model_id INT,
                material_id INT,
                created_at TIMESTAMP,
                FOREIGN KEY (model_id) REFERENCES models(id),
                FOREIGN KEY (material_id) REFERENCES materials(id)
            )`
        );
        const result = (modelsMaterialsTable !== 0) ? "Already Exist" : "Created";
        console.log(green, `${symbol} Models Materials Table: ${result}`);
    } catch (error) {
        // Terminasi Program dan Keluar
        console.log(red, `${qm} Error creating employees table: `, error);
        process.exit(1);
    }
}

module.exports = modelsMaterials;