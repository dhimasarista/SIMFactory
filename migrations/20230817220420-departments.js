'use strict';

module.exports = {
  up: async (db, callback) => {
    try {
      await db.createTable('departments', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255, notNull: true },
        created_at: { type: 'timestamp', defaultValue: new String('CURRENT_TIMESTAMP') }
      });

      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  },

  down: async (db, callback) => {
    try {
      await db.dropTable('departments');
      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
};
