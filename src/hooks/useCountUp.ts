import { useEffect, useRef, useState } from 'react';

/**
 * Animasi count-up dari 0 ke target dalam duration ms.
 * Dipicu ketika trigger berubah menjadi true.
 * Requirements: 3.5
 */
function useCountUp(target: number, duration: number, trigger: boolean): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;

    // Reset ke 0 setiap kali trigger aktif
    setCount(0);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutQuad untuk animasi yang lebih natural
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * target);

      setCount(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [trigger, target, duration]);

  return count;
}

export default useCountUp;
