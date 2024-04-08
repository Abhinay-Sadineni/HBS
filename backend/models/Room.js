const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Room = sequelize.define('Room', {
    room_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    room_type: Sequelize.STRING,
    room_no: Sequelize.STRING,
    list_of_amenties: Sequelize.TEXT,
    hotel_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Hotel',
        key: 'hotel_id'
      }
    }
}, {
    tableName: 'Room'
});

module.exports = Room;