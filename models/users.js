const { red, qm, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Users
const userUsername = "user";
const userPassword = "vancouver"
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

    //  Memeriksa kredensial user apakah ada di dalam tabel
    connection.query(`SELECT * FROM users WHERE username = ?`, [userUsername], async (error, results) => {
        if (error) {
        console.log(red,`${qm} Error Executing SQL Query: ${error}`);
        connection.end(); // Tutup koneksi setelah selesai dengan kesalahan
        return;
        }
        // Jika user tidak ada, maka tambahkan ke dalam `users` tabel
        if (!results.length) {
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            connection.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [userUsername, hashedPassword], (error) => {
                if (error) {
                console.log(red,`${qm} Error inserting admin credentials: ${error}`);
                }
                connection.end(); // Tutup koneksi setelah selesai
            });
        }
    });
}

module.exports = users;