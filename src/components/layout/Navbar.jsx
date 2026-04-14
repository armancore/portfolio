import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        background: scrolled ? 'rgba(6,9,18,0.88)' : 'rgba(6,9,18,0.55)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(148,163,184,0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px rgba(2,6,23,0.4)' : 'none',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#E8E8F2',
              }}
            >
              Arman
            </span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px',
                fontWeight: 800,
                color: '#4F8EF7',
              }}
            >
              .
            </motion.span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                position: 'relative',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '8px',
                color: isActive(link.path) ? '#E8E8F2' : '#8B8BAE',
                transition: 'color 0.2s, background 0.2s',
                background: isActive(link.path) ? 'rgba(79,142,247,0.08)' : 'transparent',
              }}
              className="hover:text-[#E8E8F2] hover:bg-white/[0.03]"
            >
              {link.label}
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    left: '16px',
                    right: '16px',
                    height: '1.5px',
                    background: 'linear-gradient(90deg, #4F8EF7, #7C5CFC)',
                    borderRadius: '999px',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, rgba(79,142,247,0.18), rgba(124,92,252,0.12))',
                border: '1px solid rgba(79,142,247,0.3)',
                color: '#E8E8F2',
              }}
            >
              Hire Me
            </Link>
          </motion.div>
        </div>

        <motion.button
          onClick={() => setIsMenuOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          style={{
            padding: '8px',
            color: '#8B8BAE',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden', background: 'rgba(6,9,18,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(148,163,184,0.1)' }}
            className="md:hidden"
          >
            <motion.nav
              style={{ padding: '12px 24px 16px' }}
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.path}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 500,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: '10px',
                      color: isActive(link.path) ? '#4F8EF7' : '#8B8BAE',
                      background: isActive(link.path) ? 'rgba(79,142,247,0.08)' : 'transparent',
                      marginBottom: '4px',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '8px', paddingTop: '12px' }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4F8EF7, #7C5CFC)',
                    color: 'white',
                  }}
                >
                  Hire Me
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
