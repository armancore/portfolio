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

    let taskId;
    const schedule =
      typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb) => setTimeout(cb, 1800);
    const cancel =
      typeof window !== 'undefined' && typeof window.cancelIdleCallback === 'function'
        ? window.cancelIdleCallback
        : clearTimeout;

    taskId = schedule(() => setEnabled(true));
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
