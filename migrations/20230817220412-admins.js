'use strict';

const bcrypt = require('bcrypt');

const adminUsername = "admin";
const adminPassword = "vancouver";

module.exports = {
  up: async (db, callback) => {
    try {
      await db.createTable('admins', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        username: { type: 'string', length: 255, notNull: true },
        password: { type: 'string', length: 255, notNull: true },
        created_at: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') }
      });

      const results = await db.runSql(`SELECT * FROM admins WHERE username = ?`, [adminUsername]);
      if (!results.length) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await db.runSql(`INSERT INTO admins (username, password) VALUES (?, ?)`, [adminUsername, hashedPassword]);
      }

      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  },

  down: async (db, callback) => {
    try {
      await db.dropTable('admins');
      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
};
