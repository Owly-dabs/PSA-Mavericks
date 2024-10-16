const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

router.post('/register', async (req, res) => { 
    const {name, email, password} = req.body;

    try { 
        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            console.log(existingUser)
            return res.status(400).json({ message: 'User already exists' });
        }


        const newUser = new User({name, email, password});
        await newUser.save();
        const newUserInfo = new UserInfo({ user: newUser._id, signedUpActivities: [] }); 
        await newUserInfo.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) { 
        res.status(500).json({ error: error });
    }
    
}); 

router.post('/login', async (req, res) => {
    const {email, password} = req.body; 

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }
    
        res.status(200).json({ message: 'Login successful', user });
      } catch (error) {
        res.status(500).json({ error: 'Login error' });
      }
}); 


router.post('/update', async (req, res) => {
  const users = await User.find({});
  
  for (const user of users) {
    const userInfo = new UserInfo({
        user: user._id,
        signedUpActivities: [] // Assign the User ID to the userInfo document
      });
      
      await userInfo.save();
  }
  console.log('All users updated with userInfoId');
})

// Route to get UserInfo by User ID
router.get('/getUserInfo/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the UserInfo document by user ID
      const userInfo = await UserInfo.findOne({ user: userId });
      
      if (!userInfo) {
        return res.status(404).json({ message: 'UserInfo not found' });
      }
  
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching UserInfo' });
    }
  });

module.exports = router;