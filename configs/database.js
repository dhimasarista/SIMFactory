const mysql = require('mysql2');
const dbConfig = require("./config");

const config = dbConfig.development;
// Create database pool
const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: config.waitForConnections,
  connectionLimit: config.connectionLimit, // Adjust the number of connections as per your requirements
  queueLimit: config.queueLimit,
});

module.exports = pool;
