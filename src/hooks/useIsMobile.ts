import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Tracks the mobile breakpoint.
 *
 * Returns false on the very first render, always -- including in the browser.
 * The pages are prerendered to static HTML at build time, where no viewport
 * exists, so any value derived from the real width would make the hydrated
 * markup disagree with the served markup. The true value lands in an effect
 * immediately after mount.
 */
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(media.matches);

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return isMobile;
};

export default useIsMobile;
