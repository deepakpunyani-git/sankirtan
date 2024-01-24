const jwt = require('jsonwebtoken');
require('dotenv').config()
const SecretKey = process.env.SecretKey
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  const token_h = req.header('Authorization');

  if (!token_h) {
    return res.status(401).json({ success: false, message: 'Unauthorized access. Please log in.' });
  }

  const token = token_h.replace('Bearer ', '');

  

  try {
    const decoded = jwt.verify(token, SecretKey);
    // Ensure that the decoded object has a user property
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token. User information not found.' });
    }

    // Set req.user to the decoded user
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    console.error('Invalfid token:', token);
    return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
  }


};

// Middleware to check user type
const checkUserType = (allowedUserType) => {
  return (req, res, next) => {
    const user = req.user;
    //console.log(req);
    if (user && user.userType === allowedUserType) {
      next();
    } else {
      res.status(403).json({ success: false, message: 'Permission denied.' });
    }
  };
};
  

module.exports = {isAuthenticated , checkUserType};