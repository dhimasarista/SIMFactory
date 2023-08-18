const { red, qm, symbol, green } = require("../utils/logging");


const createDepartmentsTable = async (queryAsync) => {
    try {
        await queryAsync(`CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`).then(() => {
            
            const defaultDepartments = [
                { name: "engineering", id: 901 },
                { name: "human resource", id: 902 },
                { name: "warehouse", id: 903 },
                { name: "production", id: 904 }
            ];
            
            const selectQuery = "SELECT id FROM departments WHERE id = ?";
            
            defaultDepartments.forEach(async department => {
                try {
                    const results = await queryAsync(selectQuery, [department.id]);
                    if (results.length === 0) {
                        // Data doesn't exist, insert it
                        const insertQuery = "INSERT INTO departments (id, name) VALUES (?, ?)";
                        try {
                            await queryAsync(insertQuery, [department.id, department.name]);
                            console.log(green, `${symbol} Inserted data for department: ${department.name}`);
                        } catch(error) {
                            console.log(red, `${qm} Error inserting data into departments table: ${error}`);
                        }
                    } else {
                        console.log(blue, `${symbol} Data for department '${department.name}' already exists.`);
                    }
                } catch(error) {
                    console.log(red, `${qm} Error checking data in departments table: ${error}`);
                }
            });
        })
        const notError = (error == null) ? "Ok" : "Not Ok";
        console.log(green, `${symbol} Departments Table: ${notError}`);
    } catch(error) {
        console.log(red, `${qm} Error creating departments table: ${error}`);
        process.exit(1);
    }
};

module.exports = createDepartmentsTable;
