const { red, qm, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Admin
const adminUsername = "admin";
const adminPassword = "vancouver";

// Acquire a connection from the pool and create the table if it doesn't exist
module.exports = async (queryAsync) => {
  try {
    // Create an 'admin' table if it doesn't exist
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP
    )`;
    
    await queryAsync(createTableQuery);

    // Check if the admin credentials already exist in the 'admin' table
    const selectQuery = `SELECT * FROM admins WHERE username = ?`;
    const results = await queryAsync(selectQuery, [adminUsername]);

    if (!results.length) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const insertQuery = `INSERT INTO admins (username, password) VALUES (?, ?)`;
      try {
        await queryAsync(insertQuery, [adminUsername, hashedPassword]);
        console.log(green, `${symbol} Inserted admin credentials`);
      } catch (error) {
        console.log(red, `${qm} Error inserting admin credentials: ${error}`);
      }
    } else {
      console.log(green, `${symbol} Admin credentials already exist`);
    }
  } catch (error) {
    console.log(red, `${qm} Error creating admins table: ${error}`);
    process.exit(1);
  }
};
