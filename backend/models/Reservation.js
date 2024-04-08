const Sequelize = require('sequelize');
const sequelize = require('../config.js');

const Reservation = sequelize.define('Reservation', {
    rid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    booked_date: Sequelize.DATE,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
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
    room_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Room',
            key: 'room_id'
        }
    },
    status : {
      type: Sequelize.ENUM('cancelled', 'accepted', 'rejected' , 'pending'),
      defaultValue: 'accepted'
    }
}, {
    tableName: 'Reservation'
});

module.exports = Reservation;