// backend/database.js
const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db', 'database.sqlite'),
  logging: false // opcional: quita logs de SQL
});

module.exports = sequelize;