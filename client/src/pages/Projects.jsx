// Import React hooks and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

// Projects page - Display all projects
function Projects() {
  // State to store projects
  const [projects, setProjects] = useState([]);
  // State to track loading
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  // useEffect runs when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects from the backend API
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects`);
      const projectList = Array.isArray(response.data) ? response.data : [];
      setProjects(projectList);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
      // Set dummy data if API fails (for demo purposes)
      setProjects([
        {
          _id: '1',
          title: 'E-Commerce Platform',
          description: 'A full-stack e-commerce platform with payment integration',
          techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          githubLink: 'https://github.com',
          liveLink: 'https://example.com',
        },
        {
          _id: '2',
          title: 'Task Management App',
          description: 'A beautiful task manager with real-time updates',
          techStack: ['React', 'Firebase', 'Tailwind CSS'],
          githubLink: 'https://github.com',
          liveLink: 'https://example.com',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-100">
            Featured Projects
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A selection of projects that demonstrate my skills in building modern, responsive web applications. Each project showcases different aspects of full-stack development and problem-solving.
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mb-6 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error} (Showing sample data)
          </div>
        )}

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project?._id || `${project?.title || 'project'}-${index}`} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-lg text-slate-300">No projects added yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              Add your first project using POST /api/projects and it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
