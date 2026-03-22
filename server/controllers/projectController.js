// Import the Project model
const Project = require('../models/Project');

// Controller functions handle the business logic for project routes

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    // Find all projects and sort them by creation date (newest first)
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Public (In production, you should add authentication)
exports.createProject = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !techStack || !githubLink) {
      return res.status(400).json({
        message: 'Title, description, techStack, and githubLink are required',
      });
    }

    // Create a new project
    const project = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      imageUrl,
    });

    // Save the project to the database
    const savedProject = await project.save();

    res.status(201).json({ message: 'Project created successfully', project: savedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public (In production, you should add authentication)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, githubLink, liveLink, imageUrl } = req.body;

    // Find the project and update it
    const project = await Project.findByIdAndUpdate(
      id,
      { title, description, techStack, githubLink, liveLink, imageUrl },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public (In production, you should add authentication)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
