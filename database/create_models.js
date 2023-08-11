const admins = require("../models/admins");
const department = require("../models/departments");
const employees = require("../models/employees");
const loadingAnimation = require("../utils/loading");
const {magenta, qm, symbol } = require("../utils/logging");
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: "simfactory"
  });

admins(connection);
department(connection);
employees(connection);
const animation = loadingAnimation(`${symbol} Checking Tables`);
setTimeout(() => {
    clearInterval(animation);
    console.log(magenta, `\n${qm} Checking tables finished`);
    process.exit(0);
  }, 5000);