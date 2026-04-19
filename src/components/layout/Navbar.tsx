import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import { NAV_LINKS } from '../../constants';

const Navbar = () => {
  const scrolled = useScrolled(20);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
  const lowPerfMode = prefersReducedMotion || isMobile;
  const ultraMobileMode = isMobile && (prefersReducedMotion || isLowPowerDevice);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={ultraMobileMode ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={
        ultraMobileMode
          ? { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
      }
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        x: '-50%',
        width: 'min(1040px, calc(100% - 20px))',
        zIndex: 50,
        borderRadius: '22px',
        overflow: 'hidden',
        border: scrolled ? '1px solid rgba(148,163,184,0.25)' : '1px solid rgba(148,163,184,0.14)',
        background: scrolled
          ? 'linear-gradient(140deg, rgba(6,9,18,0.95), rgba(8,14,25,0.9) 42%, rgba(11,18,32,0.95))'
          : 'linear-gradient(140deg, rgba(6,9,18,0.8), rgba(8,14,25,0.75) 42%, rgba(11,18,32,0.84))',
        backdropFilter: lowPerfMode ? 'none' : 'blur(20px)',
        boxShadow: scrolled
          ? lowPerfMode
            ? '0 12px 24px rgba(2,6,23,0.42), 0 0 18px rgba(79,142,247,0.18), 0 0 0 1px rgba(79,142,247,0.12) inset'
            : '0 30px 80px rgba(2,6,23,0.55), 0 0 0 1px rgba(79,142,247,0.16) inset'
          : lowPerfMode
            ? '0 10px 20px rgba(2,6,23,0.34), 0 0 14px rgba(79,142,247,0.15), 0 0 0 1px rgba(79,142,247,0.08) inset'
            : '0 22px 60px rgba(2,6,23,0.45), 0 0 0 1px rgba(79,142,247,0.1) inset',
        transition: ultraMobileMode ? 'none' : 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
      }}
    >
      {!lowPerfMode && (
        <motion.div
          className="navbar-scanline"
          aria-hidden
          animate={{ x: ['-120%', '120%'], opacity: [0, 0.45, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.9 }}
        />
      )}
      {lowPerfMode && <div className="navbar-mobile-aura" aria-hidden />}

      <motion.div
        className="px-3 md:px-4 lg:px-6 h-[66px] md:h-[72px] flex items-center justify-between gap-3 md:gap-4 relative"
        initial={false}
        animate={ultraMobileMode ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={ultraMobileMode ? { duration: 0.18, ease: 'easeOut' } : { duration: 0.2 }}
      >
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={ultraMobileMode ? { scale: 0.98 } : { scale: 0.97 }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              className="navbar-brand-glyph"
              animate={lowPerfMode ? undefined : { rotate: [0, 180, 360] }}
              transition={lowPerfMode ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '19px',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#E8E8F2',
              }}
            >
              Arman
            </span>
          </motion.div>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))',
            border: '1px solid rgba(148,163,184,0.14)',
            boxShadow: '0 12px 28px rgba(2,6,23,0.24)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => setHoveredPath(link.path)}
              onMouseLeave={() => setHoveredPath(null)}
              style={{
                position: 'relative',
                padding: '10px 16px',
                minWidth: '104px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '12px',
                color: isActive(link.path) ? '#E8E8F2' : '#9AA8C7',
                transition: 'color 0.22s',
                overflow: 'hidden',
              }}
            >
              {(isActive(link.path) || hoveredPath === link.path) && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0"
                  style={{
                    borderRadius: '12px',
                    border: `1px solid ${isActive(link.path) ? 'rgba(124,92,252,0.55)' : 'rgba(79,142,247,0.34)'}`,
                    background: isActive(link.path)
                      ? 'linear-gradient(120deg, rgba(79,142,247,0.24), rgba(124,92,252,0.2))'
                      : 'linear-gradient(120deg, rgba(79,142,247,0.11), rgba(34,211,238,0.08))',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.5 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 2 }}>{link.label}</span>
              {isActive(link.path) && (
                <motion.span
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '3px',
                    left: '24px',
                    right: '24px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #22D3EE, #4F8EF7 45%, #7C5CFC)',
                    borderRadius: '999px',
                    zIndex: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '12px',
                background: 'linear-gradient(130deg, rgba(79,142,247,0.24), rgba(34,211,238,0.22), rgba(124,92,252,0.23))',
                border: '1px solid rgba(79,142,247,0.42)',
                color: '#E8E8F2',
                boxShadow: lowPerfMode
                  ? '0 0 0 1px rgba(255,255,255,0.08) inset'
                  : '0 10px 24px rgba(79,142,247,0.2), 0 0 0 1px rgba(255,255,255,0.08) inset',
              }}
            >
              <span className="navbar-hire-dot" />
              Hire Me
            </Link>
          </motion.div>
        </div>

        <motion.button
          onClick={() => setIsMenuOpen((v) => !v)}
          whileTap={ultraMobileMode ? undefined : { scale: 0.9 }}
          style={{
            padding: '8px',
            color: '#BFD1FF',
            background: 'rgba(79,142,247,0.08)',
            border: '1px solid rgba(79,142,247,0.24)',
            cursor: 'pointer',
            borderRadius: '12px',
            flexShrink: 0,
          }}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="x"
                initial={ultraMobileMode ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={ultraMobileMode ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                transition={{ duration: ultraMobileMode ? 0.1 : 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={ultraMobileMode ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={ultraMobileMode ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
                transition={{ duration: ultraMobileMode ? 0.1 : 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={ultraMobileMode ? { opacity: 1, y: 0, height: 'auto' } : { opacity: 1, y: 0, height: 'auto' }}
            exit={ultraMobileMode ? { opacity: 0, y: 0, height: 0 } : { opacity: 0, y: -10, height: 0 }}
            transition={ultraMobileMode ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: 'linear-gradient(165deg, rgba(6,9,18,0.98), rgba(8,14,25,0.96) 50%, rgba(11,18,32,0.98))',
              backdropFilter: lowPerfMode ? 'none' : 'blur(20px)',
              borderTop: '1px solid rgba(148,163,184,0.14)',
            }}
            className="md:hidden"
          >
            <motion.nav
              style={{ padding: '10px 12px 14px' }}
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: ultraMobileMode ? 0 : lowPerfMode ? 0 : 0.05 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.path}
                  variants={{
                    hidden: ultraMobileMode ? { opacity: 0, y: 4 } : lowPerfMode ? { opacity: 0 } : { opacity: 0, x: -16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      transition: { duration: ultraMobileMode ? 0.18 : lowPerfMode ? 0.15 : 0.3, ease: 'easeOut' },
                    },
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '13px 14px',
                      fontSize: '14px',
                      fontWeight: 600,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      color: isActive(link.path) ? '#E8E8F2' : '#A8B8DA',
                      border: isActive(link.path) ? '1px solid rgba(124,92,252,0.5)' : '1px solid rgba(148,163,184,0.16)',
                      background: isActive(link.path)
                        ? 'linear-gradient(120deg, rgba(79,142,247,0.2), rgba(124,92,252,0.18))'
                        : 'linear-gradient(120deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))',
                      marginBottom: '8px',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: ultraMobileMode ? { opacity: 0, y: 4 } : lowPerfMode ? { opacity: 0 } : { opacity: 0, x: -16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: { duration: ultraMobileMode ? 0.18 : lowPerfMode ? 0.15 : 0.3, ease: 'easeOut' },
                  },
                }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4px', paddingTop: '12px' }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '13px 16px',
                    fontSize: '14px',
                    fontWeight: 700,
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4F8EF7, #22D3EE 45%, #7C5CFC)',
                    color: 'white',
                    letterSpacing: '0.06em',
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
