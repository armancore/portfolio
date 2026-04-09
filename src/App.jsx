import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const MouseGlow = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(79,142,247,0.05) 0%, transparent 60%)`,
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
  const hasHashRoute = window.location.hash.startsWith('#/');
  const isDirectRoute = window.location.pathname !== '/' && !hasHashRoute;

  useEffect(() => {
    if (!isDirectRoute) return;

    const target = `/#${window.location.pathname}${window.location.search}`;
    window.location.replace(target);
  }, [isDirectRoute]);

  if (isDirectRoute) {
    return null;
  }

  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
