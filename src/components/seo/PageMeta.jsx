import { useEffect } from 'react';

const updateMeta = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', value);
  }
};

const PageMeta = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', window.location.href);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
  }, [title, description]);

  return null;
};

export default PageMeta;
