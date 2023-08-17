const admins = require("../models/admins");
const department = require("../models/departments");
const employees = require("../models/employees");
const users = require("../models/users");
const {magenta, qm, symbol } = require("../utils/logging");
const mysql = require('mysql2');
const util = require('util');

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
users(connection);
setTimeout(() => {
    console.log(magenta, `${symbol} Checking tables finished`);
    process.exit(0);
  }, 5000);


