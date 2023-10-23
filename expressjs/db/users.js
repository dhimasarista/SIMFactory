const { red, qm, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Users
const userUsername = "user";
const userPassword = "vancouver";

async function users (queryAsync){
  try {
    // Membuat tabel baru jika tidak ada
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        department_id INT,
        created_at TIMESTAMP,
        FOREIGN KEY (department_id) REFERENCES departments(id)
      )
    `;
    const usersTable = await queryAsync(createTableQuery);
    const result = (usersTable !== 0) ? "Already Exist" : "Created";
    console.log(green, `${symbol} Users Table: ${result}`);

    const [userResults] = await queryAsync(`SELECT * FROM users WHERE username = ?`, [userUsername]);
    if (!userResults) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
      await queryAsync(insertQuery, [userUsername, hashedPassword]);
      console.log(green, `${symbol} Inserted user credentials`);
    }
  } catch (error) {
    // Terminasi Program dan Keluar
    console.log(red, `${qm} Error creating users table: `, error);
    process.exit(1);
  }
};

module.exports = users;