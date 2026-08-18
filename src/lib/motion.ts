import type { Variants, ViewportOptions } from 'motion/react';

export const EASE = [0.2, 0.85, 0.2, 1] as const;

export const DURATION = {
  tap: 0.12,
  exit: 0.14,
  move: 0.24,
  enter: 0.32,
  stage: 2.4,
} as const;

export const STAGGER = {
  tight: 0.06,
  loose: 0.09,
} as const;

export const revealHeading: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: DURATION.enter, ease: EASE } },
};

export const revealRule: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: DURATION.enter, ease: EASE },
  },
};

export const revealBody: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.enter, ease: EASE } },
};

export const revealCard = (column = 0): Variants => ({
  hidden: { opacity: 0, y: 20, x: column % 2 === 0 ? -12 : 12 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: DURATION.enter, ease: EASE },
  },
});

export const staggerContainer = (
  staggerChildren: number = STAGGER.tight,
  delayChildren = 0
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewport: ViewportOptions = { once: true, amount: 0.1 };
