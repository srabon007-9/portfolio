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

  const displayName = user?.name?.trim() || 'Srabon Ahmed';
  const isProduction = process.env.NODE_ENV === 'production';

  // useEffect runs when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data from the backend API
  const fetchUserData = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;

      if (!apiBaseUrl) {
        throw new Error('REACT_APP_API_URL is not configured');
      }

      const response = await axios.get(`${apiBaseUrl}/api/user`);
      const userData = response.data;

      // Validate expected response shape
      if (!userData || typeof userData !== 'object' || Array.isArray(userData) || !userData.name) {
        throw new Error('Invalid user response from API');
      }

      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(
        isProduction
          ? null
          : 'Failed to load user data. Check backend URL and Vercel environment variables.'
      );
      // Set dummy data if API fails (for demo purposes)
      setUser({
        name: 'Srabon Ahmed',
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
          <h2 className="text-gradient mb-4 text-2xl font-semibold md:text-3xl">
            I am {displayName}
          </h2>

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

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { number: '5+', label: 'Projects Built', icon: '📁' },
            { number: '100%', label: 'Dedicated', icon: '⚡' },
            { number: '∞', label: 'Passionate', icon: '🚀' },
          ].map((stat, index) => (
            <div
              key={index}
              className="neo-card rounded-xl p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.number}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What I Do Section */}
        <div className="neo-card mt-12 animate-fade-in rounded-2xl p-8">
          <h2 className="mb-6 text-2xl font-semibold text-slate-100">What I Do</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                title: 'Frontend Development',
                description: 'Build modern, responsive web applications with React and Tailwind CSS. Focus on user experience and smooth interactions.',
                icon: '🎨',
              },
              {
                title: 'Backend Development',
                description: 'Create robust APIs and server logic with Node.js and Express. Ensure scalability and optimal performance.',
                icon: '⚙️',
              },
              {
                title: 'Database Design',
                description: 'Design and manage MongoDB databases. Implement efficient data models and queries for your applications.',
                icon: '💾',
              },
              {
                title: 'Full-Stack Solutions',
                description: 'Develop complete web applications from concept to deployment. End-to-end solutions using MERN stack.',
                icon: '🌐',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-700 bg-slate-950/50 p-6 transition-all hover:border-purple-400/50 hover:bg-slate-950/80"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-semibold text-slate-100 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="neo-card mt-12 animate-fade-in rounded-2xl p-8">
          <h2 className="mb-6 text-xl font-semibold text-slate-100">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML/CSS', 'Tailwind CSS', 'Git', 'REST APIs'].map((skill, index) => (
              <div
                key={index}
                className="rounded-md border border-slate-700 bg-slate-950/80 p-3 text-center text-sm text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="neo-card mt-12 animate-fade-in rounded-2xl p-8 md:p-12 text-center bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
          <h2 className="mb-4 text-2xl font-semibold text-slate-100">Ready to Collaborate?</h2>
          <p className="mb-6 text-slate-400 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or want to work together, feel free to reach out!
          </p>
          <a
            href="/contact"
            className="inline-block btn-future rounded-md px-8 py-3 text-base font-medium text-slate-100 transition-all hover:scale-105"
          >
            Start a Conversation
          </a>
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
