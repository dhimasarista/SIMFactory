const { red, qm, magenta, symbol, green } = require("../utils/logging");

const employee = (connection) => {
    // Create an "employees" table if it doesn't exist
    connection.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            number_phone VARCHAR(15),
            email VARCHAR(100),
            last_education VARCHAR(100),
            major VARCHAR(255),
            title VARCHAR(50),
            work_experience TEXT,
            skills TEXT,
            application_letter BLOB,
            CV BLOB,
            portfolio BLOB,
            mcu BOOL,
            criminal_history BOOL,
            employmeny_contract BLOB,
            department_id INT,
            FOREIGN KEY (department_id) REFERENCES departments(id)
            created_at TIMESTAMP,
        )`, (error, results) => {
            if (error) {
                console.log(red, `${qm} Error creating employees table: ${error}`);
                connection.end(); // Tutup koneksi setelah selesai
                process.exit(1);
                return;
            }
            const notError = (error == null) ? "Ok" : "Not Ok";
            console.log(green, `${symbol} Employees Table: ${notError}`);
        });
};

module.exports = employee;
