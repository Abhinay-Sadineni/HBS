// models/Availabilities.js

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Availabilities = sequelize.define('Availabilities', {
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
    start_period: {
        type: Sequelize.DATE,
        allowNull: true 
    },
    end_period: {
        type: Sequelize.DATE,
        allowNull: true 
    }
}, {
    tableName: 'availabilities'
});

module.exports = Availabilities;
