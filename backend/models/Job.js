const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  jobDescription: {
    type: String,
    required: true, // Job description is required
  },
  category: {
    type:String,
    required: true,
  }
}); 

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;