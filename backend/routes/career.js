const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const Job = require('../models/Job');
const Pathway = require('../models/Pathway'); 

//create job
router.post('/createJob', async (req, res) => {
    const { title, jobDescription, yearsOfExperience, category, skillLevel } = req.body;
  
    try {
      // Create a new job
      const newJob = new Job({
        title,
        jobDescription,
        yearsOfExperience,
        category,
        skillLevel,
      });
  
      // Save the job to the database
      await newJob.save();
  
      // Return the newly created job
      res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
      res.status(500).json({ error: 'Error creating job' });
    }
  });


// Route to set current job and job category in UserInfo
router.post('/setCurrentJob', async (req, res) => {
    const { userId, jobId, jobCategory } = req.body;
  
    try {
      // Find UserInfo by userId
      const userInfo = await UserInfo.findOne({ user: userId });
      if (!userInfo) {
        return res.status(404).json({ message: 'User info not found' });
      }
  
      // Find the job by jobId
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Update the current job and job category in userInfo
      userInfo.currentJob = job._id;
      userInfo.jobCategory = jobCategory;
  
      // Save the updated userInfo
      await userInfo.save();
  
      res.status(200).json({ message: 'Current job and category updated successfully', userInfo });
    } catch (error) {
      res.status(500).json({ error: 'Error updating current job and category' });
    }
  });

  router.get('/currentJob/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find UserInfo by userId
      const userInfo = await UserInfo.findOne({ user: userId }).populate('currentJob');
      if (!userInfo) {
        return res.status(404).json({ message: 'User info not found' });
      }
  
      // Check if the user has a current job
      if (!userInfo.currentJob) {
        return res.status(404).json({ message: 'No current job assigned' });
      }
  
      // Send the user's current job details
      res.status(200).json({ currentJob: userInfo.currentJob });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching current job' });
    }
  });

  // Route to get jobs by category
router.get('/getJobPathway/:category', async (req, res) => {
    const { category } = req.params;
  
    try {
      // Find jobs by category and sort by years of experience
      const jobs = await Job.find({ category }).sort({ yearsOfExperience: 1 });
      if (jobs.length === 0) {
        return res.status(404).json({ message: 'No jobs found in this category' });
      }
  
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching jobs' });
    }
  });

  router.get('/getJobName/:jobId', async (req, res) => {
    const { jobId } = req.params;
  
    try {
      // Find the job by ID
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Return the job name
      res.status(200).json({ jobName: job.title });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching job name' });
    }
  });

module.exports = router;