import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '../../types/index';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInLeft, fadeInRight } from '../../utils/animationVariants';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

function TimelineItem({ experience, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref as React.RefObject<Element>, { threshold: 0.15 });
  const reducedMotion = useReducedMotion();

  const isEven = index % 2 === 0;
  const slideVariant = reducedMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : isEven
    ? fadeInLeft
    : fadeInRight;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'} md:w-[calc(50%-1.5rem)] ${
        isEven ? 'md:self-start md:mr-auto' : 'md:self-end md:ml-auto'
      }`}
    >
      {/* Dot on the timeline */}
      <div
        className="absolute top-5 hidden md:block w-4 h-4 rounded-full bg-orange-400 border-2 border-white z-10 shadow-md"
        style={{ [isEven ? 'right' : 'left']: '-2.25rem', transform: 'translateX(50%)' }}
        aria-hidden="true"
      />

      {/* Card */}
      <motion.div
        variants={slideVariant}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="flex-1 rounded-xl bg-white border border-gray-200 p-5 hover:border-orange-300 hover:shadow-lg transition-all duration-200 will-change-transform shadow-md"
      >
        {/* Period badge */}
        <span className="inline-block text-xs font-mono text-orange-500 bg-orange-50 rounded-full px-3 py-0.5 mb-3 border border-orange-200">
          {experience.period}
        </span>

        {/* Position & Company */}
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {experience.position}
        </h3>
        <p className="text-sm text-orange-500 font-medium mb-3">{experience.company}</p>

        {/* Description list */}
        <ul className="space-y-1.5 list-none">
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default TimelineItem;
