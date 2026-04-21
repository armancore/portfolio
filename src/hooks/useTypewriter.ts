import { useEffect, useState } from 'react';

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
  const [displayed, setDisplayed] = useState(enabled ? '' : text);
  const [done, setDone] = useState(!enabled);

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
