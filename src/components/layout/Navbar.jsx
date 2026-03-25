import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/80 backdrop-blur-2xl border-b border-[var(--border)] shadow-[0_10px_40px_rgba(2,6,23,0.45)]'
          : 'bg-bg-primary/55 backdrop-blur-xl border-b border-transparent'
      }`}
      style={{ height: '64px' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-[0.08em] uppercase hover:opacity-80 transition-opacity"
        >
          <span className="text-text-primary">Arman</span>
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-200 rounded-lg ${
                isActive(link.path)
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.02]'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-accent to-accent2 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-medium tracking-[0.08em] uppercase border border-[var(--border-hover)] text-text-primary rounded-lg bg-white/[0.02] hover:border-accent hover:text-accent transition-all duration-200"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full max-w-sm bg-bg-primary/95 backdrop-blur-xl border-l border-b border-[var(--border)] shadow-xl animate-[slideInRight_220ms_ease-out]">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium tracking-[0.08em] uppercase rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-accent bg-[var(--accent-glow)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-[var(--border)] mt-2 pt-2">
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium tracking-[0.08em] uppercase text-center bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Hire Me
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
