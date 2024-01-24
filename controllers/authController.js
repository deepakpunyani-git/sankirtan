const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const hash = require('../helpers/hash')

const User = require('../models/userModel');

var jwt = require('jsonwebtoken');
require('dotenv').config()
const SecretKey = process.env.SecretKey

const validator = require('validator');

// Your nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'aol', // Use the email service you prefer
  auth: {
    user: 'process.env.mail', 
    pass: 'process.env.pass' 
  }
});


// User Login
const login = async (req, res) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
        
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
          // Validation failed
          return res.status(400).json({ success: false, error: error.details });
        } else {
            const { email, password } = req.body;
            const user = await User.findOne({email:email});
           if (!user) {
              return res.status(401).json({ success: false, error: 'User not Found' });
            }    
    
            if(user.emailVerification == 0){
                return res.status(401).json({ success: false, error: 'Email Verification Pending' });
            }
    
            if(user.active == 0){
                return res.status(401).json({ success: false, error: 'Account not active' });
            }
            
            // Validate the password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
            }

    
            const token = jwt.sign(
                                    { 
                                        userId: user._id ,
                                        firstName: user.firstName , 
                                        lastName: user.lastName,
                                        userType:user.userType  
                                    },
                                    SecretKey,
                                    { expiresIn: '1d' }
                                );

    
            res.status(200).json({ success: true, token ,user_details:{ 
              firstName: user.firstName , 
              lastName: user.lastName,
              userType:user.userType  
          } });
        }

 


    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
};

// User register
const registerUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } = req.body;
  
      // Check if all required fields are present and non-empty
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Validation
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
      }
  
      // Sanitization
      const sanitizedEmail = validator.escape(email);
  
      if (!hash.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Password is not strong' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if email already exists
      const existingUser = await User.findOne({ email: sanitizedEmail });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newUser = new User({
        firstName,
        lastName,
        email: sanitizedEmail,
        password,
        userType: 0, // 0 for regular users
      });

        // Generate OTP
      //const otp = Math.floor(100000 + Math.random() * 900000);
      const otp = 1234;
      
      await sendOTP(newUser.email, otp);
      newUser.otp = otp;
      newUser.otp_timestamp = Date.now() + 24 * 60 * 60 * 1000; // OTP valid for 1 day
      await newUser.save();
  
      return res.status(201).json({success: true, data: newUser, message: 'User registered successfully. OTP sent to email.' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Artist register
const registerArtist = async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, artistType, artistServices } = req.body;
  
      // Check if all required fields are present and non-empty
      if (!firstName || !lastName || !email || !password || !confirmPassword || !artistType || !artistServices) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Validation
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email' });
      }
  
      // Sanitization
      const sanitizedEmail = validator.escape(email);
  
      if (!hash.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Password is not strong' });
      }
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
  
      // Check if email already exists
      const existingArtist = await Artist.findOne({ email: sanitizedEmail });
      if (existingArtist) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newArtist = new Artist({
        firstName,
        lastName,
        email: sanitizedEmail,
        password,
        userType: 1, // 1 for artists
        artistType,
        artistServices,
      });
  
      await newArtist.save();
  
      return res.status(201).json({ message: 'Artist registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};
  

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Perform user logout action
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Logout failed or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Logout failed"
 */
const logout = async (req, res) => {
    
};
// Send OTP to email
const sendOTP = async (email, otp) => {

  // try {
  //   const mailOptions = {
  //     from: "dpunyani@aol.com",
  //     to: email,
  //     subject: 'Verification OTP',
  //     text: `Your OTP for account verification is: ${otp}. It is valid for 24 hours.`
  //   };

  //   await transporter.sendMail(mailOptions);
  // } catch (error) {
  //   console.error(error);
  //   throw new Error('Failed to send OTP email');
  // }
};

module.exports = {login , logout,registerUser,registerArtist};
