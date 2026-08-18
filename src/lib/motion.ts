// Shared animation variants for Motion for React.
//
// One curve for the entire site, and one rule: animate `transform` and
// `opacity` only. Never `width`, `height`, `top`, `left`, `margin`, or
// `box-shadow` -- those force layout or paint on every frame.
//
// The variants below are deliberately different per element class. A single
// `fadeUp` reused on headings, rules, body copy and cards reads as one
// undifferentiated drift; giving each class its own direction is what makes a
// section resolve in a readable order instead of arriving all at once.

import type { Variants, ViewportOptions } from 'motion/react';

/** --ease-signal. Kept in sync with the token block in src/index.css. */
export const EASE = [0.2, 0.85, 0.2, 1] as const;

/** Token durations in seconds, which is the unit Motion expects. */
export const DURATION = {
  tap: 0.12,
  /** Route exit. Deliberately faster than the entrance: the outgoing page has
   *  nothing left to say, and section 5 caps the whole transition under 400ms. */
  exit: 0.14,
  move: 0.24,
  enter: 0.32,
  stage: 2.4,
} as const;

export const STAGGER = {
  tight: 0.06,
  loose: 0.09,
} as const;

/**
 * Mask wipe. The element carrying this must sit inside a parent with
 * `overflow: hidden` -- the child slides up from fully below the clip edge, so
 * without the clip it simply translates into view from nowhere.
 */
export const revealHeading: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: DURATION.enter, ease: EASE } },
};

/** Hairline rules and underscores, drawn left to right. */
export const revealRule: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: DURATION.enter, ease: EASE },
  },
};

/** Body copy and sub-headings. The shortest travel of the three. */
export const revealBody: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.enter, ease: EASE } },
};

/**
 * Cards enter from the side the grid flows: odd columns drift in from the
 * left, even columns from the right, so a two-column grid closes toward its
 * centre rather than sliding as one block.
 *
 * `column` is the zero-based index within the row as authored. Grids that
 * reflow to a single column at narrow widths still read correctly -- the
 * horizontal offset is 12px, small enough to register as a settle rather than
 * a slide when the visual column order no longer matches.
 */
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

/** Viewport config used across all scroll-triggered sections. */
export const viewport: ViewportOptions = { once: true, amount: 0.1 };
