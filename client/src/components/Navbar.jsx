// Import React and Link from React Router
import React, { useState } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';

// Navbar component - Navigation bar that appears on every page
function Navbar() {
  // State to track if mobile menu is open
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-300/20 bg-slate-950/85 text-slate-100 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Title */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-gradient"
          >
            Srabon Ahmed
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <DesktopNavLink to="/" label="Home" />
            <DesktopNavLink to="/about" label="About" />
            <DesktopNavLink to="/projects" label="Projects" />
            <DesktopNavLink to="/contact" label="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl text-slate-300"
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
function NavLink({ to, label }) {
  return (
    <RouterNavLink to={to} className={({ isActive }) => `rounded-md px-3 py-1.5 text-sm transition-all ${isActive ? 'border border-cyan-300/50 bg-cyan-400/10 text-cyan-200' : 'text-slate-300 hover:border hover:border-cyan-300/30 hover:bg-cyan-400/5 hover:text-white'}`}>
      {label}
    </RouterNavLink>
  );
}

function DesktopNavLink({ to, label }) {
  return <NavLink to={to} label={label} />;
}

// Reusable mobile nav link component
function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block rounded px-4 py-2 text-slate-300 transition-colors hover:bg-slate-900 hover:text-white"
    >
      {label}
    </Link>
  );
}

export default Navbar;
