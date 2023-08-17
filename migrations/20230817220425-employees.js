'use strict';

module.exports = {
  up: async (db, callback) => {
    try {
      await db.createTable('employees', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255, notNull: true },
        address: { type: 'string', length: 255 },
        number_phone: { type: 'string', length: 15 },
        email: { type: 'string', length: 100 },
        last_education: { type: 'string', length: 100 },
        major: { type: 'string', length: 255 },
        title: { type: 'string', length: 50 },
        work_experience: { type: 'text' },
        skills: { type: 'text' },
        application_letter: { type: 'blob' },
        CV: { type: 'blob' },
        portfolio: { type: 'blob' },
        mcu: { type: 'boolean' },
        criminal_history: { type: 'boolean' },
        employment_contract: { type: 'blob' },
        department_id: { type: 'int', notNull: true, foreignKey: {
          name: 'employees_department_id_fk',
          table: 'departments',
          mapping: 'id',
          rules: { onDelete: 'CASCADE' }
        }},
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
      await db.dropTable('employees');
      callback();
    } catch (err) {
      console.error(err);
      callback(err);
    }
  }
};
