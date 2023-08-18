const admins = require("../models/admins");
const department = require("../models/departments");
const employees = require("../models/employees");
const users = require("../models/users");
const {magenta, qm, symbol } = require("../utils/logging");

const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

(async () => {
  await admins(queryAsync);
  await department(queryAsync)
  await employees(queryAsync); 
  await users(queryAsync);
  setTimeout(() => {
      console.log(magenta, `${symbol} Checking tables finished`);
      process.exit(0);
    }, 5000);
})