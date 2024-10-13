const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const Feedback = require('../models/Feedback');
const Badge = require('../models/Badge');


router.post('/submitFeedback', async (req, res) => {
    const { feedbackText, userSent, userReceived, category } = req.body;
  
    try {
      // Find user and userInfo
      const userWhoSent = await User.findById(userSent);
      const userWhoReceived = await User.findById(userReceived);
      if (!userWhoSent || !userWhoReceived) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userInfo = await UserInfo.findOne({ user: userReceived });
      if (!userInfo) {
        return res.status(404).json({ message: 'User info not found' });
      }
  
      // Create and save feedback
      const newFeedback = new Feedback({
        feedbackText,
        userSent: userSent,
        userReceived: userReceived, 
      });
      await newFeedback.save();
  
      // Update feedback count and assign badges if necessary
      userInfo.feedbackReceived.push(newFeedback._id);
      await userInfo.save();
      res.status(201).json({ message: 'Feedback submitted successfully', newFeedback });

    } catch (error) {
      res.status(500).json({ error: 'Error submitting feedback' });
    }
});

router.get('/:userId/getFeedback', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user's UserInfo to get the feedback IDs
      const userInfo = await UserInfo.findOne({ user: userId }).populate('feedbackReceived');
      
      if (!userInfo || userInfo.feedbackReceived.length === 0) {
        return res.status(404).json({ message: 'No feedback found for this user' });
      }
  
      // Populate the feedback data using the feedback IDs stored in userInfo
      const feedbackList = await Feedback.find({
        _id: { $in: userInfo.feedbackReceived } // Fetch feedback based on stored feedback IDs
      });
  
      res.status(200).json({ message: 'Feedback retrieved successfully', feedbackList });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving feedback' });
    }
});

//create badge 
router.post('/createBadge', async (req, res) => {
    const { name, description, iconUrl } = req.body;
  
    try {
      // Check if badge name already exists
      const existingBadge = await Badge.findOne({ name });
      if (existingBadge) {
        return res.status(400).json({ message: 'Badge already exists' });
      }
  
      // Create new badge
      const newBadge = new Badge({
        name,
        description,
        iconUrl,
      });
  
      await newBadge.save();
      res.status(201).json({ message: 'Badge created successfully', badge: newBadge });
    } catch (error) {
      res.status(500).json({ error: 'Error creating badge' });
    }
  });


router.post('/setBadges', async (req, res) => {
    const { userId, badgeNames } = req.body;
  
    // Ensure all badge fields are provided
    if (!Array.isArray(badgeNames) || badgeNames.length !== 3) {
        return res.status(400).json({ message: 'Please provide exactly 3 badge names' });
    }
  
    try {
      // Find the user info that stores the badges
      const userInfo = await UserInfo.findOne({ user: userId });
      if (!userInfo) {
        return res.status(404).json({ message: 'User info not found' });
      }
  
      // Find badges by their names (case insensitive)
      const badges = await Badge.find({ 
        name: { $in: badgeNames.map(name => new RegExp(`^${name}$`, 'i')) } // Case-insensitive matching
      });
  
      if (badges.length !== 3) {
        return res.status(404).json({ message: 'One or more badges not found' });
      }
  
      // remove existing badges and add new badges 
      let badgesAdded = 0;
      userInfo.badgesReceived = [];
      await userInfo.save();
      for (const badge of badges) {
        userInfo.badgesReceived.push(badge._id);          // Add badge to user's badges
        badgesAdded++;
        }
  
      await userInfo.save();
  
      if (badgesAdded === 3) {
        res.status(200).json({ message: `${badgesAdded} badges successfully attached`, badges });
      } else {
        res.status(400).json({ message: 'badges not successfully assigned' });
      }
  
    } catch (error) {
      res.status(500).json({ error: 'Error attaching badges to user' });
    }
  });

  
module.exports = router;  
