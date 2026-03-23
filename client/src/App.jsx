// Import React and Router
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = 'https://www.srabon.me';
    const path = location.pathname;

    const seoByPath = {
      '/': {
        title: 'Srabon | MERN Stack Developer',
        description:
          'Srabon Ahmed is a MERN Stack Developer and Computer Science student building modern, fast, and user-focused web applications.',
      },
      '/about': {
        title: 'About Srabon | MERN Developer',
        description:
          'Learn about Srabon Ahmed, Computer Science student at Brac University, focused on MERN stack and Data Structures & Algorithms.',
      },
      '/skills': {
        title: 'Skills | Srabon Ahmed',
        description:
          'Explore Srabon Ahmed\'s technical skills in React, Node.js, Express, MongoDB, JavaScript, and backend development.',
      },
      '/projects': {
        title: 'Projects | Srabon Ahmed Portfolio',
        description:
          'Featured full-stack projects by Srabon Ahmed showcasing MERN stack development, UI/UX quality, and practical problem solving.',
      },
      '/contact': {
        title: 'Contact | Srabon Ahmed',
        description:
          'Get in touch with Srabon Ahmed for internships, collaborations, and developer opportunities.',
      },
    };

    const isAdminRoute = path.startsWith('/admin');
    const fallback = {
      title: 'Srabon | MERN Stack Developer',
      description:
        'Portfolio of Srabon Ahmed — MERN Stack Developer and Computer Science student.',
    };
    const selected = seoByPath[path] || fallback;

    const pageTitle = isAdminRoute ? 'Admin Panel | Srabon Portfolio' : selected.title;
    const pageDescription = isAdminRoute
      ? 'Private admin panel for portfolio inbox management.'
      : selected.description;
    const canonical = `${siteUrl}${path}`;

    document.title = pageTitle;

    const setMeta = (selector, content) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', pageDescription);
    setMeta('#og-title', pageTitle);
    setMeta('#og-description', pageDescription);
    setMeta('#og-url', canonical);
    setMeta('meta[name="twitter:title"]', pageTitle);
    setMeta('meta[name="twitter:description"]', pageDescription);

    const canonicalEl = document.getElementById('canonical-link');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonical);
    }

    const robotsEl = document.querySelector('meta[name="robots"]');
    if (robotsEl) {
      robotsEl.setAttribute(
        'content',
        isAdminRoute ? 'noindex,nofollow,noarchive' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      );
    }
  }, [location.pathname]);

  return null;
}

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
      <SeoManager />
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
