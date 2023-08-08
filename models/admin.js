const { red, qm } = require("../utils/logging");
// Admin credentials (change these to your desired values)
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
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )`, (error, results) => {
      if (error) {
        console.log(red,`${qm} Error creating admin table: ${error}`);
        connection.release();
        process.exit(1);
        return;
      }

      // Check if the admin credentials already exist in the 'admin' table
      connection.query(`SELECT * FROM admin WHERE username = ?`, [adminUsername], (error, results) => {
        if (error) {
          console.log(red,`${qm} Error Executing SQL Query: ${error}`);
          connection.release();
          return;
        }

        // If admin credentials don't exist, insert them into the 'admin' table
        if (!results.length) {
          connection.query(`INSERT INTO admin (username, password) VALUES (?, ?)`, [adminUsername, adminPassword], (error) => {
            if (error) {
              console.log(red,`${qm} Error connecting to the database: ${error}`);
            }
          });
        }
      });
    });
  });
};
