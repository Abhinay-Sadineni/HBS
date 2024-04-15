const User = require('./User');
const Hotel = require('./Hotel');
const Reservation = require('./Reservation');
const RoomType = require('./RoomType');
const FAQ = require('./FAQ');
const Image = require('./Image');
const Calendar = require("./Calendar")

// Define associations after all models have been imported
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Hotel, { foreignKey: 'manager_id' });
Hotel.belongsTo(User, { foreignKey: 'manager_id' });

Hotel.hasMany(Reservation, { foreignKey: 'hotel_id' });
Reservation.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(RoomType, { foreignKey: 'hotel_id' });
RoomType.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(FAQ, { foreignKey: 'hotel_id' });
FAQ.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(Image, { foreignKey: 'hotel_id' });
Image.belongsTo(Hotel, { foreignKey: 'hotel_id' });

RoomType.hasMany(Reservation, { foreignKey: 'room_type_id' });
Reservation.belongsTo(RoomType, { foreignKey: 'room_type_id' });

RoomType.hasMany(Calendar, { foreignKey: 'room_type_id' });
Calendar.belongsTo(RoomType, { foreignKey: 'room_type_id' });


module.exports = {
  User,
  Hotel,
  Reservation,
  RoomType,
  FAQ,
  Image
};