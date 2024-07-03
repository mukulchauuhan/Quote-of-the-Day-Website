const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register new user
router.post('/register', async(req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({username, password: hashedPassword});
    await user.save();
    res.json({message: 'User registered successfully'});
});

// Login user
router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({id: user._id}, 'your_jwt_secret');
    res.json({token});
});

module.exports = router;