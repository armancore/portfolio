import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const isPointerFine =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

  useEffect(() => {
    if (!isPointerFine) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      if (!glowRef.current) return;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = window.requestAnimationFrame(() => {
        glowRef.current?.style.setProperty('--glow-x', `${event.clientX}px`);
        glowRef.current?.style.setProperty('--glow-y', `${event.clientY}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        opacity: 0.84,
        mixBlendMode: 'screen',
        '--glow-x': '50vw',
        '--glow-y': '30vh',
        background: `
          radial-gradient(180px circle at var(--glow-x) var(--glow-y), rgba(148, 193, 255, 0.16) 0%, rgba(148, 193, 255, 0.075) 35%, transparent 72%),
          radial-gradient(520px circle at var(--glow-x) var(--glow-y), rgba(79, 142, 247, 0.125) 0%, rgba(79, 142, 247, 0.06) 42%, transparent 78%),
          radial-gradient(900px circle at var(--glow-x) var(--glow-y), rgba(34, 211, 238, 0.07) 0%, transparent 82%)
        `,
      } as React.CSSProperties}
    />
  );
};

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const [isConstrainedDevice, setIsConstrainedDevice] = React.useState(false);

  useEffect(() => {
    const media =
      typeof window !== 'undefined'
        ? window.matchMedia('(max-width: 767px), (pointer: coarse)')
        : null;

    const computeConstrained = () => {
      const saveData = (
        navigator as Navigator & { connection?: { saveData?: boolean } }
      ).connection?.saveData;
      const mobileViewport = media?.matches ?? false;
      setIsConstrainedDevice(Boolean(mobileViewport || saveData));
    };

    computeConstrained();
    media?.addEventListener('change', computeConstrained);

    return () => {
      media?.removeEventListener('change', computeConstrained);
    };
  }, []);

  const performanceMode = prefersReducedMotion || isConstrainedDevice;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative">
      <ScrollToTop />
      {!performanceMode && <MouseGlow />}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <main>
          {performanceMode ? (
            <Suspense fallback={null}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          ) : (
            <AnimatePresence mode="wait" initial>
              <Suspense fallback={null}>
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(2px)' }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </motion.div>
              </Suspense>
            </AnimatePresence>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
