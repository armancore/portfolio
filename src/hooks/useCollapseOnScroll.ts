import { useState, useEffect } from 'react';

// True while scrolling down past `threshold`; false on scroll up or near the top.
const useCollapseOnScroll = (threshold = 40, jitter = 4) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frameId: number | null = null;

    const update = () => {
      frameId = null;
      const y = window.scrollY;
      let next: boolean | null = null;

      if (y <= threshold) next = false;
      else if (y > lastY + jitter) next = true;
      else if (y < lastY - jitter) next = false;
      else return; // Inside the jitter band: keep lastY anchored so slow scrolls still register.

      lastY = y;
      setCollapsed((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // A reload restored mid-page starts collapsed.
    if (lastY > threshold) setCollapsed(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [threshold, jitter]);

  return collapsed;
};

export default useCollapseOnScroll;
