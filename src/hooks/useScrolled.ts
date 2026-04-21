import { useState, useEffect } from 'react';

const useScrolled = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        const next = window.scrollY > threshold;
        setScrolled((prev) => (prev === next ? prev : next));
        frameId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [threshold]);

  return scrolled;
};

export default useScrolled;
