import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, label';
const RING_SIZE = 32;
const DOT_SIZE = 6;
const LERP_FACTOR = 0.18;

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pulseTimeoutRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const coarsePointerMedia = window.matchMedia('(pointer: coarse)');
    if (coarsePointerMedia.matches) return undefined;

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

      ringPosition.x += (mouse.x - ringPosition.x) * LERP_FACTOR;
      ringPosition.y += (mouse.y - ringPosition.y) * LERP_FACTOR;
      moveElement(ring, ringPosition.x, ringPosition.y);

      frameRef.current = window.requestAnimationFrame(animateRing);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };

      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        ringPositionRef.current = mouseRef.current;
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
    };
  }, []);

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
