const bcrypt = require('bcrypt');
require('dotenv').config()
let saltRounds = parseInt(process.env.saltRounds);
const validator = require('validator');

let encodePass = (pass,callback)=>{
    bcrypt.hash(pass, saltRounds, (err, hash) => {
        if (err) {
            callback(err);
          } else {
            callback(null, hash);
          }
    });
}

function generateRandomPassword(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  
    let randomPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPassword += chars.charAt(randomIndex);
    }
  
    return randomPassword;
  }

  const isStrongPassword = (password) => {
    // Password should be at least 8 characters long
    if (!validator.isLength(password, { min: 8 })) {
      return false;
    }
  
    // Password should contain at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }
  
    // Password should contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // Password should contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    return true;
  };
  
  

module.exports = {encodePass , generateRandomPassword,isStrongPassword}

