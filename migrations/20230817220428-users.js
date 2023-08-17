'use strict';

const bcrypt = require('bcrypt');

const userUsername = "user";
const userPassword = "vancouver";

module.exports = {
  up: async (db, callback) => {
    try {
      await db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        username: { type: 'string', length: 255, notNull: true },
        password: { type: 'string', length: 255, notNull: true },
        department_id: { type: 'int', foreignKey: {
          name: 'users_department_id_fk',
          table: 'departments',
          mapping: 'id',
          rules: { onDelete: 'CASCADE' }
        }},
        created_at: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') }
      });

      const results = await db.runSql(`SELECT * FROM users WHERE username = ?`, [userUsername]);
      if (!results.length) {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        await db.runSql(`INSERT INTO users (username, password) VALUES (?, ?)`, [userUsername, hashedPassword]);
      }

      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  },

  down: async (db, callback) => {
    try {
      await db.dropTable('users');
      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
};
