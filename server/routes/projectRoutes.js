// Import express
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

// Routes for project endpoints
// GET /api/projects - Fetch all projects
router.get('/', getProjects);

// GET /api/projects/:id - Fetch a specific project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create a new project
router.post('/', createProject);

// PUT /api/projects/:id - Update a project
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', deleteProject);

module.exports = router;
