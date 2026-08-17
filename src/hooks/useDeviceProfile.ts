import { useEffect, useState } from 'react';

/**
 * Every capability and preference check from section 4 of the brief, resolved
 * in one place.
 *
 * SSR safety is the whole point of the shape here. `window`, `navigator` and
 * `matchMedia` do not exist during prerender, so the initial state is a
 * conservative constant that renders identically on the server and on the
 * browser's first paint. Reading any of them during render would either crash
 * scripts/prerender.mjs or desync hydration.
 *
 * `motionAllowed` starts false deliberately. The static hold frame is the
 * safe default: a device that turns out to be capable can start animating a
 * tick later, whereas a device that should never have animated cannot take it
 * back.
 */

export type DeviceProfile = {
  /** True only once we are on a real client that passed every check below. */
  motionAllowed: boolean;
  /** prefers-reduced-motion: reduce */
  reducedMotion: boolean;
  /** Coarse pointer, i.e. no reliable hover. */
  coarsePointer: boolean;
  /** Landscape phone: the hero collapses to headline plus a hold frame. */
  shortLandscape: boolean;
};

const INITIAL: DeviceProfile = {
  motionAllowed: false,
  reducedMotion: false,
  coarsePointer: false,
  shortLandscape: false,
};

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER = '(pointer: coarse)';
// Section 4: a phone held sideways has no vertical room for a full-height
// hero, so it gets the headline and a static frame instead.
const SHORT_LANDSCAPE = '(orientation: landscape) and (max-height: 500px)';

const useDeviceProfile = (): DeviceProfile => {
  const [profile, setProfile] = useState<DeviceProfile>(INITIAL);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION);
    const coarsePointerQuery = window.matchMedia(COARSE_POINTER);
    const shortLandscapeQuery = window.matchMedia(SHORT_LANDSCAPE);

    const sync = () => {
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
        deviceMemory?: number;
      };

      const saveData = nav.connection?.saveData === true;
      // These two are absent in Firefox and Safari. Treating "unknown" as
      // constrained would disable the animation for most of the web, so an
      // absent reading is not a failing one.
      const memory = nav.deviceMemory;
      const lowMemory = typeof memory === 'number' && memory <= 4;
      const cores = navigator.hardwareConcurrency;
      const lowCores = typeof cores === 'number' && cores <= 4;

      const reducedMotion = reducedMotionQuery.matches;
      const shortLandscape = shortLandscapeQuery.matches;

      setProfile({
        reducedMotion,
        coarsePointer: coarsePointerQuery.matches,
        shortLandscape,
        motionAllowed: !(reducedMotion || shortLandscape || saveData || lowMemory || lowCores),
      });
    };

    sync();

    // The OS motion setting, the pointer type on a hybrid device, and the
    // orientation of a phone can all change mid-session.
    reducedMotionQuery.addEventListener('change', sync);
    coarsePointerQuery.addEventListener('change', sync);
    shortLandscapeQuery.addEventListener('change', sync);

    return () => {
      reducedMotionQuery.removeEventListener('change', sync);
      coarsePointerQuery.removeEventListener('change', sync);
      shortLandscapeQuery.removeEventListener('change', sync);
    };
  }, []);

  return profile;
};

export default useDeviceProfile;
