// Import mongoose
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema(
  {
    // Project title
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // Project description
    description: {
      type: String,
      required: true,
    },
    // Array of technologies used in the project
    techStack: {
      type: [String], // Array of strings
      required: true,
    },
    // URL to the GitHub repository
    githubLink: {
      type: String,
      required: true,
    },
    // URL to the live deployed project
    liveLink: {
      type: String,
      default: '', // Optional field
    },
    // Project image/thumbnail URL
    imageUrl: {
      type: String,
      default: '', // Optional field
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Project model
module.exports = mongoose.model('Project', projectSchema);
