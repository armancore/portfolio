import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9BA1AD',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '14px',
            textAlign: 'center',
            padding: '48px 24px',
          }}
        >
          <div>
            <p style={{ color: '#ECEEF2', fontWeight: 500, marginBottom: '8px' }}>
              Something went wrong.
            </p>
            <p>Please refresh the page or try again later.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export type PageComponents = {
  Home: React.ComponentType;
  About: React.ComponentType;
  Projects: React.ComponentType;
  Contact: React.ComponentType;
  NotFound: React.ComponentType;
};

export type AppProps = {
  pages: PageComponents;
  /**
   * Whether the route tree needs a Suspense boundary. True for the lazy client
   * pages. The prerenderer passes eagerly imported pages and false: a boundary
   * that suspends makes React stream the resolved markup into a <template>
   * after </footer> for a client script to relocate, which leaves <main> empty
   * in the static HTML and defeats the point of prerendering.
   */
  suspend: boolean;
};

const lazyPages: PageComponents = { Home, About, Projects, Contact, NotFound };

const RouteFallback = () => (
  <div
    aria-hidden="true"
    style={{
      minHeight: '100vh',
    }}
  />
);

const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  // Resolved after mount rather than during render: the prerendered HTML has
  // no pointer to query, so reading it inline would desync hydration.
  const [isPointerFine, setIsPointerFine] = React.useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setIsPointerFine(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

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
        opacity: 0.74,
        mixBlendMode: 'screen',
        '--glow-x': '50vw',
        '--glow-y': '30vh',
        background: `
          radial-gradient(170px circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--color-accent) 13%, transparent) 0%, color-mix(in srgb, var(--color-accent) 5.5%, transparent) 35%, transparent 72%),
          radial-gradient(480px circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, color-mix(in srgb, var(--color-accent) 4.8%, transparent) 42%, transparent 78%),
          radial-gradient(780px circle at var(--glow-x) var(--glow-y), color-mix(in srgb, var(--color-accent) 4.5%, transparent) 0%, transparent 82%)
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

const AppContent = ({ pages, suspend }: AppProps) => {
  const location = useLocation();
  const routes = (
    <Routes location={location}>
      <Route path="/" element={<pages.Home />} />
      <Route path="/about" element={<pages.About />} />
      <Route path="/projects" element={<pages.Projects />} />
      <Route path="/contact" element={<pages.Contact />} />
      <Route path="*" element={<pages.NotFound />} />
    </Routes>
  );
  const routeTree = suspend ? (
    <Suspense fallback={<RouteFallback />}>{routes}</Suspense>
  ) : (
    routes
  );
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
          <ErrorBoundary>
            {performanceMode ? (
              routeTree
            ) : (
              <AnimatePresence mode="wait" initial>
                <motion.div
                  key={location.pathname}
                  data-route-transition
                  initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(2px)' }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  {routeTree}
                </motion.div>
              </AnimatePresence>
            )}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </div>
  );
};

/**
 * The app below the router. main.tsx wraps this in a BrowserRouter;
 * entry-server.tsx wraps it in a StaticRouter for prerendering.
 */
const App = ({ pages = lazyPages, suspend = true }: Partial<AppProps> = {}) => (
  <>
    <CustomCursor />
    <AppContent pages={pages} suspend={suspend} />
  </>
);

export default App;
