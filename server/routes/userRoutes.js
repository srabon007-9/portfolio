// Import express
const express = require('express');
const router = express.Router();

// Import controller functions
const { getUser, createOrUpdateUser } = require('../controllers/userController');

// Routes for user endpoints
// GET /api/user - Fetch user profile
router.get('/', getUser);

// POST /api/user - Create or update user profile
router.post('/', createOrUpdateUser);

module.exports = router;
