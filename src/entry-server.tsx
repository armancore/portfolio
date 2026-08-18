import { StaticRouter } from 'react-router';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
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

const RENDER_TIMEOUT_MS = 15000;

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new PassThrough();

    sink.on('data', (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    sink.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    sink.on('error', reject);

    let settled = false;
    const fail = (error: unknown) => {
      if (settled) return;
      settled = true;
      reject(error instanceof Error ? error : new Error(String(error)));
    };

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App pages={pages} suspend={false} />
      </StaticRouter>,
      {
        onAllReady() {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          pipe(sink);
        },
        onError: fail,
      }
    );

    const timer = setTimeout(() => {
      abort();
      fail(new Error(`Prerender timed out after ${RENDER_TIMEOUT_MS}ms for ${url}`));
    }, RENDER_TIMEOUT_MS);
  });
}
