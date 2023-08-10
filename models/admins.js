const { red, qm } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Admin
const adminUsername = "admin";
const adminPassword = "vancouver";

// Acquire a connection from the pool and create the table if it doesn't exist
module.exports = admin = (pool) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log(red,`${qm} Error connecting to the database: ${error}`);
      return;
    }

    // Create an 'admin' table if it doesn't exist
    connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
      )`, (error, results) => {
      if (error) {
        console.log(red,`${qm} Error creating admins table: ${error}`);
        connection.release();
        process.exit(1);
        return;
      }

      // Check if the admin credentials already exist in the 'admin' table
      connection.query(`SELECT * FROM admins WHERE username = ?`, [adminUsername], async (error, results) => {
        if (error) {
          console.log(red,`${qm} Error Executing SQL Query: ${error}`);
          connection.release();
          return;
        }

        // If admin credentials don't exist, insert them into the 'admin' table
        if (!results.length) {
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          connection.query(`INSERT INTO admins (username, password) VALUES (?, ?)`, [adminUsername, hashedPassword], (error) => {
            if (error) {
              console.log(red,`${qm} Error connecting to the database: ${error}`);
            }
          });
        }
      });
    });
    connection.release();
  });
};
