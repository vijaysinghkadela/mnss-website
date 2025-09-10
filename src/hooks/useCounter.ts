import { useState, useRef, useEffect } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
}: UseCounterOptions) {
  const [count, setCount] = useState<number>(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<number | null>(null);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const startAnimation = () => {
    if (isAnimating) return;
    if (hasFinishedRef.current) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const difference = end - start;

    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + difference * easeOutQuart);

      setCount(current);

      if (progress >= 1) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setCount(end); // ensure final exact value
        setIsAnimating(false);
        hasFinishedRef.current = true;
      }
    }, 16); // ~60fps
  };

  return {
    count,
    startAnimation,
    isAnimating,
  };
}
