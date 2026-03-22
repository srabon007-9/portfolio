// Import React hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

// Home page - Landing page of the portfolio
function Home() {
  // State to store user data
  const [user, setUser] = useState(null);
  // State to track loading
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  // useEffect runs when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data from the backend API
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`);
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to load user data');
      // Set dummy data if API fails (for demo purposes)
      setUser({
        name: 'Your Name',
        email: 'your.email@example.com',
        bio: 'Full-stack developer passionate about building amazing web applications.',
      });
    } finally {
      // Stop loading regardless of success or failure
      setLoading(false);
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto w-full max-w-4xl">
        {/* Hero Section */}
        <div className="neo-card animate-slide-up rounded-2xl p-8 text-center md:p-12">
          {/* Greeting */}
          <h1 className="mb-3 text-4xl font-semibold text-slate-100 md:text-5xl">
            Welcome to my world
          </h1>

          {/* Name */}
          {user && (
            <h2 className="text-gradient mb-4 text-2xl font-semibold md:text-3xl">
              I'm {user.name}
            </h2>
          )}

          {/* Bio */}
          {user && user.bio && (
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
              {user.bio}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="btn-future rounded-md px-6 py-3 text-sm font-medium text-slate-100"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="rounded-md border border-purple-300/50 bg-purple-400/10 px-6 py-3 text-sm font-medium text-purple-200 transition-all hover:shadow-[0_0_28px_rgba(168,85,247,0.3)]"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="neo-card mt-8 animate-fade-in rounded-2xl p-8">
          <h2 className="mb-6 text-xl font-semibold text-slate-100">Skills</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML/CSS'].map((skill, index) => (
              <div
                key={index}
                className="rounded-md border border-slate-700 bg-slate-950/80 p-3 text-center text-sm text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
