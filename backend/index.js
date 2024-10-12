const express = require('express');
const mongoose = require('mongoose'); 
const nodemon = require('nodemon');
const cors = require('cors'); // Import cors
const UserModel = require('./models/User');
const User = require('./models/User');
const dotenv = require('dotenv').config(); 

const app = express(); 
app.use(express.json());
app.use(cors());
app.options('*',cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to database");
    app.listen(3000, () => { 
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed")
});

app.post('/register', async (req, res) => { 
    const {name, email, password} = req.body;

    try { 
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            console.log(existingUser)
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) { 
        res.status(500).json({ error: error });
    }
    
}); 

app.post('/login', async (req, res) => {
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