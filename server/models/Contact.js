// Import mongoose
const mongoose = require('mongoose');

// Define the Contact schema
// This stores messages from people who contact via the portfolio
const contactSchema = new mongoose.Schema(
  {
    // Sender's name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Sender's email
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/, // Simple email validation
    },
    // Contact message subject (optional)
    subject: {
      type: String,
      default: '', // Optional field
    },
    // The actual message content
    message: {
      type: String,
      required: true,
    },
    // Whether the admin has read this message
    isRead: {
      type: Boolean,
      default: false, // New messages are unread by default
    },
  },
  {
    timestamps: true, // createdAt and updatedAt are automatically added
  }
);

// Create and export the Contact model
module.exports = mongoose.model('Contact', contactSchema);
