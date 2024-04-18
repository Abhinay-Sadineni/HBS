const express = require('express');
const sequelize = require('./config');
const UserController = require('./controllers/UserController');
const HotelController = require('./controllers/HotelController');
// const ReservationController = require('./controllers/ReservationController');

const models = require('./models');

const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors())

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

app.use(UserController);
app.use(HotelController);
// app.use(ReservationController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
