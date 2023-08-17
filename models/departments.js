const { red, qm, symbol, green } = require("../utils/logging");

const createDepartmentsTable = (connection) => {
    connection.query(`
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (error, results) => {
            if (error) {
                console.log(red, `${qm} Error creating departments table: ${error}`);
                connection.end();
                process.exit(1);
                return;
            }
            const notError = (error == null) ? "Ok" : "Not Ok";
            console.log(green, `${symbol} Departments Table: ${notError}`);

            // Setelah tabel dibuat, tambahkan data jika belum ada
            const defaultDepartments = [
                { name: "engineering", id: 901 },
                { name: "human resource", id: 902 },
                { name: "warehouse", id: 903 },
                { name: "production", id: 904 }
            ];

            const insertQuery = "INSERT INTO departments (id, name) VALUES (?, ?)";

            defaultDepartments.forEach(department => {
                connection.query(insertQuery, [department.id, department.name], (error, results) => {
                    if (error) {
                        console.log(red, `${qm} Error inserting data into departments table: ${error}`);
                    } else {
                        console.log(green, `${symbol} Inserted data for department: ${department.name}`);
                    }
                });
            });

            connection.end();
        });
};

module.exports = createDepartmentsTable;
