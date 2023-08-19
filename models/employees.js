const { red, qm, symbol, green } = require("../utils/logging");

const employee = async (queryAsync) => {
    try {
        // Membuat tabel baru jika tidak ada
        const employeesTable = await queryAsync(`
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
            employment_contract BLOB,
            department_id INT,
            FOREIGN KEY (department_id) REFERENCES departments(id),
            created_at TIMESTAMP
        )`);
        const result = (employeesTable !== 0) ? "Already Exist" : "Created";
        console.log(green, `${symbol} Employees Table: ${result}`);
    } catch(error) {
        // Terminasi Program dan Keluar
        console.log(red, `${qm} Error creating employees table: `, error);
        process.exit(1);
    }
};

module.exports = employee;
