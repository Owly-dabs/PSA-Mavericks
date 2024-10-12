const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

//create activity 
router.post('/createActivity', async (req, res) => {
    const { title, details, image, date, time, vacancies, creator, category } = req.body;
  
    try {
      const newActivity = new Activity({ title, details, image, date, time, vacancies, creator, category });
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


module.exports = router;