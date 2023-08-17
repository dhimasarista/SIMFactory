const mysql = require('mysql2');
const dbConfig = require("../database.json");

const config = dbConfig.dev;
// Create database pool
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: config.waitForConnections,
  connectionLimit: config.connectionLimit,
  queueLimit: config.queueLimit,
});

module.exports = pool;
