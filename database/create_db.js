const mysql = require('mysql2');
const loadingAnimation = require('../utils/loading');


// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
});

  // Create the database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS simfactory`, (error, results) => {
    let box = [];
    if (error) {
      console.error(`Error creating database: ${error.message}`);
      connection.end(() => {
        process.exit(1);
      });
      return;
    }
      // Contoh penggunaan
    const animation = loadingAnimation();
    if (results && results.warningStatus === 0) {
      setTimeout(() => {
        clearInterval(animation);
        console.log('\x1b[32m%s\x1b[0m', `\n>>> Database SIMFACTORY created successfully!`);
      }, 3000);
    } else {
      setTimeout(() => {
        clearInterval(animation);
        console.log('\x1b[33m%s\x1b[0m', `\n>>> Database already exists!`);
      }, 3000);
    }

    // Wait for 3 seconds
    setTimeout(() => {
      connection.end(() => {
        process.exit(0);
      });
    }, 4500);
  });