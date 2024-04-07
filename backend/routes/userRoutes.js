const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

//Login route
router.post('/login', UserController.login);

//Signup route
router.post('/signup', UserController.signup);

//Profile route
router.put('/profile/:user_id', UserController.editProfile);

module.exports = router;
