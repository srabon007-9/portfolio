// Import the Contact model
const Contact = require('../models/Contact');
const connectDB = require('../config/database');
const { sendContactNotificationEmail } = require('../utils/emailService');

// Controller functions handle the business logic for contact routes

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Public (In production, only admin should access this)
exports.getContactMessages = async (req, res) => {
  try {
    await connectDB();

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
    await connectDB();

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

    // Save to the database with timeout guard to avoid 408s
    const savedContact = await Promise.race([
      contact.save(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('CONTACT_SAVE_TIMEOUT')), 5000)
      ),
    ]);

    // Send notification email after successful save (does not fail the request if email fails)
    let notificationSent = false;
    let notificationReason = null;
    try {
      const emailResult = await sendContactNotificationEmail({
        name,
        email,
        subject,
        message,
        createdAt: savedContact?.createdAt,
      });
      notificationSent = Boolean(emailResult?.sent);
      notificationReason = emailResult?.reason || null;

      if (!notificationSent && emailResult?.errorMessage) {
        console.error('Contact notification detail:', emailResult.errorMessage);
      }
    } catch (emailError) {
      console.error('Contact notification email failed:', emailError?.message || emailError);
      notificationReason = 'SMTP_SEND_FAILED';
    }

    res.status(201).json({
      message: 'Your message has been sent successfully!',
      contact: savedContact,
      notificationSent,
      notificationReason,
    });
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Contact service is temporarily unavailable. Database is not configured.',
      });
    }

    if (error?.message?.includes('querySrv EBADNAME') || error?.message?.includes('_mongodb._tcp')) {
      return res.status(503).json({
        message: 'Contact service is temporarily unavailable. Invalid MongoDB URI host in backend environment.',
      });
    }

    if (error?.name === 'MongooseServerSelectionError' || error?.name === 'MongoServerSelectionError') {
      return res.status(503).json({
        message: 'Contact service is temporarily unavailable. Cannot connect to database.',
      });
    }

    if (error?.message === 'CONTACT_SAVE_TIMEOUT') {
      return res.status(503).json({
        message: 'Contact service timed out while saving. Please try again in a moment.',
      });
    }

    res.status(500).json({
      message: 'Error sending message',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
};

// @desc    Mark a message as read
// @route   PATCH /api/contact/:id/read
// @access  Public (In production, only admin should access this)
exports.markAsRead = async (req, res) => {
  try {
    await connectDB();

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

// @desc    Mark a message as unread
// @route   PATCH /api/contact/:id/unread
// @access  Public (In production, only admin should access this)
exports.markAsUnread = async (req, res) => {
  try {
    await connectDB();

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: false },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as unread', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
};

// @desc    Mark all messages as read
// @route   PATCH /api/contact/read-all
// @access  Public (In production, only admin should access this)
exports.markAllAsRead = async (req, res) => {
  try {
    await connectDB();

    const result = await Contact.updateMany({ isRead: false }, { $set: { isRead: true } });

    res.status(200).json({
      message: 'All messages marked as read',
      modifiedCount: result.modifiedCount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating messages', error: error.message });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Public (In production, only admin should access this)
exports.deleteContactMessage = async (req, res) => {
  try {
    await connectDB();

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
