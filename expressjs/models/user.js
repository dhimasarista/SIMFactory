const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Definisi kolom-kolom lain yang sesuai dengan tabel 'users'
  // misalnya: username, email, password, dll.
}, {
  timestamps: false, // Nonaktifkan kolom 'createdAt' dan 'updatedAt'
});

module.exports = User;