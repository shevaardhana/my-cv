import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInUp } from '../../utils/animationVariants';
import TimelineItem from './TimelineItem';
import { useLanguage } from '../../contexts/LanguageContext';
import { experienceData } from '../../data/portfolio';

function ExperienceSection() {
  const { language, t } = useLanguage();
  const experiences = experienceData[language];
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const headingVariants = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headingVariants}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t('experience.title')}
        </h2>
        <p className="mt-3 text-gray-600">{t('experience.subtitle')}</p>
      </motion.div>

      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 hidden md:block w-0.5 bg-gray-200 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            ref={lineRef}
            className="absolute inset-x-0 top-0 bg-orange-400/60 origin-top"
            style={reducedMotion ? { height: '100%' } : { scaleY: lineScaleY, height: '100%' }}
          />
        </div>

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
