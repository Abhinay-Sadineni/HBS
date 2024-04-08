const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const ReservationRooms = sequelize.define('ReservationRooms', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reservation_id: Sequelize.INTEGER,
    room_id: Sequelize.INTEGER,
}, {
    tableName: 'reservation_rooms'
});

module.exports = ReservationRooms;