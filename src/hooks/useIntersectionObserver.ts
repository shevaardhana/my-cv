import { type RefObject, useEffect, useState } from 'react';

/**
 * Wrapper Intersection Observer untuk trigger animasi.
 * Returns true ketika elemen masuk ke viewport.
 * Requirements: 8.1
 */
function useIntersectionObserver(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Fallback: jika browser tidak mendukung IntersectionObserver, tampilkan langsung
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Unobserve setelah terlihat agar animasi hanya dipicu sekali
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isVisible;
}

export default useIntersectionObserver;
