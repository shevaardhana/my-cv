import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { fadeInUp, staggerContainer } from '../../utils/animationVariants';
import { useLanguage } from '../../contexts/LanguageContext';
import { achievementsData } from '../../data/portfolio';

function AchievementsSection() {
  const { language, t } = useLanguage();
  const achievements = achievementsData[language];
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  const container = reducedMotion ? { hidden: {}, visible: {} } : staggerContainer;
  const item = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;

  return (
    <section id="achievements" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={item}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My Key <span className="text-orange-500">Achievements</span>
          </h2>
          <p className="mt-3 text-gray-600">{t('achievements.subtitle')}</p>
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
              className="rounded-xl bg-white border border-gray-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-200 will-change-transform shadow-md"
            >
              <h3 className="text-base font-semibold text-orange-500 mb-4 leading-snug">
                {achievement.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {achievement.impacts.map((impact) => (
                  <li key={impact} className="flex items-start gap-2 text-gray-700 text-sm">
                    <FiCheckCircle className="text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
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
