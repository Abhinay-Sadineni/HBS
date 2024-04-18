const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Reservation = sequelize.define('Reservation', {
    rid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    booked_date: Sequelize.DATEONLY,
    start_date: Sequelize.DATEONLY,
    end_date: Sequelize.DATEONLY,
    Review: Sequelize.TEXT,
    Rating: Sequelize.INTEGER,
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    hotel_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Hotel',
        key: 'hotel_id'
      }
    },
    room_type_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'RoomType',
        key: 'room_type_id'
      }
    },
    No_of_rooms: Sequelize.INTEGER,
    payment: Sequelize.INTEGER,
    status : {
      type: Sequelize.ENUM('cancelled', 'accepted', 'rejected' , 'pending'),
      defaultValue: 'accepted'
    }
}, {
    tableName: 'Reservation'
});

module.exports = Reservation;