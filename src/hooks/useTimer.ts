'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseTimerOptions {
  duration: number;
  onTick?: (remaining: number) => void;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useTimer({ duration, onTick, onComplete, autoStart = false }: UseTimerOptions) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  onCompleteRef.current = onComplete;
  onTickRef.current = onTick;

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setRemaining(duration);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const newRemaining = Math.max(0, duration - elapsed);

      setRemaining(newRemaining);
      onTickRef.current?.(newRemaining);

      if (newRemaining <= 0) {
        stop();
        onCompleteRef.current?.();
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, duration, stop]);

  return { remaining, isRunning, start, stop };
}
