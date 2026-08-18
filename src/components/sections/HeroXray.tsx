import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { HERO_XRAY } from '../../constants';
import useDeviceProfile from '../../hooks/useDeviceProfile';
import { BEAT, HOLD_FRAME_SWEEP, sweepAt, sweepOpacityAt } from '../../lib/heroTimeline';

const PHOTO_WEBP = '/profile-960.webp';

const PHOTO_AVIF_SRCSET =
  '/profile-320.avif 320w, /profile-480.avif 480w, /profile-640.avif 640w, /profile-768.avif 768w, /profile-960.avif 960w';
const PHOTO_WEBP_SRCSET = '/profile-640.webp 640w, /profile-960.webp 960w';

const PHOTO_SIZES = [
  '(max-width: 639px) calc(100vw - 32px)',
  '(max-width: 767px) calc(100vw - 48px)',
  '(max-width: 1153px) 300px',
  '(max-width: 1537px) 26vw',
  '400px',
].join(', ');

const PAUSE_KEY = 'hero-xray-paused';

const BOX_W = 420;
const BOX_H = 525;

const readStoredPause = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(PAUSE_KEY) === 'true';
  } catch {
    return false;
  }
};

const HeroXray = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const profile = useDeviceProfile();

  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  const startedAt = useRef<number | null>(null);
  const inView = useRef(false);
  const visible = useRef(true);
  const pausedRef = useRef(false);

  useEffect(() => {
    setPaused(readStoredPause());
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!profile.motionAllowed) return undefined;

    let cancelled = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const start = () => {
      if (!cancelled) setReady(true);
    };

    const waitForIdle = () => {
      if (cancelled) return;
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (typeof ric === 'function') idleHandle = ric(start);
      else timeoutHandle = window.setTimeout(start, 200);
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(waitForIdle).catch(waitForIdle);
    else timeoutHandle = window.setTimeout(waitForIdle, 200);

    return () => {
      cancelled = true;
      const cic = (window as Window & { cancelIdleCallback?: (h: number) => void })
        .cancelIdleCallback;
      if (idleHandle !== undefined && typeof cic === 'function') cic(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
    };
  }, [profile.motionAllowed]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !ready || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!inView.current) {
              inView.current = true;
              startedAt.current = null;
            }
          } else {
            inView.current = false;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    const onVisibility = () => {
      visible.current = document.visibilityState === 'visible';
      if (visible.current) startedAt.current = null;
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const write = useCallback((sweep: number, opacity: number) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--p', sweep.toFixed(2));
    card.style.setProperty('--sweep-opacity', opacity.toFixed(3));
  }, []);

  useAnimationFrame((time) => {
    if (!ready || pausedRef.current || !inView.current || !visible.current) return;

    if (startedAt.current === null) startedAt.current = time;
    const elapsed = (time - startedAt.current) / 1000;

    if (elapsed >= BEAT.loopEnd) {
      write(0, 0);
      inView.current = false;
      return;
    }

    write(sweepAt(elapsed), sweepOpacityAt(elapsed));
  });

  const togglePause = () => {
    setPaused((previous) => {
      const next = !previous;
      try {
        window.sessionStorage.setItem(PAUSE_KEY, String(next));
      } catch {
        // Preference does not persist; the control still works.
      }
      if (!next) startedAt.current = null;
      return next;
    });
  };

 
  const sweep = !profile.resolved || profile.motionAllowed ? 0 : HOLD_FRAME_SWEEP;

  return (
    <div
        ref={cardRef}
        className="xray-card"
        data-animating={ready ? 'true' : undefined}
        style={{ '--p': sweep } as React.CSSProperties}
      >
        <div className="xray-layer xray-layer--surface">
          <picture>
            <source srcSet={PHOTO_AVIF_SRCSET} sizes={PHOTO_SIZES} type="image/avif" />
            <source srcSet={PHOTO_WEBP_SRCSET} sizes={PHOTO_SIZES} type="image/webp" />
            <img
              className="xray-photo"
              src={PHOTO_WEBP}
              srcSet={PHOTO_WEBP_SRCSET}
              sizes={PHOTO_SIZES}
              alt={HERO_XRAY.photoAlt}
              width={BOX_W}
              height={BOX_H}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <dl className="xray-layer xray-layer--structure">
          {HERO_XRAY.rows.map((row) => (
            <div
              key={row.id}
              className="xray-row"
              style={{ '--ry': row.ry } as React.CSSProperties}
            >
              <dt className="xray-row__label">{row.label}</dt>
              <dd className="xray-row__value">
                {row.href ? (
                  <a className="xray-row__link" href={row.href}>
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="xray-sweep" aria-hidden="true" />

        {profile.motionAllowed ? (
          <button
            type="button"
            onClick={togglePause}
            aria-pressed={paused}
            aria-label={paused ? HERO_XRAY.playLabel : HERO_XRAY.pauseLabel}
            title={paused ? HERO_XRAY.playLabel : HERO_XRAY.pauseLabel}
            data-motion-control
            className="xray-pause"
          >
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
        ) : null}
      </div>
  );
};

export default HeroXray;
