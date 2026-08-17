import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import useIsMobile from '../../hooks/useIsMobile';
import { NAV_LINKS } from '../../constants';
import { DURATION, EASE } from '../../lib/motion';

const Navbar = () => {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    const lowMemory = typeof memory === 'number' && memory <= 4;
    const lowCores = typeof cores === 'number' && cores <= 4;
    setIsLowPowerDevice(Boolean(saveData || lowMemory || lowCores));
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  const lowPerfMode = prefersReducedMotion || isMobile || isLowPowerDevice;

  const linkBase: React.CSSProperties = {
    position: 'relative',
    padding: '10px 16px',
    minWidth: '104px',
    textAlign: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-xs)',
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'color var(--duration-tap) var(--ease-signal)',
    overflow: 'hidden',
  };

  return (
    <motion.header
      // The bar is above the fold on every route, so it prerenders at its
      // final position rather than sliding in after hydration.
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DURATION.enter, ease: EASE }}
      style={{
        position: 'fixed',
        top: 'calc(12px + env(safe-area-inset-top))',
        left: '50%',
        x: '-50%',
        width: 'min(1040px, calc(100% - 20px))',
        zIndex: 50,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        // The bar separates from the page by surface and hairline only. It
        // used to lift itself with a stack of blue glows, which section 1 rules
        // out; scrolled state now reads as a solid panel instead of a brighter
        // bloom.
        border: '1px solid var(--color-rule)',
        background: scrolled ? 'var(--color-panel)' : 'color-mix(in oklab, var(--color-panel) 82%, transparent)',
        backdropFilter: lowPerfMode ? 'none' : 'blur(20px)',
        transition: 'background var(--duration-move) var(--ease-signal)',
      }}
    >
      <div className="px-3 md:px-4 lg:px-6 h-16.5 md:h-18 flex items-center justify-between gap-3 md:gap-4 relative">
        {/* color: inherit so the unclassed-anchor amber rule does not reach the
            brand mark. */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-chalk)',
            }}
          >
            Arman
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 p-1"
          style={{
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-panel-2)',
            border: '1px solid var(--color-rule)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => setHoveredPath(link.path)}
              onMouseLeave={() => setHoveredPath(null)}
              aria-current={isActive(link.path) ? 'page' : undefined}
              className="nav-link"
              style={{
                ...linkBase,
                color: isActive(link.path) ? 'var(--color-chalk)' : 'var(--color-chalk-2)',
              }}
            >
              {(isActive(link.path) || hoveredPath === link.path) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0"
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-panel)',
                    border: '1px solid var(--color-rule)',
                  }}
                  transition={{ duration: DURATION.move, ease: EASE }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Not the primary CTA of any screen -- the page's own CTA is. It
              stays a quiet panel button and only picks up amber on hover and
              focus. */}
          <Link to="/contact" className="nav-cta">
            <span className="status-dot" />
            Hire Me
          </Link>
        </div>

        {/* Display lives in the stylesheet, not inline. An inline
            `display: grid` outranks Tailwind's `md:hidden`, which is why the
            hamburger was still showing on desktop. */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={lowPerfMode ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.move, ease: EASE }}
            style={{
              overflow: 'hidden',
              background: 'var(--color-panel)',
              borderTop: '1px solid var(--color-rule)',
            }}
            className="md:hidden"
          >
            <nav style={{ padding: '10px 12px calc(14px + env(safe-area-inset-bottom))' }}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    minHeight: '44px',
                    padding: '13px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-sm)',
                    
                    background: 'var(--color-panel-2)',
                    marginBottom: '8px',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ borderTop: '1px solid var(--color-rule)', marginTop: '4px', paddingTop: '12px' }}>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-cta"
                  style={{ justifyContent: 'center', minHeight: '44px', padding: '13px 16px' }}
                >
                  Hire Me
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
