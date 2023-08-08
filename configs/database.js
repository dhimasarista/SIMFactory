const mysql = require('mysql2');

// Create database pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: 'root',
  password: '',
  database: 'simfactory',
  waitForConnections: true,
  connectionLimit: 10, // Adjust the number of connections as per your requirements
  queueLimit: 0,
});

module.exports = {
  development: {
    host: "localhost",
    port: 3306,
    user: "dev_user",
    password: "vancouver",
    database: "simfactory",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
};
