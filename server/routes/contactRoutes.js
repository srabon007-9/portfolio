// Import express
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getContactMessages,
  createContactMessage,
  markAsRead,
  deleteContactMessage,
} = require('../controllers/contactController');

// Routes for contact endpoints
// GET /api/contact - Fetch all contact messages (admin view)
router.get('/', getContactMessages);

// POST /api/contact - Create a new contact message
router.post('/', createContactMessage);

// PATCH /api/contact/:id/read - Mark a message as read
router.patch('/:id/read', markAsRead);

// DELETE /api/contact/:id - Delete a contact message
router.delete('/:id', deleteContactMessage);

module.exports = router;
