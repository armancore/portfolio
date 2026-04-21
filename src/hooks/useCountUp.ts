import { useEffect, useRef, useState } from 'react';

type UseCountUpArgs = {
  target: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
  startOnView?: boolean;
};

type UseCountUpResult = {
  count: number;
  ref: React.RefObject<HTMLElement>;
};

const easeOutExpo = (t: number) => {
  if (t === 1) return 1;
  return 1 - 2 ** (-10 * t);
};

const useCountUp = ({
  target,
  duration = 1400,
  delay = 0,
  enabled = true,
  startOnView = true,
}: UseCountUpArgs): UseCountUpResult => {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(enabled ? 0 : target);
  const hasStartedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCount(target);
      return undefined;
    }

    setCount(0);
    hasStartedRef.current = false;

    const run = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      timeoutRef.current = window.setTimeout(() => {
        const start = performance.now();

        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutExpo(progress);
          setCount(Math.round(target * eased));

          if (progress < 1) {
            rafRef.current = window.requestAnimationFrame(step);
          }
        };

        rafRef.current = window.requestAnimationFrame(step);
      }, delay);
    };

    if (!startOnView) {
      run();
      return () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, enabled, startOnView]);

  return { count, ref };
};

export default useCountUp;
