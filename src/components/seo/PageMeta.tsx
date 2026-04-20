import { useEffect } from 'react';

type PageMetaProps = {
  title: string;
  description: string;
};

const updateMeta = (selector: string, value: string) => {
  const element = document.querySelector(selector) as HTMLMetaElement | null;
  if (element) {
    element.setAttribute('content', value);
  }
};

const PageMeta = ({ title, description }: PageMetaProps): null => {
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
