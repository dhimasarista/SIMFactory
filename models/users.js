const { red, qm, symbol, green } = require("../utils/logging");

const users = (connection) => {
    connection.query(`
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        department_id INT,
        created_at TIMESTAMP,
        FOREIGN KEY (department_id) REFERENCES departments(id)
    )
    `, (error, results) => {
        if (error) {
            console.log(red, `${qm} Error creating users table: ${error}`);
            connection.end(); // Tutup koneksi setelah selesai
            process.exit(1);
            return;
        }
        const notError = (error == null) ? "Ok" : "Not Ok";
        console.log(green, `${symbol} Users Table: ${notError}`);
    })
}

module.exports = users;