import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Experience } from '../../types/index';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInUp } from '../../utils/animationVariants';
import TimelineItem from './TimelineItem';

interface ExperienceSectionProps {
  experiences: Experience[];
}

/**
 * Vertical timeline section with connecting line and staggered scroll-triggered entries.
 * Requirements: 5.1, 5.3, 5.5
 */
function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  // Scroll-driven line fill — Req 5.5
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const headingVariants = reducedMotion
    ? { hidden: {}, visible: {} }
    : fadeInUp;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Section heading */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headingVariants}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Pengalaman Kerja
        </h2>
        <p className="mt-3 text-gray-400">Perjalanan karir profesional saya</p>
      </motion.div>

      {/* Timeline container — Req 5.1, 5.3 */}
      <div className="relative">
        {/* Vertical connecting line — Req 5.3 */}
        <div
          className="absolute left-1/2 top-0 bottom-0 hidden md:block w-0.5 bg-white/10 -translate-x-1/2"
          aria-hidden="true"
        >
          {/* Animated fill overlay — Req 5.5 */}
          <motion.div
            ref={lineRef}
            className="absolute inset-x-0 top-0 bg-cyan-400/60 origin-top"
            style={
              reducedMotion
                ? { height: '100%' }
                : { scaleY: lineScaleY, height: '100%' }
            }
          />
        </div>

        {/* Entries — Req 5.4 staggered via individual intersection observers */}
        <div className="flex flex-col gap-10 md:gap-12">
          {experiences.map((exp, index) => (
            <TimelineItem key={`${exp.company}-${index}`} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
