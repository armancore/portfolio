import { startTransition, useEffect, useState } from 'react';

export type DeviceProfile = {
  resolved: boolean;
  motionAllowed: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
  narrowViewport: boolean;
  saveData: boolean;
  shortLandscape: boolean;
};

const INITIAL: DeviceProfile = {
  resolved: false,
  motionAllowed: false,
  reducedMotion: false,
  coarsePointer: false,
  narrowViewport: false,
  saveData: false,
  shortLandscape: false,
};

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER = '(pointer: coarse)';
const NARROW_VIEWPORT = '(max-width: 767px)';
const SHORT_LANDSCAPE = '(orientation: landscape) and (max-height: 500px)';

const useDeviceProfile = (): DeviceProfile => {
  const [profile, setProfile] = useState<DeviceProfile>(INITIAL);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION);
    const coarsePointerQuery = window.matchMedia(COARSE_POINTER);
    const narrowViewportQuery = window.matchMedia(NARROW_VIEWPORT);
    const shortLandscapeQuery = window.matchMedia(SHORT_LANDSCAPE);

    const sync = () => {
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
        deviceMemory?: number;
      };

      const saveData = nav.connection?.saveData === true;
      const memory = nav.deviceMemory;
      const lowMemory = typeof memory === 'number' && memory <= 4;
      const cores = navigator.hardwareConcurrency;
      const lowCores = typeof cores === 'number' && cores <= 4;

      const reducedMotion = reducedMotionQuery.matches;
      const shortLandscape = shortLandscapeQuery.matches;

      startTransition(() =>
        setProfile({
          resolved: true,
          reducedMotion,
          coarsePointer: coarsePointerQuery.matches,
          narrowViewport: narrowViewportQuery.matches,
          saveData,
          shortLandscape,
          motionAllowed: !(reducedMotion || shortLandscape || saveData || lowMemory || lowCores),
        })
      );
    };

    sync();

    reducedMotionQuery.addEventListener('change', sync);
    coarsePointerQuery.addEventListener('change', sync);
    narrowViewportQuery.addEventListener('change', sync);
    shortLandscapeQuery.addEventListener('change', sync);

    return () => {
      reducedMotionQuery.removeEventListener('change', sync);
      coarsePointerQuery.removeEventListener('change', sync);
      narrowViewportQuery.removeEventListener('change', sync);
      shortLandscapeQuery.removeEventListener('change', sync);
    };
  }, []);

  return profile;
};

export default useDeviceProfile;
