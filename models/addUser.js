const { red, qm, symbol, green } = require("../utils/logging");

async function users (queryAsync){
  try {
    // Membuat tabel baru jika tidak ada
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS addUsers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        department_id INT,
        created_at TIMESTAMP,
      )
    `;
    const usersTable = await queryAsync(createTableQuery);
    const result = (usersTable !== 0) ? "Already Exist" : "Created";
    console.log(green, `${symbol} Users Table: ${result}`);
  } catch (error) {
    // Terminasi Program dan Keluar
    console.log(red, `${qm} Error creating users table: `, error);
    process.exit(1);
  }
};

module.exports = users;