import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
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
