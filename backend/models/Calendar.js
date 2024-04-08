// models/Availabilities.js

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Calendar = sequelize.define('Calendar', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Rooms',
            key: 'id'
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true 
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'Calendar'
});

module.exports = Calendar;
