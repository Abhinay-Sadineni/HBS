const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SignupRouter = express.Router();

SignupRouter.post('/signup', async(req, res) => {
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
        await User.create({
            username,
            email,
            password: hashed_password,
            phone_number,
            country_code
        });
        res.status(201).json({"message": "Account Created"});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = SignupRouter;
