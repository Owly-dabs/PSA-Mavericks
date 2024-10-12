const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

//create activity 
router.post('/createActivity', async (req, res) => {
    const { title, details, image, date, time, vacancies, creator, category } = req.body;
  
    try {
      const newActivity = new Activity({ title, details, image, date, time, vacancies, creator, category, signedUpUsers: []});
      await newActivity.save();
      res.status(201).json({ message: 'Activity created successfully', activity: newActivity });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error creating activity' });
    }
});

//retrieve all activities 
router.get('/getAllActivities', async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching activities' });
    }
});

// retrieve an activity by ID
router.get('/getActivity/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const activity = await Activity.findById(id);
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching activity' });
    }
});

// retrieve activities by category
router.get('/getActivityByCat/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
      const activities = await Activity.find({ category: categoryName});
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching activities by category' });
    }
  });


// GET: Retrieve activities created by a specific user
router.get('/getActivityByUser/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const activities = await Activity.find({ creator: userId });
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching activities by user' });
    }
});

// POST: Sign up for an activity
router.post('/:id/signup', async (req, res) => {
    const { userId } = req.body; // Assume user ID is sent in the request body
  
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      if (activity.vacancies > 0) {
        activity.vacancies -= 1; // Decrease the number of available vacancies
        await activity.save();
        res.status(200).json({ message: 'Signed up successfully', activity });
      } else {
        res.status(400).json({ message: 'No vacancies available' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error signing up for activity' });
    }
  });


module.exports = router;