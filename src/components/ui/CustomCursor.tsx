import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

const CustomCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const dotX = useSpring(x, { stiffness: 900, damping: 30 });
  const dotY = useSpring(y, { stiffness: 900, damping: 30 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnabled(false);
      return undefined;
    }

    const media = window.matchMedia('(pointer: fine)');
    const onMediaChange = () => setEnabled(media.matches);
    onMediaChange();
    media.addEventListener('change', onMediaChange);

    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.classList.add('has-custom-cursor');

    let frame: number | null = null;
    const onMouseMove = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        x.set(event.clientX);
        y.set(event.clientY);
      });
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setInteractive(Boolean(target?.closest('a, button, [role=button]')));
    };

    const onMouseOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Element | null;
      setInteractive(Boolean(related?.closest('a, button, [role=button]')));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#4F8EF7',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        animate={{ scale: interactive ? 1.8 : 1, opacity: interactive ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(79,142,247,0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default CustomCursor;
