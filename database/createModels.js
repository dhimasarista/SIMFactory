const admins = require("../models/admins");
const department = require("../models/departments");
const employees = require("../models/employees");
const users = require("../models/users");
const { magenta, qm, symbol } = require("../utils/logging");

const { promisify } = require('util');
const pool = require("../configs/database");
const queryAsync = promisify(pool.query).bind(pool);

// Memanggil semua fungsi untuk membuat tables 
// dari direktori /models
(async () => {
  try {
    await admins(queryAsync);
    await department(queryAsync);
    await employees(queryAsync);
    await users(queryAsync);

    // Menampilkan pesan secara implisit
    console.log(magenta, `${symbol} Checking tables finished`);
    process.exit(0); // Terminasi Program tanpa error
  } catch (error) {
    // Jikapun terjadi error, periksa hasil errornya
    console.error(qm, `${symbol} Error: `, error);
    process.exit(1); // Terminasi dengan status terjadi error
  }
})();
