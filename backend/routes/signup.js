const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middlewares/auth');

const SignupRouter = express.Router();

SignupRouter.post('/signup', auth, async(req, res) => {
    try {
        const {username, email, password, phone_number, country_code} = req.body;

        const old_username = await User.findOne({where: {username}});
        const old_email = await User.findOne({where: {email}});
        if (old_username) {
            return res.status(400).json({ message: "Username is already taken" });
        }
        if (old_email) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashed_password = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashed_password,
            phone_number,
            country_code
        });

        const token = jwt.sign({user_id: newUser.user_id}, process.env.SECRET_KEY);

        res.status(201).json({token});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = SignupRouter;
