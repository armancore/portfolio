import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE, viewport } from '../../lib/motion';

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
};

const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: ScrollRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const reduceAnimations = prefersReducedMotion;

  if (reduceAnimations) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Travel distances match revealBody/revealCard in lib/motion rather than the
  // 40-44px the old variants used. At this duration the longer throw read as a
  // slide rather than a settle.
  const hidden =
    direction === 'left'
      ? { x: -12, opacity: 0 }
      : direction === 'right'
        ? { x: 12, opacity: 0 }
        : { y: 12, opacity: 0 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={viewport}
      transition={{ duration: DURATION.enter, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
