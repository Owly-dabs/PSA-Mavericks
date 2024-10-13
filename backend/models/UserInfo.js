const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    signedUpActivities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity', // Referencing the Activity model
    }],
    feedbackReceived: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feedback',
    }]
    // Additional user-related information can be stored here if needed
  });

  
  const UserInfo = mongoose.model('UserInfo', userInfoSchema);
  module.exports = UserInfo;