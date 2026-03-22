// Import the Contact model
const Contact = require('../models/Contact');

// Controller functions handle the business logic for contact routes

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Public (In production, only admin should access this)
exports.getContactMessages = async (req, res) => {
  try {
    // Find all messages and sort by newest first
    const messages = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
exports.createContactMessage = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email, and message are required',
      });
    }

    // Create a new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to the database
    const savedContact = await contact.save();

    res.status(201).json({
      message: 'Your message has been sent successfully!',
      contact: savedContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// @desc    Mark a message as read
// @route   PATCH /api/contact/:id/read
// @access  Public (In production, only admin should access this)
exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Public (In production, only admin should access this)
exports.deleteContactMessage = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
