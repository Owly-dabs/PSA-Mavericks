const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Project Management'], // You can add more categories as needed
    required: true,
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // Define the levels according to your needs
    required: true,
  },
  duration: {
    type: Number, // Duration in hours or days
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
});

// Create a Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;