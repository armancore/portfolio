import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { HERO_XRAY } from '../../constants';
import useDeviceProfile from '../../hooks/useDeviceProfile';
import { BEAT, HOLD_FRAME_SWEEP, sweepAt, sweepOpacityAt } from '../../lib/heroTimeline';


// The full frame, not a tight crop. object-fit: cover trims about 6% vertically
// to reach the box's 4:5 and nothing else.
const PHOTO_AVIF = '/profile-960.avif';
const PHOTO_WEBP = '/profile-960.webp';

const PAUSE_KEY = 'hero-xray-paused';

/**
 * Intrinsic size for the image's width/height attributes, at the box's 4:5.
 * These reserve the right aspect before the image lands, which is what keeps
 * CLS at zero -- they are not the rendered size, which is fluid.
 */
const BOX_W = 420;
const BOX_H = 525;

/** Reads the session's pause preference without touching storage on the server. */
const readStoredPause = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(PAUSE_KEY) === 'true';
  } catch {
    // Storage throws in private mode on some browsers, and a disabled
    // preference is not worth failing the hero over.
    return false;
  }
};

const HeroXray = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const profile = useDeviceProfile();

  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  // Wall-clock bookkeeping. Refs rather than state: this updates at 60fps and
  // must never trigger a React render.
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

  /**
   * Section 4: motion may not start until the main thread is free and the
   * fonts have settled, so the hero can never be what delays first paint or
   * shifts text once it lands.
   */
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

  /**
   * One pass per entry into view, not a repeating loop. Re-entering the
   * viewport rearms the clock; leaving it stops the pass where it is.
   */
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
      // Restart the pass rather than jumping to wherever the clock would have
      // reached while the tab was hidden.
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

  // The single clock. It writes two CSS custom properties and never calls
  // setState, so nothing here re-renders React at frame rate. Per-row opacity
  // is a pure function of --p in CSS, so the cascade costs nothing extra.
  useAnimationFrame((time) => {
    if (!ready || pausedRef.current || !inView.current || !visible.current) return;

    if (startedAt.current === null) startedAt.current = time;
    const elapsed = (time - startedAt.current) / 1000;

    if (elapsed >= BEAT.loopEnd) {
      // The pass is done. Settle on the photo and wait for the next entry into
      // view rather than looping.
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
        // Preference simply does not persist; the control still works.
      }
      if (!next) startedAt.current = null;
      return next;
    });
  };

  // Until the clock owns the card, it renders at the hold frame: the sweep
  // parked at 50%, both layers readable. This is what the prerendered HTML
  // contains, and what reduced-motion, constrained, landscape-phone and print
  // users keep.
  const sweep = ready ? 0 : HOLD_FRAME_SWEEP;

  return (
    <div
        ref={cardRef}
        className="xray-card"
        // Gates the per-row cascade. While this is absent the rows all render
        // at full opacity, which is what the hold frame and the prerendered
        // HTML need -- the rows are content, not decoration.
        data-animating={ready ? 'true' : undefined}
        style={{ '--p': sweep } as React.CSSProperties}
      >
        {/* SURFACE -- the portrait, and the LCP element. It is meaningful
            content rather than decoration, so it carries a real alt and stays
            in the accessibility tree. */}
        <div className="xray-layer xray-layer--surface">
          <picture>
            <source srcSet={PHOTO_AVIF} type="image/avif" />
            <img
              className="xray-photo"
              src={PHOTO_WEBP}
              alt={HERO_XRAY.photoAlt}
              width={BOX_W}
              height={BOX_H}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        {/* STRUCTURE -- real content, so it stays in the accessibility tree.
            There is no duplicate visually-hidden copy. */}
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
                  // Classed so the global `a:not([class])` amber rule does not
                  // apply -- nothing in the structure layer is amber.
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

        {/* Only offered when there is something to pause. Top-right of the box:
            beneath it, the control read as a caption on the portrait. */}
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
