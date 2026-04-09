// Import the Project model
const mongoose = require('mongoose');
const Project = require('../models/Project');
const connectDB = require('../config/database');

// Controller functions handle the business logic for project routes
const normalizeTechStack = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const isDatabaseUnavailableError = (error) =>
  error?.name === 'MongooseServerSelectionError' ||
  error?.name === 'MongoServerSelectionError' ||
  error?.message?.toLowerCase?.().includes('could not connect to any servers');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    await connectDB();

    // Find all projects and sort them by creation date (newest first)
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    await connectDB();

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (In production, you should add authentication)
exports.createProject = async (req, res) => {
  try {
    await connectDB();

    // Destructure the data from the request body
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;
    const normalizedTechStack = normalizeTechStack(techStack);

    // Validate required fields
    if (!title || !description || !githubLink || normalizedTechStack.length === 0) {
      return res.status(400).json({
        message: 'Title, description, techStack, and githubLink are required',
      });
    }

    // Create a new project
    const project = new Project({
      title,
      description,
      techStack: normalizedTechStack,
      githubLink,
      liveLink,
      imageUrl,
    });

    // Save the project to the database
    const savedProject = await project.save();

    res.status(201).json({ message: 'Project created successfully', project: savedProject });
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public (In production, you should add authentication)
exports.updateProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    await connectDB();

    const { id } = req.params;
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;
    const updatePayload = {};

    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (githubLink !== undefined) updatePayload.githubLink = githubLink;
    if (liveLink !== undefined) updatePayload.liveLink = liveLink;
    if (imageUrl !== undefined) updatePayload.imageUrl = imageUrl;
    if (techStack !== undefined) {
      const normalizedTechStack = normalizeTechStack(techStack);
      if (normalizedTechStack.length === 0) {
        return res.status(400).json({ message: 'techStack must contain at least one item' });
      }
      updatePayload.techStack = normalizedTechStack;
    }

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ message: 'No valid fields were provided for update' });
    }

    // Find the project and update it
    const project = await Project.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (In production, you should add authentication)
exports.deleteProject = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    await connectDB();

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    if (error?.message?.includes('MONGODB_URI is not configured')) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Database is not configured.',
      });
    }

    if (isDatabaseUnavailableError(error)) {
      return res.status(503).json({
        message: 'Projects service is unavailable. Cannot connect to database.',
      });
    }

    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
