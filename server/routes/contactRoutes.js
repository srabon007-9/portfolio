// Import express
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getContactMessages,
  createContactMessage,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  deleteContactMessage,
} = require('../controllers/contactController');
const { requireAdminKey } = require('../middleware/adminAuth');

// Routes for contact endpoints
// GET /api/contact - Fetch all contact messages (admin view)
router.get('/', requireAdminKey, getContactMessages);

// POST /api/contact - Create a new contact message
router.post('/', createContactMessage);

// PATCH /api/contact/:id/read - Mark a message as read
router.patch('/:id/read', requireAdminKey, markAsRead);

// PATCH /api/contact/:id/unread - Mark a message as unread
router.patch('/:id/unread', requireAdminKey, markAsUnread);

// PATCH /api/contact/read-all - Mark all messages as read
router.patch('/read-all', requireAdminKey, markAllAsRead);

// DELETE /api/contact/:id - Delete a contact message
router.delete('/:id', requireAdminKey, deleteContactMessage);

module.exports = router;
