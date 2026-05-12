import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../../data/portfolio';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { staggerContainer, fadeInUp } from '../../utils/animationVariants';
import ProjectCard from '../ui/ProjectCard';
import { useLanguage } from '../../contexts/LanguageContext';


function ProjectsSection() {
  const { language, t } = useLanguage();
  const projects = projectsData[language];
  const ALL_LABEL = t('projects.all');
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL_LABEL, ...unique];
  }, [projects, ALL_LABEL]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const filtered = useMemo(
    () =>
      activeCategory === ALL_LABEL
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [projects, activeCategory]
  );

  const headingVariants = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;
  const containerVariants = reducedMotion ? { hidden: {}, visible: {} } : staggerContainer;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
    >
      {/* Section heading */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headingVariants}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('projects.title')}</h2>
        <p className="mt-3 text-gray-600">{t('projects.subtitle')}</p>
      </motion.div>

      {/* Category filter */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headingVariants}
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter project categories"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors duration-200
              ${
                activeCategory === cat
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500'
              }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default ProjectsSection;
