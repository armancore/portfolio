import { useEffect, useLayoutEffect, useState } from 'react';

// useLayoutEffect warns when it runs during server rendering, where there is no
// layout to read. On the server the typed-out text is simply left in place.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseTypewriterArgs = {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
};

type UseTypewriterResult = {
  displayed: string;
  done: boolean;
};

const useTypewriter = ({
  text,
  speed = 38,
  delay = 0,
  enabled = true,
}: UseTypewriterArgs): UseTypewriterResult => {
  // Starts as the complete string even when the animation is enabled, so the
  // prerendered HTML carries the real sentence instead of an empty node and
  // the client's first render matches it. The layout effect below empties it
  // and starts typing before the browser paints, so nothing flashes.
  const [displayed, setDisplayed] = useState(text);
  const [done, setDone] = useState(!enabled);

  useIsomorphicLayoutEffect(() => {
    if (enabled) setDisplayed('');
  }, [enabled, text]);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return undefined;
    }

    setDisplayed('');
    setDone(false);

    let index = 0;
    let intervalId: number | null = null;

    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, delay, enabled]);

  return { displayed, done };
};

export default useTypewriter;
