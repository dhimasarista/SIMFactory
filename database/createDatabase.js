const mysql = require('mysql2');
const loadingAnimation = require('../utils/loading');
const { yellow, symbol, green, blue } = require("../utils/logging");

console.clear();
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
});

  // Membuat database baru jika tidak ada
  connection.query(`CREATE DATABASE IF NOT EXISTS simfactory`, (error, results) => {
    if (error) {
      console.error(`Error creating database: ${error.message}`);
      connection.end(() => {
        process.exit(1);
      });
      return;
    }

    // Animasi Loading CLI
    const animation = loadingAnimation(`${symbol} Checking Database`);
    if (results && results.warningStatus === 0) {
      setTimeout(() => {
        clearInterval(animation);
        // Jika sukses
        console.log(green, `\n${symbol} Database SIMFACTORY created successfully!`);
        createUser();
      }, 3000);
    } else {
      setTimeout(() => {
        // Jika sudah ada
        clearInterval(animation);
        console.log(yellow, `\n${symbol} Database already exists!`);
        // Memanggil fungsi `createUser()`
        createUser();
      }, 3000)
    }
      // Terminasi koneksi database setelah selesai
    setTimeout(() => {
      connection.end(() => {
        process.exit(0);
      });
    }, 4500); // Setelah 4.5 detik, terminasi program
  });

// Funsi membuat user default
const createUser = () => {
  // Menggunakan database `simfactory`
  connection.query('USE simfactory', (error, results) => {
    if (error) {
      console.error(`Error using database: ${error.message}`);
      connection.end(() => {
        process.exit(1);
      });
      return;
    }
    // Membuat user dengan nama `dev_user` dan password `vancouver`
    connection.query(
      "CREATE USER 'dev_user'@'localhost' IDENTIFIED BY 'vancouver'",
      (error, results) => {
        // Memeriksa dan menampilkan hasil
        if (error) {
          console.log(blue, `${symbol} User already created`);
        } else {
          console.log(green, `${symbol} User dev_user@localhost created`);
        }
        // Memberikan akses `dev_user` ke database `simfactory`
        connection.query(
          "GRANT ALL PRIVILEGES ON `simfactory`.* TO 'dev_user'@'localhost' WITH GRANT OPTION;",
          (error, results) => {
            // Memeriksa dan menampilkan hasil
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