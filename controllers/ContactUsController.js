const ContactUs = require('../models/ContactUsModel');

exports.listContactMessages = async (req, res) => {
    try {
      const { status } = req.query;
  
      let query = {};
      if (status !== undefined) {
        if (status === 'pending' || status === 'read') {
            query.status = status;

        } else {
          return res.status(400).json({ error: 'Invalid status value. Use all, pending, read, or omit the parameter.' });
        }
      }
  
      const contactMessages = await ContactUs.find(query).sort({ createdAt: -1 });
  
      res.status(200).json(contactMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

exports.addContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Create a new contact record
    const newContact = new ContactUs({
      name,
      email,
      message,
    });

    // Save the contact record to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.changeStatus = async (req, res) => {
    try {
      const { messageId, newStatus } = req.body;
  
      if (!messageId || !newStatus) {
        return res.status(400).json({ error: 'Both messageId and newStatus are required in the request body.' });
      }
  
      const validStatusValues = ['pending', 'read'];
  
      if (!validStatusValues.includes(newStatus)) {
        return res.status(400).json({ error: `Invalid newStatus value. Use one of: ${validStatusValues.join(', ')}.` });
      }
  
      const contactMessage = await ContactUs.findById(messageId);
  
      if (!contactMessage) {
        return res.status(404).json({ error: 'Contact message not found.' });
      }
  
      contactMessage.status = newStatus;
      await contactMessage.save();
  
      res.status(200).json({ message: `Status changed to ${newStatus} successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };