const express = require('express');
const sequelize = require('./config');
const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Image = require('./models/Image');
const FAQ = require('./models/FAQ');
const Room = require('./models/Room');
const Reservation = require('./models/Reservation');

const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
