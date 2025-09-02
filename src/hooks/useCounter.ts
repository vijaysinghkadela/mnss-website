import { useEffect, useState } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  suffix?: string;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  suffix = "",
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const difference = end - start;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + difference * easeOutQuart);

      setCount(current);

      if (progress >= 1) {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  };

  return {
    count: count.toLocaleString() + suffix,
    startAnimation,
    isAnimating,
  };
}
