// Import the User model
const User = require('../models/User');
const connectDB = require('../config/database');

// Controller functions handle the business logic for user routes
const isDatabaseUnavailableError = (error) =>
  error?.name === 'MongooseServerSelectionError' ||
  error?.name === 'MongoServerSelectionError' ||
  error?.message?.toLowerCase?.().includes('could not connect to any servers');

// @desc    Get user profile
// @route   GET /api/user
// @access  Public
exports.getUser = async (req, res) => {
  try {
    await connectDB();

    // Find the first user (portfolio usually has one profile)
    const user = await User.findOne();

    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'User profile service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'User profile service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// @desc    Create or update user profile
// @route   POST /api/user
// @access  Public (In production, you should add authentication)
exports.createOrUpdateUser = async (req, res) => {
  try {
    await connectDB();

    // Destructure the data from the request body
    const { name, email, bio, profilePicture } = req.body;
    const normalizedName = String(name || '').trim();
    const normalizedEmail = String(email || '')
      .trim()
      .toLowerCase();
    const normalizedBio = bio == null ? '' : String(bio).trim();
    const normalizedProfilePicture = profilePicture == null ? '' : String(profilePicture).trim();

    // Validate required fields
    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Try to find and update an existing user, or create a new one
    // { upsert: true } means: update if exists, create if doesn't
    // { new: true } returns the updated document
    let user = await User.findOneAndUpdate(
      {}, // Empty object means search for any user (since portfolio has one)
      {
        name: normalizedName,
        email: normalizedEmail,
        bio: normalizedBio,
        profilePicture: normalizedProfilePicture,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json({ message: 'User profile saved successfully', user });
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'User profile service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'User profile service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error saving user', error: error.message });
  }
};
