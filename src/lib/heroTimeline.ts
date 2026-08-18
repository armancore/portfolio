export const BEAT = {
  headAppear: 1.1,
  headVisible: 1.5,
  crossStart: 1.5,
  crossEnd: 3.9,
  holdEnd: 5.3,
  returnEnd: 7.3,
  loopEnd: 9.2,
} as const;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

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

export const sweepOpacityAt = (t: number): number => {
  if (t < BEAT.headAppear) return 0;
  if (t < BEAT.headVisible) return (t - BEAT.headAppear) / (BEAT.headVisible - BEAT.headAppear);
  if (t < BEAT.returnEnd) return 1;
  if (t < BEAT.returnEnd + 0.3) return 1 - (t - BEAT.returnEnd) / 0.3;
  return 0;
};

export const HOLD_FRAME_SWEEP = 50;
