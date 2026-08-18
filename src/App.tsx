import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { DURATION, EASE } from './lib/motion';

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
            color: 'var(--color-chalk-2)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            textAlign: 'center',
            padding: '48px 24px',
          }}
        >
          <div>
            <p style={{ color: 'var(--color-chalk)', fontWeight: 500, marginBottom: '8px' }}>
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
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export type PageComponents = {
  Home: React.ComponentType;
  About: React.ComponentType;
  Projects: React.ComponentType;
  ProjectDetail: React.ComponentType;
  Contact: React.ComponentType;
  NotFound: React.ComponentType;
};

export type AppProps = {
  pages: PageComponents;
  suspend: boolean;
};

const lazyPages: PageComponents = { Home, About, Projects, ProjectDetail, Contact, NotFound };

const RouteFallback = () => (
  <div
    aria-hidden="true"
    style={{
      minHeight: '100svh',
    }}
  />
);

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
      <Route path="/projects/:slug" element={<pages.ProjectDetail />} />
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
    <div className="min-h-svh bg-void text-chalk-2 relative">
      <ScrollToTop />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <main id="main">
          <ErrorBoundary>
            {performanceMode ? (
              routeTree
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={location.pathname}
                  data-route-transition
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: DURATION.exit, ease: EASE } }}
                  transition={{ duration: DURATION.move, ease: EASE }}
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

const App = ({ pages = lazyPages, suspend = true }: Partial<AppProps> = {}) => (
  <AppContent pages={pages} suspend={suspend} />
);

export default App;
