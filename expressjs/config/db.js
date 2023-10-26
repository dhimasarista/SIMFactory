const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // Sesuaikan dengan jenis database yang Anda gunakan (misalnya, 'mysql', 'postgres', 'sqlite', dsb.)
  host: 'localhost', // Sesuaikan dengan host database Anda
  username: 'dev_user', // Sesuaikan dengan username database Anda
  password: 'vancouver', // Sesuaikan dengan password database Anda
  database: 'simfactory', // Sesuaikan dengan nama database Anda
  logging: false // Menonaktifkan output query SQL
});

module.exports = sequelize;
