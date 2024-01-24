const User = require('../models/userModel');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Your nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'aol', // Use the email service you prefer
  auth: {
    user: 'process.env.mail', 
    pass: 'process.env.pass' 
  }
});


const listUsers = async (req, res) => {
  try {
      const { userType, page = 1, limit = 10 } = req.query;

      const query = {};
      if (userType !== undefined) {
          query.userType = userType;
      }

      const projection = { // Include all fields except 'password'
          profilePic: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          emailVerification: 1,
          userType: 1,
          active: 1,
          dateCreated: 1, // Include dateCreated in the projection
          otp: 1,
          otp_timestamp: 1,
          artist_type: 1,
          artist_services: 1
      };

      const options = {
          select: projection,
          sort: { 'dateCreated': -1 }
      };

      // Calculate the number of documents to skip
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const users = await User.find(query, options).skip(skip).limit(parseInt(limit));
      console.log(users);
      return res.status(200).json({ success: true, users });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const getUserById = async (req, res) => {
  try {
      const { userId } = req.params;

      const user = await User.findById(userId).select('-password');

      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
      }

      return res.status(200).json({ success: true, user });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { getUserById };

// Create User
const createUser = async (req, res) => {
  try {
    const {firstName, lastName, email } = req.body;

    // Check if required fields are present
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, error: 'firstName, lastName, and email are required fields.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }

    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'Email already exists' });
    }

  

    const newUser = await User.create({firstName, lastName, email, userType: 0 });

    return res.status(201).json({success: true, data: newUser, message: 'User registered successfully.' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create Artist
const createArtist = async (req, res) => {
  try {
    const {firstName, lastName, email } = req.body;

    // Check if required fields are present
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, error: 'firstName, lastName, and email are required fields.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }

    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    newUser.otp = otp;
    newUser.otp_timestamp = Date.now() + 24 * 60 * 60 * 1000; // OTP valid for 1 day

    const newUser = await User.create({firstName, lastName, email, userType: 1 , otp});
   

    return res.status(201).json({success: true, data: newUser, message: 'User registered successfully.' });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Deactivate User Account
const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    await User.findByIdAndUpdate(id, { active: false });
    res.status(200).json({ success: true, message: 'User account deactivated' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Activate User Account
const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }

    await User.findByIdAndUpdate(id, { active: true });
    res.status(200).json({ success: true, message: 'User account activated' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


module.exports = { createUser, createArtist, deactivateUser, activateUser , listUsers,getUserById};
