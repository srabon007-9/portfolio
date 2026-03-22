// Import React and Router
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Main App component
function App() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to range -1 to 1
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

      document.documentElement.style.setProperty('--mx', normalizedX.toFixed(4));
      document.documentElement.style.setProperty('--my', normalizedY.toFixed(4));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.style.setProperty('--mx', '0');
      document.documentElement.style.setProperty('--my', '0');
    };
  }, []);

  return (
    <Router>
      {/* Navbar appears on every page */}
      <Navbar />

      {/* Main content area - Routes define which page to show */}
      <main className="parallax-scene bg-grid relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="orb orb-cyan" />
          <div className="orb orb-purple" />
        </div>
        <div className="parallax-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      {/* Footer appears on every page */}
      <Footer />
    </Router>
  );
}

export default App;
