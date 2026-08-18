import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { PageComponents } from './App';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export { ROUTES, SITE_ORIGIN } from './routes';

const pages: PageComponents = { Home, About, Projects, ProjectDetail, Contact, NotFound };

export function render(url: string): Promise<string> {
  return Promise.resolve(
    renderToString(
      <StaticRouter location={url}>
        <App pages={pages} />
      </StaticRouter>
    )
  );
}
