const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Linking the badge to user 
    required: true
  },
  icon: {
    type: String, // URL for the badge's icon image
    required: false
  }
});

module.exports = mongoose.model('Badge', badgeSchema);