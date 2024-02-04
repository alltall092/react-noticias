const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const News = sequelize.define('News', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  newsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = News;