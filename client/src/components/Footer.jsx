import { Link } from 'react-router-dom';

// Footer component - Appears at the bottom of every page
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-cyan-300/20 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-100">About</h3>
            <p className="text-sm text-slate-400">
              Clean portfolio website built with the MERN stack.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-100">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 transition-colors hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-slate-100">Follow</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                className="text-slate-400 transition-all hover:text-cyan-200 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yourusername"
                className="text-slate-400 transition-all hover:text-cyan-200 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/yourusername"
                className="text-slate-400 transition-all hover:text-cyan-200 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} My Portfolio. All rights reserved.</p>
          <p className="mt-2 text-xs">Built with React, Node.js, MongoDB, and Express</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
