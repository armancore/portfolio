import { useEffect } from 'react';
import { routeMeta } from '../../routes';

type PageMetaProps = {
  path: string;
};

const updateMeta = (selector: string, value: string) => {
  const element = document.querySelector(selector) as HTMLMetaElement | null;
  if (element) {
    element.setAttribute('content', value);
  }
};

const PageMeta = ({ path }: PageMetaProps): null => {
  const { title, shareTitle, description } = routeMeta(path);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = title;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', shareTitle);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[name="twitter:title"]', shareTitle);
    updateMeta('meta[name="twitter:description"]', description);

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.setAttribute('href', canonicalUrl);
  }, [title, shareTitle, description]);

  return null;
};

export default PageMeta;
