const mongoose = require('mongoose');

const pathwaySchema = new mongoose.Schema({
    category: {
      type: String,
      unique: true, 
      required: true, // Title is required
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference the Job model
        required: true,
    }],
  }); 
  
  const Pathway = mongoose.model('Pathway', pathwaySchema);

  module.exports = Pathway;