const express = require('express');
const sequelize = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

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


app.use(userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
