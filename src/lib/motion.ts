// Shared animation variants for Motion for React.

import type { Variants, ViewportOptions } from 'motion/react';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerContainer = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// For hero entrance (fires immediately, no scroll)
export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Blur-in text reveal
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  show: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Card flip/reveal
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 32, rotateX: 8 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Viewport config used across all scroll-triggered sections
export const viewport: ViewportOptions = { once: true, amount: 0.1 };
