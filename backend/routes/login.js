const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const LoginRouter = express.Router();

LoginRouter.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: "Invalid username or password"});
        }

        const token = jwt.sign({user_id: user.user_id}, process.env.SECRET_KEY);
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).send();

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = LoginRouter;
