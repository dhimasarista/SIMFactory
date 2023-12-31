const { red, qm, symbol, green } = require("../utils/logging");

const materials = async (queryAsync) => {
    try {
        const materialsTable = await queryAsync(
            `CREATE TABLE IF NOT EXISTS materials(
                id BIGINT(64) AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                manufacturer VARCHAR(255) NULL,
                stocks BIGINT(64) NULL,
                updated_by VARCHAR(64) NULL,
                created_at TIMESTAMP
            )`
        );
        const result = (materialsTable !== 0) ? "Already Exist" : "Created";
        console.log(green, `${symbol} Materials Table: ${result}`);
    } catch (error) {
        // Terminasi Program dan Keluar
        console.log(red, `${qm} Error creating employees table: `, error);
        process.exit(1);
    }
}

module.exports = materials;