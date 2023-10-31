const { red, qm, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Admin
const adminUsername = "admin";
const adminPassword = "vancouver";

const admins = async (queryAsync) => {
  try {
    // Membuat tabel baru jika tidak ada
    const adminsTable = await queryAsync(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
      )`
    );
    const result = (adminsTable !== 0) ? "Already Exist" : "Created";
    console.log(green, `${symbol} Admins Table: ${result}`);

    // Memeriksa data di tabel admins
    const selectQuery = `SELECT * FROM admins WHERE username = ?`;
    const results = await queryAsync(selectQuery, [adminUsername]);
    
    // Jika tidak ada, insert
    if (!results.length) {
      
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const insertQuery = `INSERT INTO admins (username, password) VALUES (?, ?)`;
      
      try {
        await queryAsync(insertQuery, [adminUsername, hashedPassword]);
      } catch (error) {
        console.log(red, `${qm} Error inserting admin: ${error}`);
      }
    }
  } catch (error) {
    // Terminasi Program dan Keluar
    console.log(red, `${qm} Error creating admins table: `, error);
    process.exit(1);
  }
};

module.exports = admins;