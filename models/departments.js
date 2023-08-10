const department = (pool) => {
    pool.getConnection((error, connection) => {
        if (error) {
            console.log(red, `${qm} Error connecting to the database: ${error}`);
            return;
        }

        // Create a "departments" table if it doesn't exist
        connection.query(`
            CREATE TABLE IF NOT EXISTS departments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP
            )`, (error, results) => {
                if (error) {
                    console.log(red, `${qm} Error creating departments table: ${error}`);
                    connection.release();
                    process.exit(1);
                    return;
                }

                connection.release();
                process.exit();
            });
    });
}

module.exports = department;
