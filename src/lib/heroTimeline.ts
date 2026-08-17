/**
 * The hero's 9.2s timeline, as pure functions of elapsed seconds.
 *
 * Keeping this out of the component means the clock in HeroXray does nothing
 * but read the wall time, call these, and write the results to CSS custom
 * properties -- and it means the hold-frame position used for reduced motion,
 * constrained devices, print and the prerendered HTML is derived from the same
 * source as the animation rather than hardcoded twice.
 */

/** Beat boundaries, in seconds. */
export const BEAT = {
  /** Sweep head fades in before it starts travelling. */
  headAppear: 1.1,
  headVisible: 1.5,
  crossStart: 1.5,
  /** 2.4s of travel -- this is --duration-stage. */
  crossEnd: 3.9,
  holdEnd: 5.3,
  returnEnd: 7.3,
  loopEnd: 9.2,
} as const;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * --ease-signal evaluated for a normalised t.
 *
 * A cubic-bezier's y is only reachable from its x by iteration. Newton's
 * method converges in a handful of steps over this curve's range, and three
 * are enough for sub-pixel accuracy at these sizes -- the alternative is
 * shipping a solver library for one easing function.
 */
const bezier = (t: number): number => {
  const x1 = 0.2;
  const y1 = 0.85;
  const x2 = 0.2;
  const y2 = 1;

  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (u: number) => ((ax * u + bx) * u + cx) * u;
  const sampleDerivativeX = (u: number) => (3 * ax * u + 2 * bx) * u + cx;

  let guess = t;
  for (let i = 0; i < 4; i += 1) {
    const error = sampleX(guess) - t;
    const derivative = sampleDerivativeX(guess);
    if (Math.abs(derivative) < 1e-6) break;
    guess -= error / derivative;
  }
  guess = clamp01(guess);

  return ((ay * guess + by) * guess + cy) * guess;
};

/**
 * Sweep position as a percentage, 0-100.
 *
 * 0 means the card reads as an ordinary profile card; 100 means the structure
 * layer has fully replaced it.
 */
export const sweepAt = (t: number): number => {
  if (t < BEAT.crossStart) return 0;
  if (t < BEAT.crossEnd) {
    return bezier((t - BEAT.crossStart) / (BEAT.crossEnd - BEAT.crossStart)) * 100;
  }
  if (t < BEAT.holdEnd) return 100;
  if (t < BEAT.returnEnd) {
    return 100 - bezier((t - BEAT.holdEnd) / (BEAT.returnEnd - BEAT.holdEnd)) * 100;
  }
  return 0;
};

/** Opacity of the sweep head and its line. It only exists while crossing. */
export const sweepOpacityAt = (t: number): number => {
  if (t < BEAT.headAppear) return 0;
  if (t < BEAT.headVisible) return (t - BEAT.headAppear) / (BEAT.headVisible - BEAT.headAppear);
  if (t < BEAT.returnEnd) return 1;
  if (t < BEAT.returnEnd + 0.3) return 1 - (t - BEAT.returnEnd) / 0.3;
  return 0;
};

/**
 * The frame shown whenever the animation must not run: reduced motion, a
 * constrained device, a landscape phone, print, and the prerendered HTML.
 *
 * Section 4 asks for a frame where both layers are readable rather than a
 * blank box, so this is the midpoint of the cross: the structure text occupying
 * the left half and the photo the right, split down the middle. Left is the
 * already-passed side, which follows from the clip-paths in section 3.
 */
export const HOLD_FRAME_SWEEP = 50;
