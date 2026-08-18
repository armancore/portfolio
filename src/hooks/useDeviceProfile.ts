import { useEffect, useState } from 'react';

export type DeviceProfile = {
  /** False until the first client effect has measured the environment. */
  resolved: boolean;
  motionAllowed: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
  shortLandscape: boolean;
};

const INITIAL: DeviceProfile = {
  resolved: false,
  motionAllowed: false,
  reducedMotion: false,
  coarsePointer: false,
  shortLandscape: false,
};

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER = '(pointer: coarse)';
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
      const memory = nav.deviceMemory;
      const lowMemory = typeof memory === 'number' && memory <= 4;
      const cores = navigator.hardwareConcurrency;
      const lowCores = typeof cores === 'number' && cores <= 4;

      const reducedMotion = reducedMotionQuery.matches;
      const shortLandscape = shortLandscapeQuery.matches;

      setProfile({
        resolved: true,
        reducedMotion,
        coarsePointer: coarsePointerQuery.matches,
        shortLandscape,
        motionAllowed: !(reducedMotion || shortLandscape || saveData || lowMemory || lowCores),
      });
    };

    sync();

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
