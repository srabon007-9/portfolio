// Import React and Router
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseGlow from './components/MouseGlow';
import CustomCursor from './components/CustomCursor';

// Import pages (lazy loaded for faster initial render)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminInbox = lazy(() => import('./pages/AdminInbox'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Main App component
function App() {
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isCoarsePointer) {
      document.documentElement.style.setProperty('--mx', '0');
      document.documentElement.style.setProperty('--my', '0');
      return undefined;
    }

    let rafId = null;
    let latestX = 0;
    let latestY = 0;

    const flush = () => {
      document.documentElement.style.setProperty('--mx', latestX.toFixed(4));
      document.documentElement.style.setProperty('--my', latestY.toFixed(4));
      rafId = null;
    };

    const handleMouseMove = (event) => {
      // Normalize mouse position to range -1 to 1
      latestX = (event.clientX / window.innerWidth - 0.5) * 2;
      latestY = (event.clientY / window.innerHeight - 0.5) * 2;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(flush);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      document.documentElement.style.setProperty('--mx', '0');
      document.documentElement.style.setProperty('--my', '0');
    };
  }, []);

  return (
    <Router>
      <MouseGlow />
      <CustomCursor />

      {/* Navbar appears on every page */}
      <Navbar />

      {/* Main content area - Routes define which page to show */}
      <main className="parallax-scene bg-grid relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animated-grid-overlay" />
          <div className="floating-particles" />
          <div className="orb orb-cyan" />
          <div className="orb orb-purple" />
        </div>
        <div className="parallax-content">
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center text-slate-400">Loading...</div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/inbox" element={<AdminInbox />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      {/* Footer appears on every page */}
      <Footer />
    </Router>
  );
}

export default App;
