import { useEffect } from 'react';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Route changes are recorded by GA4's enhanced measurement ("page changes based on
// browser history events"), so only the initial config call is needed here.
const loadGoogleAnalytics = (): void => {
  if (document.querySelector('script[data-google-analytics]')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array copy.
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  script.dataset.googleAnalytics = '';
  document.head.appendChild(script);
};

const DeferredGoogleAnalytics = () => {
  useEffect(() => {
    if (import.meta.env.DEV || !GA_MEASUREMENT_ID) return undefined;

    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    const taskId = hasIdleCallback
      ? window.requestIdleCallback(loadGoogleAnalytics)
      : window.setTimeout(loadGoogleAnalytics, 1800);

    return () =>
      hasIdleCallback ? window.cancelIdleCallback(taskId) : window.clearTimeout(taskId);
  }, []);

  return null;
};

export default DeferredGoogleAnalytics;
