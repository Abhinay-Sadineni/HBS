// models/PriceCalendar.js

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const PriceCalendar = sequelize.define('PriceCalendar', {
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
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'price_calendar'
});

module.exports = PriceCalendar;
