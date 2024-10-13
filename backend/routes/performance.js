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



module.exports = router;  
