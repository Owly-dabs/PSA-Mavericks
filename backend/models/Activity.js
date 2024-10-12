const mongoose = require('mongoose'); 

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or file path to the image
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  vacancies: {
    type: Number,  // Number of spots available
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  category: {
    type: String, 
    required: true,
  },
  signedUpUsers: [{ // Array of user ObjectIds
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  }] 
}, { timestamps: true });

// Create the Activity model
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;