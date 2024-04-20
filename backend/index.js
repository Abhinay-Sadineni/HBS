const express = require('express');
const cors = require('cors')
const sequelize = require('./config');
const UserController = require('./controllers/UserController');
const HotelController = require('./controllers/HotelController');
const multer = require('multer');
const path = require('path');
// const ReservationController = require('./controllers/ReservationController');

const models = require('./models');

const app = express();
app.use(express.json());
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

const storage = multer.diskStorage({
  destination: './uploads/', // Folder where images will be stored
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports.upload = upload;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
