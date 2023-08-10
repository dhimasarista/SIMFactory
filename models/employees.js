const employee = (pool) => {
    pool.getConnection((error, connection) => {
        if (error) {
            console.log(red, `${qm} Error connecting to the database: ${error}`);
            return;
        }

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
                    connection.release();
                    process.exit(1);
                    return;
                }

                connection.release();
                process.exit();
            });
    });
}

module.exports = employee;
