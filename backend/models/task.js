const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const Task = sequelize.define('Task', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('none', 'pending', 'in_progress', 'completed'),
    defaultValue: 'none'
  },
  notes: DataTypes.TEXT
});

// Relación
Task.belongsTo(User, { as: 'assignedTo' });

module.exports = Task;