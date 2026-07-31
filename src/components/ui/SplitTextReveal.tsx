import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import useIsMobile from '../../hooks/useIsMobile';

type SplitTextRevealProps = {
  text: string;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
};

const SplitTextReveal = ({ text, style, className, delay = 0 }: SplitTextRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const reduceAnimations = prefersReducedMotion || isMobile;

  if (reduceAnimations) {
    return (
      <span style={style} className={className}>
        {text}
      </span>
    );
  }

  return (
    <motion.span
      style={style}
      className={className}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.038,
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span
              key={`space-${index}`}
              style={{ display: 'inline-block' }}
            >
              {'\u00a0'}
            </span>
          );
        }

        return (
          <span
            key={`${char}-${index}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              variants={{
                hidden: { y: '105%', opacity: 0 },
                show: { y: '0%', opacity: 1 },
              }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default SplitTextReveal;
