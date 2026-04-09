import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const MouseGlow = () => {
  const glowRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
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
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        '--glow-x': '50vw',
        '--glow-y': '30vh',
        background: 'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(79,142,247,0.05) 0%, transparent 60%)',
      }}
    />
  );
};

const RouteFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center px-6">
    <div className="text-center">
      <div className="w-10 h-10 border-2 border-white/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-sm text-text-secondary">Loading page...</p>
    </div>
  </div>
);

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary relative">
      <ScrollToTop />
      <MouseGlow />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
