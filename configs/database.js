const mysql = require('mysql2');
const dbConfig = require("./config.json");

const config = dbConfig["development"]["mysql"];
// Create database pool
const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: config.waitForConnections,
  connectionLimit: config.connectionLimit,
  queueLimit: config.queueLimit,
});

module.exports = pool;
