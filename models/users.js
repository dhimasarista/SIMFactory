const { red, qm, symbol, green } = require("../utils/logging");
const bcrypt = require('bcrypt');

// Default Users
const userUsername = "user";
const userPassword = "vancouver";

module.exports = async (queryAsync) => {
  try {
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
    await queryAsync(createTableQuery);

    console.log(green, `${symbol} Users Table: Created or already exists`);

    const [userResults] = await queryAsync(`SELECT * FROM users WHERE username = ?`, [userUsername]);

    if (!userResults.length) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
      await queryAsync(insertQuery, [userUsername, hashedPassword]);
      console.log(green, `${symbol} Inserted user credentials`);
    }
  } catch (error) {
    console.log(red, `${qm} Error: ${error}`);
  }
};
