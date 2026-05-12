import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiGo,
  SiExpress,
  SiNodedotjs,
  SiMysql,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import type { Skill } from '../../types/index';
import SkillBar from '../ui/SkillBar';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { staggerContainer, fadeInUp } from '../../utils/animationVariants';
import { useLanguage } from '../../contexts/LanguageContext';

interface SkillsProps {
  skills: Skill[];
}

const iconMap: Record<string, IconType> = {
  ReactJS: SiReact,
  VueJS: SiVuedotjs,
  Laravel: SiLaravel,
  Golang: SiGo,
  ExpressJS: SiExpress,
  NodeJS: SiNodedotjs,
  MySQL: SiMysql,
  SQL: SiMysql,
};

const categoryOrder: Skill['category'][] = ['Frontend', 'Backend', 'Database', 'Tools'];

function SkillCard({
  skill,
  triggered,
  reducedMotion,
}: {
  skill: Skill;
  triggered: boolean;
  reducedMotion: boolean;
}) {
  const Icon = iconMap[skill.name];

  const variants = reducedMotion
    ? { hidden: {}, visible: {} }
    : fadeInUp;

  const isEmoji = skill.iconUrl.length <= 2 && !/^https?:\/\//.test(skill.iconUrl);

  return (
    <motion.div
      variants={variants}
      className="flex flex-col gap-2 rounded-xl bg-white border border-gray-200 p-4 hover:border-orange-300 transition-colors shadow-md hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        {Icon ? (
          <Icon className="text-2xl text-orange-500 shrink-0" aria-hidden="true" />
        ) : isEmoji ? (
          <span className="text-2xl shrink-0" role="img" aria-label={skill.name}>
            {skill.iconUrl}
          </span>
        ) : (
          <img
            src={skill.iconUrl}
            alt={skill.name}
            className="w-6 h-6 shrink-0"
            loading="lazy"
          />
        )}
        <span className="text-sm font-semibold text-gray-900">{skill.name}</span>
      </div>
      <SkillBar
        name={skill.name}
        percentage={skill.percentage}
        triggered={triggered}
      />
    </motion.div>
  );
}

function SkillsSection({ skills }: SkillsProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  const grouped = categoryOrder.reduce<Record<Skill['category'], Skill[]>>(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    { Frontend: [], Backend: [], Database: [], Tools: [] }
  );

  const containerVariants = reducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainer;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section heading */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={reducedMotion ? { hidden: {}, visible: {} } : fadeInUp}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          {t('skills.title')}
        </h2>
        <p className="mt-3 text-gray-600">{t('skills.subtitle')}</p>
      </motion.div>

      {/* Categories */}
      <div className="flex flex-col gap-12">
        {categoryOrder.map((category) => {
          const categorySkills = grouped[category];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="mb-6 text-lg font-semibold text-orange-500 uppercase tracking-widest">
                {category}
              </h3>
              <motion.div
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {categorySkills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    triggered={isVisible}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

export default SkillsSection;
