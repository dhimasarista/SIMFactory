const { red, qm, magenta, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Admin
const adminUsername = "admin";
const adminPassword = "vancouver";

// Acquire a connection from the pool and create the table if it doesn't exist
module.exports = admin = (connection) => {
  // Create an 'admin' table if it doesn't exist
  connection.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP
    )`, async (error, results) => {
    if (error) {
      console.log(red,`${qm} Error creating admins table: ${error}`);
      connection.end(); // Tutup koneksi setelah selesai
      process.exit(1);
      return;
    }
    const notError = (error == null) ? "Ok" : "Not Ok";
    console.log(green, `${symbol} Admins Table: ${notError}`);

    // Check if the admin credentials already exist in the 'admin' table
    connection.query(`SELECT * FROM admins WHERE username = ?`, [adminUsername], async (error, results) => {
      if (error) {
        console.log(red,`${qm} Error Executing SQL Query: ${error}`);
        connection.end(); // Tutup koneksi setelah selesai dengan kesalahan
        return;
      }

      // If admin credentials don't exist, insert them into the 'admin' table
      if (!results.length) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        connection.query(`INSERT INTO admins (username, password) VALUES (?, ?)`, [adminUsername, hashedPassword], (error) => {
          if (error) {
            console.log(red,`${qm} Error inserting admin credentials: ${error}`);
          }
          connection.end(); // Tutup koneksi setelah selesai
        });
      }
    });
  });
};
