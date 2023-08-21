const { red, qm, symbol, green } = require("../utils/logging");

const createDepartmentsTable = async (queryAsync) => {
    try {
        // Membuat tabel baru jika tidak ada
        const departmentTable = await queryAsync(`CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        const result = (departmentTable !== 0) ? "Already Exist" : "Created";
        console.log(green, `${symbol} Departments Table: ${result}`);
        
        // Membuat default data untuk tabel departments
        const defaultDepartments = [
            { name: "engineering", id: 901 },
            { name: "human resource", id: 902 },
            { name: "warehouse", id: 903 },
            { name: "production", id: 904 },
            { name: "IT", id: 905 }
        ];
        
        // Memeriksa data
        const selectQuery = "SELECT id FROM departments WHERE id = ?";
        defaultDepartments.forEach(async department => {
            try {
                const results = await queryAsync(selectQuery, [department.id]);
                // Jika data tidak ada, insert
                if (results.length === 0) {
                    const insertQuery = "INSERT INTO departments (id, name) VALUES (?, ?)";
                    try {
                        await queryAsync(insertQuery, [department.id, department.name]);
                    } catch(error) {
                        console.log(red, `${qm} Error inserting data into departments table: ${error}`);
                    }
                }
            } catch(error) {
                console.log(red, `${qm} Error checking data in departments table: ${error}`);
            }
        });
    } catch(error) {
        // Terminasi Program dan Keluar
        console.log(red, `${qm} Error creating departments table: `, error);
        process.exit(1);
    }
};

module.exports = createDepartmentsTable;
