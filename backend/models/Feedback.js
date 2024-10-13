const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  feedbackText: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Linking the feedback to the user
    required: true
  },
  feedbackDate: {
    type: Date,
    default: Date.now // Automatically set the date when feedback is submitted
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);