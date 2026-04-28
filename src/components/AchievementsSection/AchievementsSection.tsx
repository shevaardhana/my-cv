import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import type { Achievement } from '../../types/index';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '../../utils/animationVariants';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  const container = reducedMotion ? { hidden: {}, visible: {} } : staggerContainer;
  const item = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;

  return (
    <section id="achievements" ref={sectionRef} className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={item}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            My Key <span className="text-cyan-400">Achievements</span>
          </h2>
          <p className="mt-3 text-gray-400">Dampak nyata dari sistem yang saya bangun</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.title}
              variants={item}
              className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-cyan-500/40 transition-colors will-change-transform"
            >
              <h3 className="text-base font-semibold text-cyan-400 mb-4 leading-snug">
                {achievement.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {achievement.impacts.map((impact) => (
                  <li key={impact} className="flex items-start gap-2 text-gray-300 text-sm">
                    <FiCheckCircle className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{impact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AchievementsSection;
