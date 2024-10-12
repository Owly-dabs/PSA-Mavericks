const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true, 
        unique: true, 
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    userInfo: { // Reference to UserInfo
        type: Schema.Types.ObjectId, 
        ref: 'UserInfo' 
    } 
});

const User = mongoose.model("User", userSchema);
module.exports = User;