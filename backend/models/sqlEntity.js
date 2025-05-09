// Models/Entity.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../sqlConfig/mysql');

const Entity = sequelize.define('Entity', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});


module.exports = Entity;