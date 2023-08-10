const pool = require("../configs/database");
const admins = require("../models/admins");
const department = require("../models/departments");
const employees = require("../models/employees");
const { green, symbol } = require("../utils/logging");

admins(pool);
employees(pool);
department(pool);
console.log(green, `${symbol} Tabels good.`);