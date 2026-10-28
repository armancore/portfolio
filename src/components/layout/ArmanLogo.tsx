import React, { useLayoutEffect, useRef, useState } from 'react';
import useCollapseOnScroll from '../../hooks/useCollapseOnScroll';

type ArmanLogoProps = {
  name?: string;
  accentColor?: string;
  collapseAfter?: number;
};

type Widths = { open: number; rest: number; close: number };

// "ARMAN" folds to "<A/>" on scroll down and unfolds on scroll up or near the top.
const ArmanLogo = ({
  name = 'Arman',
  accentColor = 'var(--color-signal-mark)',
  collapseAfter = 40,
}: ArmanLogoProps) => {
  const collapsed = useCollapseOnScroll(collapseAfter);
  const openRef = useRef<HTMLSpanElement>(null);
  const restRef = useRef<HTMLSpanElement>(null);
  const closeRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<Widths | null>(null);

  // scrollWidth reports the full content width even while a part is clipped to 0.
  useLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      setWidths({
        open: openRef.current?.scrollWidth ?? 0,
        rest: restRef.current?.scrollWidth ?? 0,
        close: closeRef.current?.scrollWidth ?? 0,
      });
    };

    measure();
    document.fonts?.ready.then(measure);
    return () => {
      cancelled = true;
    };
  }, [name]);

  // Before measuring, the visible part stays at its natural width so SSR markup matches the first paint.
  const maxWidth = (visible: boolean, width: number | undefined) =>
    visible ? (width === undefined ? 'none' : `${width}px`) : '0px';

  return (
    <span
      role="img"
      aria-label={name}
      className="arman-logo"
      data-collapsed={collapsed || undefined}
      data-ready={widths ? true : undefined}
      style={{ '--logo-accent': accentColor } as React.CSSProperties}
    >
      <span
        ref={openRef}
        aria-hidden="true"
        className="arman-logo__part arman-logo__code"
        style={{ maxWidth: maxWidth(collapsed, widths?.open) }}
      >
        {'<'}
      </span>
      <span aria-hidden="true" className="arman-logo__initial">
        {name.charAt(0)}
      </span>
      <span
        ref={restRef}
        aria-hidden="true"
        className="arman-logo__part arman-logo__rest"
        style={{ maxWidth: maxWidth(!collapsed, widths?.rest) }}
      >
        {name.slice(1)}
      </span>
      <span
        ref={closeRef}
        aria-hidden="true"
        className="arman-logo__part arman-logo__code"
        style={{ maxWidth: maxWidth(collapsed, widths?.close) }}
      >
        {'/>'}
      </span>
    </span>
  );
};

export default ArmanLogo;
