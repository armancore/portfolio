import { useEffect, useRef } from 'react';

/**
 * Adds `.visible` to an element once it enters the viewport.
 *
 * Fires **once**. The observer unobserves the target on its first
 * intersection and the class is never removed, so scrolling back past an
 * element does not replay its entrance -- content that has already been read
 * should not animate again.
 */
const useReveal = (delay = 0, disabled = false) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (disabled) {
      element.classList.add('visible');
      return;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      element.classList.add('visible');
      return;
    }

    const timeouts = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timeoutId = window.setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            timeouts.add(timeoutId);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [delay, disabled]);

  return ref;
};

export default useReveal;
