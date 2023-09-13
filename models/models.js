const { red, qm, symbol, green } = require("../utils/logging");

const models = async (queryAsync) => {
    try {
        const modelsTable = await queryAsync(
            `CREATE TABLE IF NOT EXISTS models(
                id BIGINT(64) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                target_quantity BIGINT(64) NULL,
                created_at TIMESTAMP
            )`
        );

        const result = (modelsTable !== 0) ? "Already Exist" : "Created";
        console.log(green, `${symbol} Models Table: ${result}`);
    } catch (error) {
        // Terminasi Program dan Keluar
        console.log(red, `${qm} Error creating employees table: `, error);
        process.exit(1);
    }
}

module.exports = models;