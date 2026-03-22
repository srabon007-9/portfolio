// Import React and Link from React Router
import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

// Navbar component - Navigation bar that appears on every page
function Navbar() {
  // State to track if mobile menu is open
  const [isOpen, setIsOpen] = useState(false);
  // State to track scroll position
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-slate-800/50 bg-slate-950/95 backdrop-blur-md shadow-lg'
          : 'bg-slate-950/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Title */}
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-slate-100 hover:text-cyan-300 transition-colors"
          >
            SA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            <DesktopNavLink to="/" label="Home" />
            <DesktopNavLink to="/about" label="About" />
            <DesktopNavLink to="/projects" label="Projects" />
            <DesktopNavLink to="/contact" label="Contact" />
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/contact"
              className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/20"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            <MobileNavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/about" label="About" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/projects" label="Projects" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable desktop nav link component
function DesktopNavLink({ to, label }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          isActive
            ? 'text-cyan-300 border-b-2 border-cyan-300'
            : 'text-slate-400 hover:text-slate-200'
        }`
      }
    >
      {label}
    </RouterNavLink>
  );
}

// Reusable mobile nav link component
function MobileNavLink({ to, label, onClick }) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block rounded-lg px-4 py-2 text-sm font-medium transition-all ${
          isActive
            ? 'bg-cyan-400/10 text-cyan-300'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
        }`
      }
    >
      {label}
    </RouterNavLink>
  );
}

export default Navbar;
