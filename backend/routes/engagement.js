const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');


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
/*
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
*/
// Retrieve an activity by ID and populate the signedUpUsers field
router.get('/getActivity/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const activity = await Activity.findById(id)
          .populate('signedUpUsers', 'name email'); // Populate with user details (name, email, etc.)

      if (!activity) {
          return res.status(404).json({ message: 'Activity not found' });
      }

      res.status(200).json(activity); // Return the populated activity
  } catch (error) {
      console.error('Error fetching activity:', error);
      res.status(500).json({ message: 'Error fetching activity' });
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

/*
// POST: Sign up for an activity
/*router.post('/:id/signup', async (req, res) => {
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
  });*/


// POST: Sign up for an activity
router.post('/:id/signup', async (req, res) => {
    const { userId } = req.body; // Assume user ID is sent in the request body
  
    try {
      // Find the activity by ID
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
  
      // Check if the activity has available vacancies
      if (activity.vacancies <= 0) {
        return res.status(400).json({ message: 'No vacancies available' });
      }
  
      // Find the user and user info
      const user = await User.findById(userId);
      const userInfo = await UserInfo.findOne({ user: userId });
  
      if (!user || !userInfo) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has already signed up for the activity
      if (activity.signedUpUsers.includes(userId) || userId == activity.creator) {
        return res.status(400).json({ message: 'User already signed up for this activity' });
      }
  
      // Add the user to the activity's signedUpUsers array
      activity.signedUpUsers.push(userId);
      activity.vacancies -= 1; // Decrease the number of available vacancies
  
      // Add the activity to the user's signed-up activities array
      userInfo.signedUpActivities.push(activity._id);
  
      // Save both the activity and user info updates
      await activity.save();
      await userInfo.save();
  
      res.status(200).json({ message: 'Signed up successfully', activity });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Error signing up for activity', details: error });
    }
  });
*/
// POST: Sign up for an activity
router.post('/:id/signup', async (req, res) => {
  const { userId } = req.body; // Assume user ID is sent in the request body

  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if the user is already signed up
    if (activity.signedUpUsers.includes(userId)) {
      return res.status(400).json({ message: 'You are already signed up for this activity' });
    }

    if (activity.vacancies > 0) {
      // Decrease the number of available vacancies
      activity.vacancies -= 1;

      // Add the user to the signedUpUsers array
      activity.signedUpUsers.push(userId);

      await activity.save();
      res.status(200).json({ message: 'Signed up successfully', activity });
    } else {
      res.status(400).json({ message: 'No vacancies available' });
    }
  } catch (error) {
    console.error('Error signing up for activity:', error);
    res.status(500).json({ error: 'Error signing up for activity' });
  }
});

module.exports = router;