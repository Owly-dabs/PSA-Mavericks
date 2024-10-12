const mongoose = require('mongoose'); 

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
    signedUpActivities: [{ // Array of activity ObjectIds
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Activity' 
    }] 
});

const User = mongoose.model("User", userSchema);
module.exports = User;