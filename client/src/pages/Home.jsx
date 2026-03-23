// Import React hooks
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TechOrbit from '../components/TechOrbit';
import LiveCodePreview from '../components/LiveCodePreview';
import SectionReveal from '../components/SectionReveal';
import TerminalSection from '../components/TerminalSection';

// Home page - Landing page of the portfolio
function Home() {
  // State to store user data
  const [user, setUser] = useState({
    name: 'Srabon Ahmed',
    email: 'srabonahmed2002@gmail.com',
    bio: 'Full-stack developer passionate about building amazing web applications.',
  });
  // State to track errors
  const [error, setError] = useState(null);

  const displayName = user?.name?.trim() || 'Srabon Ahmed';
  const isProduction = process.env.NODE_ENV === 'production';
  const cvUrl = process.env.REACT_APP_CV_URL;
  const typedLines = useMemo(
    () => [
      'I build modern web experiences.',
      'I focus on clean UI and performance.',
      'I ship responsive products with MERN.',
    ],
    []
  );
  const [typingText, setTypingText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // useEffect runs when component mounts
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentLine = typedLines[lineIndex];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentLine.slice(0, charIndex + 1);
          setTypingText(nextText);
          setCharIndex((prev) => prev + 1);

          if (nextText === currentLine) {
            setIsDeleting(true);
          }
        } else {
          const nextText = currentLine.slice(0, Math.max(charIndex - 1, 0));
          setTypingText(nextText);
          setCharIndex((prev) => Math.max(prev - 1, 0));

          if (nextText.length === 0) {
            setIsDeleting(false);
            setLineIndex((prev) => (prev + 1) % typedLines.length);
          }
        }
      },
      isDeleting ? 45 : 75
    );

    return () => window.clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex, typedLines]);

  // Function to fetch user data from the backend API
  const fetchUserData = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;

      if (!apiBaseUrl) {
        throw new Error('REACT_APP_API_URL is not configured');
      }

      const response = await axios.get(`${apiBaseUrl}/api/user`, {
        timeout: 2500,
      });
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
        email: 'srabonahmed2002@gmail.com',
        bio: 'Full-stack developer passionate about building amazing web applications.',
      });
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="hero-animated-glow absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="hero-animated-glow delay-700 absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
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

          <div className="mx-auto mb-8 inline-flex min-h-8 items-center rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-2 font-mono text-sm text-cyan-200">
            <span>{typingText}</span>
            <span className="typing-caret ml-1" aria-hidden="true" />
          </div>

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
            <Link
              to="/projects"
              data-cursor="hover"
              className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
            >
              View My Work
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/contact"
              data-cursor="hover"
              className="rounded-lg border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800/50"
            >
              Contact Me
            </Link>
            {cvUrl ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="rounded-lg border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800/50"
              >
                Download CV
              </a>
            ) : (
              <Link
                to="/contact"
                data-cursor="hover"
                className="rounded-lg border border-slate-600 bg-slate-900/50 px-8 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-slate-400 hover:bg-slate-800/50"
              >
                Request CV
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <SectionReveal className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              { label: 'Location', value: 'Bangladesh' },
              { label: 'Education', value: 'CS Student' },
              { label: 'Status', value: 'Available Now' },
              { label: 'Focus', value: 'Frontend Dev' },
            ].map((fact, index) => (
              <div
                key={index}
                data-cursor="hover"
                className="glass-card rounded-lg border border-slate-800 p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">{fact.label}</div>
                <div className="text-lg font-semibold text-slate-100">{fact.value}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="glass-card rounded-2xl border border-slate-700/70 p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Interactive Stack</p>
            <h3 className="mb-4 text-2xl font-bold text-slate-100">Tech stack orbit</h3>
            <p className="mb-8 text-slate-400">
              My core technologies rotate around a product-first mindset. Hover each icon to see the skill.
            </p>
            <TechOrbit />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Live Code Preview</p>
            <h3 className="mb-4 text-2xl font-bold text-slate-100">A quick look at my dev profile</h3>
            <p className="mb-6 text-slate-400">A lightweight, editor-style snippet with animated typing and subtle syntax colors.</p>
            <LiveCodePreview />
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">What I Am Learning</p>
          <h3 className="mb-8 text-2xl font-bold text-slate-100">Sharpening fundamentals and scaling skills</h3>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Data Structures & Algorithms', progress: 72, tone: 'from-violet-500/20 to-cyan-500/10' },
              { title: 'MERN Stack Development', progress: 86, tone: 'from-cyan-500/20 to-blue-500/10' },
              { title: 'Backend Systems', progress: 68, tone: 'from-emerald-500/20 to-cyan-500/10' },
            ].map((item) => (
              <div
                key={item.title}
                data-cursor="hover"
                className={`glass-card rounded-xl border border-slate-700/70 bg-gradient-to-br ${item.tone} p-6`}
              >
                <h4 className="mb-4 text-base font-semibold text-slate-100">{item.title}</h4>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                    style={{ width: `${item.progress}%` }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-400">Progress: {item.progress}%</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="px-4 py-16">
        <div className="mx-auto mb-8 max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Interactive Terminal</p>
          <h3 className="mb-3 text-2xl font-bold text-slate-100">Explore my profile through commands</h3>
          <p className="max-w-3xl text-slate-400">
            Try commands like <span className="font-mono text-cyan-300">help</span>, <span className="font-mono text-cyan-300">about</span>, <span className="font-mono text-cyan-300">skills</span>, and <span className="font-mono text-cyan-300">hack</span>.
          </p>
        </div>
        <TerminalSection />
      </SectionReveal>

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
