const pool = require("../configs/database");
const admins = require("../models/admins");
const employees = require("../models/employees");
const { green, symbol } = require("../utils/logging");

admins(pool);
employees(pool);
console.log(green, `${symbol} Tabels good.`);