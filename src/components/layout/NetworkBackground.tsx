import React, { useEffect, useRef } from 'react';

type Rgb = [number, number, number];
type NetworkNode = { x: number; y: number; vx: number; vy: number };

const LINK_DISTANCE = 130;
const POINTER_DISTANCE = 180;
const REVEAL_DISTANCE = 280; // node-to-node links strengthen inside this radius of the pointer
const IDLE_WEB = 0.22; // share of full link strength drawn everywhere, so the web never fully disappears
const LINK_ALPHA = 0.28;
const NODE_RADIUS = 1.6;
const MAX_SPEED = 7; // px per second
const MAX_NODES = 150;
const AREA_PER_NODE = 9000;
const MAX_DT = 0.05;
const MAX_DPR = 2;
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// Chromium hands back oklch() from getComputedStyle, so let the canvas resolve the token to sRGB.
const readToken = (probe: CanvasRenderingContext2D, name: string): Rgb => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = '#000';
  if (value) probe.fillStyle = value;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
};

const rgba = ([r, g, b]: Rgb, alpha: number) => `rgba(${r}, ${g}, ${b}, ${alpha})`;

const createNode = (width: number, height: number): NetworkNode => {
  const angle = Math.random() * Math.PI * 2;
  const speed = MAX_SPEED * (0.3 + Math.random() * 0.7);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
};

// Faint drifting nodes linked by proximity; nodes near the pointer reach out to it in the accent colour.
const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx || !probe) return undefined;

    const motionQuery = window.matchMedia(REDUCED_MOTION);
    let width = 0;
    let height = 0;
    let nodes: NetworkNode[] = [];
    let muted: Rgb = [128, 128, 128];
    let accent: Rgb = [128, 128, 128];
    let strength = 1;
    let pointer: { x: number; y: number } | null = null;
    let frameId: number | null = null;
    let lastTime = 0;
    let booted = false;

    const readColors = () => {
      muted = readToken(probe, '--color-network');
      accent = readToken(probe, '--color-signal');
      const value = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--network-strength'));
      strength = Number.isFinite(value) && value > 0 ? value : 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.floor(Math.min((width * height) / AREA_PER_NODE, MAX_NODES));
      nodes = nodes.slice(0, target);
      for (const node of nodes) {
        node.x = Math.min(node.x, width);
        node.y = Math.min(node.y, height);
      }
      while (nodes.length < target) nodes.push(createNode(width, height));
    };

    const step = (dt: number) => {
      for (const node of nodes) {
        node.x += node.vx * dt;
        node.y += node.vy * dt;
        if (node.x < 0 || node.x > width) {
          node.vx = -node.vx;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y < 0 || node.y > height) {
          node.vy = -node.vy;
          node.y = Math.max(0, Math.min(height, node.y));
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      // Away from the pointer the web is barely there; it strengthens around it.
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance >= LINK_DISTANCE) continue;
          const near = pointer
            ? 1 - Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) / REVEAL_DISTANCE
            : 0;
          const reveal = Math.max(IDLE_WEB, near);
          const alpha = (1 - distance / LINK_DISTANCE) * LINK_ALPHA * strength * reveal;
          ctx.strokeStyle = rgba(muted, Math.min(1, alpha));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const reach = pointer
          ? 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / POINTER_DISTANCE
          : 0;

        if (pointer && reach > 0) {
          ctx.strokeStyle = rgba(accent, Math.min(1, reach * 0.6 * strength));
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        ctx.fillStyle = reach > 0 ? rgba(accent, 0.45 + reach * 0.55) : rgba(muted, Math.min(1, 0.55 * strength));
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, MAX_DT) : 0;
      lastTime = time;
      step(dt);
      draw();
      frameId = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      lastTime = 0;
    };

    const start = () => {
      if (frameId !== null || document.hidden || motionQuery.matches) return;
      frameId = window.requestAnimationFrame(tick);
    };

    // Reduced motion and hidden tabs get a still frame; everything else runs the loop.
    const sync = () => {
      if (!booted) return;
      if (motionQuery.matches || document.hidden) {
        stop();
        draw();
      } else {
        start();
      }
    };

    const handleResize = () => {
      resize();
      if (frameId === null) draw();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      // With the loop paused (reduced motion), the still frame still answers the cursor.
      if (frameId === null) draw();
    };

    const clearPointer = () => {
      pointer = null;
    };

    // Touch has no hover: let go of the finger and the network lets go too.
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') clearPointer();
    };

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (frameId === null) draw();
    });

    // Wait for an idle moment so the canvas never competes with first paint or hydration.
    const boot = () => {
      booted = true;
      readColors();
      resize();
      sync();
    };
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    const bootId = hasIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 2000 })
      : window.setTimeout(boot, 600);

    const root = document.documentElement;
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', clearPointer, { passive: true });
    root.addEventListener('pointerleave', clearPointer);
    document.addEventListener('visibilitychange', sync);
    motionQuery.addEventListener('change', sync);

    return () => {
      if (hasIdleCallback) window.cancelIdleCallback(bootId);
      else window.clearTimeout(bootId);
      stop();
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', clearPointer);
      root.removeEventListener('pointerleave', clearPointer);
      document.removeEventListener('visibilitychange', sync);
      motionQuery.removeEventListener('change', sync);
    };
  }, []);

  return (
    <div className="network-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="network-bg__canvas" />
    </div>
  );
};

export default NetworkBackground;
