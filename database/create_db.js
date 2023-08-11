const mysql = require('mysql2');
const loadingAnimation = require('../utils/loading');
const { red, yellow, symbol, green, blue, qm } = require("../utils/logging");

console.clear();
// Database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
});

  // Create the database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS simfactory`, (error, results) => {
    if (error) {
      console.error(`Error creating database: ${error.message}`);
      connection.end(() => {
        process.exit(1);
      });
      return;
    }

    // Contoh penggunaan
    const animation = loadingAnimation(`${symbol} Checking Database`);
    if (results && results.warningStatus === 0) {
      setTimeout(() => {
        clearInterval(animation);
        console.log(green, `\n${symbol} Database SIMFACTORY created successfully!`);
        createUser();
      }, 3000);
    } else {
      setTimeout(() => {
        clearInterval(animation);
        console.log(yellow, `\n${symbol} Database already exists!`);
        createUser();
      }, 3000);
    }
      // Wait for 3 seconds
    setTimeout(() => {
      connection.end(() => {
        process.exit(0);
      });
    }, 4500);
  });

const createUser = () => {
  connection.query('USE simfactory', (error, results) => {
    if (error) {
      console.error(`Error using database: ${error.message}`);
      connection.end(() => {
        process.exit(1);
      });
      return;
    }
    connection.query(
      "CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'vancouver'",
      (error, results) => {
        if (error) {
          console.log(blue, `${symbol} User already created`);
        } else {
          console.log(green, `${symbol} User dev_user@localhost created`);
        }
        connection.query(
          "GRANT ALL PRIVILEGES ON simfactory.* TO 'dev_user'@'localhost'",
          (error, results) => {
            if (error) {
              console.error(`Error granting privileges: ${error.message}`);
            }
            if (results && results.warningStatus === 0) {
              console.log(blue, `${symbol} User already granted`);
            }
            if (results && results.warningStatus === 1) {
              console.log(blue, `${symbol} Grant user priviliges successfully`);
            }
          });
      }
    )
  });
}