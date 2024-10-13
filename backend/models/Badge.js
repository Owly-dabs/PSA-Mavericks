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
  criteria: {
    type: String, // Criteria to earn the badge, can be based on various metrics
    required: true
  },
  icon: {
    type: String, // URL for the badge's icon image
    required: false
  }
});

module.exports = mongoose.model('Badge', badgeSchema);