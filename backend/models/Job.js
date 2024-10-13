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
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;