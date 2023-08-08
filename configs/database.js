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

module.exports = pool;
