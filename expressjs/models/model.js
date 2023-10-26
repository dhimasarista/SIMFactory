const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Model = sequelize.define('models', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    target_quantity: {
      type: DataTypes.BIGINT
    },
    total_output: {
      type: DataTypes.BIGINT
    },
    stocks: {
      type: DataTypes.BIGINT
    },
    updated_by: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false // Menonaktifkan createdAt dan updatedAt
  });
  

module.exports = Model;