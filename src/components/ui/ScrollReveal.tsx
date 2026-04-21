import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

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

  const hidden =
    direction === 'left'
      ? { x: -40, opacity: 0 }
      : direction === 'right'
        ? { x: 40, opacity: 0 }
        : { y: 44, opacity: 0 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
