const express = require('express');
const mongoose = require('mongoose'); 
const nodemon = require('nodemon');
const UserModel = require('./models/User')

const app = express(); 
app.use(express.json());

mongoose.connect("mongodb+srv://root:PSApassword@psa-db.2csz1.mongodb.net/PSA-DB?retryWrites=true&w=majority&appName=PSA-DB")
.then(() => {
    console.log("Connected to database");
    app.listen(3000, () => { 
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed")
});

app.post('/register', (req, res) => { 
    const {name, email, password} = req.body;

    try { 
        const existingUser = User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ name, email, password });
        newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) { 
        res.status(500).json({ error: 'Error creating user' });
    }
    
}); 