const mongoose = require('mongoose'); 

const userInfoSchema = new Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencing the User model
      required: true,
    },
    signedUpActivities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity', // Referencing the Activity model
    }],
    // Additional user-related information can be stored here if needed
  });

  
  const UserInfo = mongoose.model('UserInfo', userInfoSchema);
  module.exports = UserInfo;