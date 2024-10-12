const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => { 
    const {name, email, password} = req.body;

    try { 
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            console.log(existingUser)
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) { 
        res.status(500).json({ error: error });
    }
    
}); 

router.post('/login', async (req, res) => {
    const {email, password} = req.body; 

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        res.status(200).json({ message: 'Login successful', user });
      } catch (error) {
        res.status(500).json({ error: 'Login error' });
      }
}); 

module.exports = router;