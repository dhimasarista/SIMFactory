const { red, qm, magenta, symbol } = require("../utils/logging");

const employee = (connection) => {
    // Create an "employees" table if it doesn't exist
    connection.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            department_id INT,
            created_at TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id)
        )`, (error, results) => {
            if (error) {
                console.log(red, `${qm} Error creating employees table: ${error}`);
                connection.end(); // Tutup koneksi setelah selesai
                process.exit(1);
                return;
            }
        });
};

module.exports = employee;
