const express = require('express');
const mongoose = require('mongoose'); 
const nodemon = require('nodemon');
const cors = require('cors'); 
const dotenv = require('dotenv').config(); 
const authRouter = require('./routes/auth');
const engageRouter = require('./routes/engagement');

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

app.use('/api/auth', authRouter);
app.use('/api/engagement', engageRouter); 