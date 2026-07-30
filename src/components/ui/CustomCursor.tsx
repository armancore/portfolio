import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, label';
const RING_SIZE = 32;
const DOT_SIZE = 6;
const LERP_FACTOR = 0.18;
/** Sub-pixel distance at which the trailing ring is considered arrived. */
const SETTLE_THRESHOLD = 0.5;

// The cursor is a continuous rAF animation, so reduced-motion users must not
// get it -- and a coarse pointer has nothing to track. Both are live queries:
// hybrid devices switch pointer type, and the OS motion setting can change
// mid-session.
const DISABLE_QUERY = '(pointer: coarse), (prefers-reduced-motion: reduce)';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pulseTimeoutRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(false);
  const hasPositionedRef = useRef(false);
  const [isDisabled, setIsDisabled] = useState(
    () => typeof window === 'undefined' || window.matchMedia(DISABLE_QUERY).matches
  );

  useEffect(() => {
    const media = window.matchMedia(DISABLE_QUERY);
    const sync = () => setIsDisabled(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (isDisabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const moveElement = (element: HTMLDivElement, x: number, y: number) => {
      element.style.setProperty('--cursor-x', `${x}px`);
      element.style.setProperty('--cursor-y', `${y}px`);
    };

    const animateRing = () => {
      const ringPosition = ringPositionRef.current;
      const mouse = mouseRef.current;

      const dx = mouse.x - ringPosition.x;
      const dy = mouse.y - ringPosition.y;

      // The lerp is asymptotic, so it never exactly arrives. Without this the
      // loop re-queued itself forever and kept the compositor awake for the
      // whole session after the first mouse move. Snap and stop once the ring
      // is within half a pixel; the next mousemove restarts it.
      if (Math.abs(dx) < SETTLE_THRESHOLD && Math.abs(dy) < SETTLE_THRESHOLD) {
        ringPosition.x = mouse.x;
        ringPosition.y = mouse.y;
        moveElement(ring, ringPosition.x, ringPosition.y);
        isAnimatingRef.current = false;
        frameRef.current = null;
        return;
      }

      ringPosition.x += dx * LERP_FACTOR;
      ringPosition.y += dy * LERP_FACTOR;
      moveElement(ring, ringPosition.x, ringPosition.y);

      frameRef.current = window.requestAnimationFrame(animateRing);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };

      if (!hasPositionedRef.current) {
        // Seed the ring under the pointer on first sight so it does not fly in
        // from the origin. Must be its own object: aliasing it to mouseRef
        // would make the delta permanently zero and kill the trailing effect.
        hasPositionedRef.current = true;
        ringPositionRef.current = { x: event.clientX, y: event.clientY };
      }

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        frameRef.current = window.requestAnimationFrame(animateRing);
      }

      moveElement(dot, event.clientX, event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      ring.classList.toggle('custom-cursor__ring--interactive', isInteractive);
    };

    const handleMouseOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as Element | null;
      const isInteractive = Boolean(relatedTarget?.closest(INTERACTIVE_SELECTOR));
      ring.classList.toggle('custom-cursor__ring--interactive', isInteractive);
    };

    const handleMouseDown = () => {
      dot.classList.remove('custom-cursor__dot--pulse');
      void dot.offsetWidth;
      dot.classList.add('custom-cursor__dot--pulse');

      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }

      pulseTimeoutRef.current = window.setTimeout(() => {
        dot.classList.remove('custom-cursor__dot--pulse');
      }, 220);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      if (pulseTimeoutRef.current) {
        window.clearTimeout(pulseTimeoutRef.current);
      }

      // Reset so a re-enable (pointer type or motion preference changed)
      // starts from a clean state rather than a stale position.
      frameRef.current = null;
      isAnimatingRef.current = false;
      hasPositionedRef.current = false;
    };
  }, [isDisabled]);

  // Unmount rather than hide: leaves no elements at z-index 2147483647 and
  // lets the CSS hand the native cursor back.
  if (isDisabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor custom-cursor__ring"
        style={{ width: RING_SIZE, height: RING_SIZE, pointerEvents: 'none' }}
      >
        <span />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor custom-cursor__dot"
        style={{ width: DOT_SIZE, height: DOT_SIZE, pointerEvents: 'none' }}
      >
        <span />
      </div>
    </>
  );
};

export default CustomCursor;
