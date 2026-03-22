// Import the User model
const User = require('../models/User');

// Controller functions handle the business logic for user routes

// @desc    Get user profile
// @route   GET /api/user
// @access  Public
exports.getUser = async (req, res) => {
  try {
    // Find the first user (portfolio usually has one profile)
    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// @desc    Create or update user profile
// @route   POST /api/user
// @access  Public (In production, you should add authentication)
exports.createOrUpdateUser = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { name, email, bio, profilePicture } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Try to find and update an existing user, or create a new one
    // { upsert: true } means: update if exists, create if doesn't
    // { new: true } returns the updated document
    let user = await User.findOneAndUpdate(
      {}, // Empty object means search for any user (since portfolio has one)
      { name, email, bio, profilePicture },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'User profile saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
};
