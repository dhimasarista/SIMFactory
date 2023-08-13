const { red, qm, symbol, green } = require("../utils/logging");
const department = (connection) => {
    // Create a "departments" table if it doesn't exist
    connection.query(`
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP
        )`, (error, results) => {
            if (error) {
                console.log(red, `${qm} Error creating departments table: ${error}`);
                connection.end(); // Tutup koneksi setelah selesai
                process.exit(1);
                return;
            }
            const notError = (error == null) ? "Ok" : "Not Ok";
            console.log(green, `${symbol} Departments Table: ${notError}`);
        });
    };

module.exports = department;
