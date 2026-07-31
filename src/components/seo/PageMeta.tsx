import { useEffect } from 'react';
import { routeMeta } from '../../routes';

type PageMetaProps = {
  /** Key into the shared ROUTES table in src/routes.ts. */
  path: string;
};

const updateMeta = (selector: string, value: string) => {
  const element = document.querySelector(selector) as HTMLMetaElement | null;
  if (element) {
    element.setAttribute('content', value);
  }
};

/**
 * Keeps the document head in step with the active route during client-side
 * navigation. The prerendered HTML already carries the correct values for a
 * cold load -- scripts/prerender.mjs bakes them in from the same table -- so
 * this only matters once the router takes over.
 */
const PageMeta = ({ path }: PageMetaProps): null => {
  const { title, description } = routeMeta(path);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = title;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.setAttribute('href', canonicalUrl);
  }, [title, description]);

  return null;
};

export default PageMeta;
