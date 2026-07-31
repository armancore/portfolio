import { Suspense, lazy, useEffect, useState } from 'react';

const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((module) => ({ default: module.Analytics }))
);
const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((module) => ({
    default: module.SpeedInsights,
  }))
);

const DeferredVercelTelemetry = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) return undefined;

    const hasIdleCallback =
      typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function';

    // Both branches are keyed by an opaque numeric handle, but requestIdleCallback
    // and setTimeout hand back ids from different pools -- so the canceller has to
    // be chosen alongside the scheduler, never mixed.
    const schedule = (callback: () => void): number =>
      hasIdleCallback ? window.requestIdleCallback(callback) : window.setTimeout(callback, 1800);
    const cancel = (id: number): void =>
      hasIdleCallback ? window.cancelIdleCallback(id) : window.clearTimeout(id);

    const taskId = schedule(() => setEnabled(true));
    return () => cancel(taskId);
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
};

export default DeferredVercelTelemetry;
