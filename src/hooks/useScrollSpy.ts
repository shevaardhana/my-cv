import { useEffect, useState } from 'react';

/**
 * Mendeteksi section aktif berdasarkan posisi scroll.
 * Returns ID section yang paling dekat dengan atas viewport.
 * Requirements: 1.4
 */
function useScrollSpy(sectionIds: string[], offset: number = 0): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Cari section yang paling dekat dengan atas viewport
      let currentSection = sectionIds[0];
      let minDistance = Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const { top } = element.getBoundingClientRect();
        const absoluteTop = top + window.scrollY;
        const distance = Math.abs(absoluteTop - scrollPosition);

        // Pilih section yang offsetnya paling dekat dengan posisi scroll saat ini
        // dan sudah melewati atau tepat di posisi scroll
        if (absoluteTop <= scrollPosition + 1 && distance < minDistance) {
          minDistance = distance;
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    // Jalankan sekali saat mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}

export default useScrollSpy;
