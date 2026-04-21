import { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion, useSpring } from 'motion/react';

type UseMagneticResult = {
  ref: React.RefObject<HTMLElement>;
  style: React.CSSProperties;
};

const useMagnetic = (strength = 0.35): UseMagneticResult => {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.6 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)');
    setIsCoarsePointer(media.matches);
    const onPointerChange = () => setIsCoarsePointer(media.matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);

    media.addEventListener('change', onPointerChange);
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      media.removeEventListener('change', onPointerChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    const disabled = prefersReducedMotion || isMobile || isCoarsePointer;
    if (!el || disabled) {
      x.set(0);
      y.set(0);
      return undefined;
    }

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (event.clientX - centerX) * strength;
      const offsetY = (event.clientY - centerY) * strength;
      x.set(offsetX);
      y.set(offsetY);
    };

    const onEnter = () => {
      el.addEventListener('mousemove', onMove);
    };

    const onLeave = () => {
      el.removeEventListener('mousemove', onMove);
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      x.set(0);
      y.set(0);
    };
  }, [isCoarsePointer, isMobile, prefersReducedMotion, strength, x, y]);

  const style = useMemo(() => {
    if (prefersReducedMotion || isMobile || isCoarsePointer) return {};
    return { x, y } as unknown as React.CSSProperties;
  }, [isCoarsePointer, isMobile, prefersReducedMotion, x, y]);

  return { ref, style };
};

export default useMagnetic;
