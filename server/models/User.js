// Import mongoose
const mongoose = require('mongoose');

// Define the User schema
// A schema is like a blueprint for a document in MongoDB
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends
    },
    // User's email address
    email: {
      type: String,
      required: true,
      unique: true, // Make sure each email is unique
      lowercase: true, // Convert to lowercase for consistency
      match: /.+\@.+\..+/, // Simple email validation
    },
    // User's bio/about section
    bio: {
      type: String,
      default: '', // Empty string if not provided
    },
    // User's profile picture URL
    profilePicture: {
      type: String,
      default: '', // Empty string if not provided
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the User model
// The model is used to interact with the 'users' collection in MongoDB
module.exports = mongoose.model('User', userSchema);
