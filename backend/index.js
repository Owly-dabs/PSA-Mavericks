const express = require('express');
const mongoose = require('mongoose'); 
const nodemon = require('nodemon');
const UserModel = require('./models/User')

const app = express(); 

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
    UserModel.create(req.body)
    .then(() => {
        user => res.json(user);
        console.log("user registered");
    })
    .catch(err => res.json(err))
}); 