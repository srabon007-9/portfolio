import { Link } from 'react-router-dom';

// Footer component - Appears at the bottom of every page
function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-100">Srabon Ahmed</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Building modern web experiences with clean code and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 transition-colors hover:text-cyan-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 transition-colors hover:text-cyan-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 transition-colors hover:text-cyan-400">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 transition-colors hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Connect</h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <span>→</span> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sheikh-srabon-ahmed/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <span>→</span> LinkedIn
              </a>
              <a
                href="https://www.facebook.com/Srabon.Ahmed22/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-cyan-400"
              >
                <span>→</span> Facebook
              </a>
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-100">Status</h4>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-slate-400">Available for work</span>
            </div>
            <Link
              to="/contact"
              className="inline-block rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-400/20"
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-sm text-slate-500">
            <p>&copy; {currentYear} Srabon Ahmed. All rights reserved.</p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400 flex items-center gap-2"
            aria-label="Back to top"
          >
            Back to top
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
