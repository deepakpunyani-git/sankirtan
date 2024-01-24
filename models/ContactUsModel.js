const mongoose = require('mongoose');

// Define the schema for the ContactUs model
const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\S+@\S+\.\S+$/,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'read'], // Allowed values for status
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the ContactUs model using the schema
const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// Export the model
module.exports = ContactUs;
