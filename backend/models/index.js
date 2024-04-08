const User = require('./User');
const Hotel = require('./Hotel');
const Reservation = require('./Reservation');
const Room = require('./Room');
const FAQ = require('./FAQ');
const Image = require('./Image');

module.exports = {
  User,
  Hotel,
  Reservation,
  Room,
  FAQ,
  Image
};

// Define associations after all models have been imported
User.hasMany(Reservation, { foreignKey: 'user_id' });
Reservation.belongsTo(User, { foreignKey: 'user_id' });


Hotel.hasMany(Reservation, { foreignKey: 'hotel_id' });
Reservation.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(Room, { foreignKey: 'hotel_id' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(FAQ, { foreignKey: 'hotel_id' });
FAQ.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(Image, { foreignKey: 'hotel_id' });
Image.belongsTo(Hotel, { foreignKey: 'hotel_id' });
