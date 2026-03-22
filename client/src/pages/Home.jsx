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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          {/* Tech Badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {['React', 'JavaScript', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="rounded-full border border-cyan-300/30 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 text-5xl md:text-7xl font-bold tracking-tight text-slate-100">
            {displayName}
          </h1>

          {/* Role */}
          <h2 className="mb-6 text-xl md:text-2xl font-semibold text-cyan-300">
            Frontend Developer & Computer Science Student
          </h2>

          {/* Value Statement */}
          <p className="mx-auto mb-4 max-w-2xl text-base md:text-lg leading-relaxed text-slate-400">
            I build fast, accessible, and user-friendly web applications using modern technologies like React and Tailwind.
          </p>
          
          <p className="mx-auto mb-8 max-w-2xl text-base text-slate-500">
            Focused on writing clean code, performance, and real-world problem solving.
          </p>

          {/* Availability Badge */}
          <div className="mb-8 inline-block rounded-full border border-green-300/30 bg-green-400/5 px-4 py-2">
            <span className="flex items-center gap-2 text-sm font-medium text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to internships & opportunities
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects"
              className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
            >
              View My Work
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800/50"
            >
              Contact Me
            </a>
            <a
              href="/"
              onClick={(e) => e.preventDefault()}
              className="rounded-lg border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800/50 cursor-pointer"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { label: 'Location', value: 'Bangladesh' },
              { label: 'Education', value: 'CS Student' },
              { label: 'Status', value: 'Available Now' },
              { label: 'Focus', value: 'Frontend Dev' },
            ].map((fact, index) => (
              <div key={index} className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">{fact.label}</div>
                <div className="text-lg font-semibold text-slate-100">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Error message if any */}
      {error && (
        <div className="mx-auto max-w-4xl px-4 mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}

export default Home;
