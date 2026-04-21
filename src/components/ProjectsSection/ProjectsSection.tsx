import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../types/index';
import { projectsData } from '../../data/portfolio';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useReducedMotion from '../../hooks/useReducedMotion';
import { staggerContainer, fadeInUp } from '../../utils/animationVariants';
import ProjectCard from '../ui/ProjectCard';

interface ProjectsProps {
  projects?: Project[];
}

const ALL_LABEL = 'Semua';

/**
 * Responsive project grid with category filter and staggered scroll-triggered animation.
 * Requirements: 6.1, 6.4, 6.5, 6.6
 */
function ProjectsSection({ projects = projectsData }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef as React.RefObject<Element>, { threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  // Derive unique categories — Req 6.5
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL_LABEL, ...unique];
  }, [projects]);

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
        <h2 className="text-3xl md:text-4xl font-bold text-white">Proyek</h2>
        <p className="mt-3 text-gray-400">Beberapa proyek yang telah saya kerjakan</p>
      </motion.div>

      {/* Category filter — Req 6.5, 6.6 */}
      <motion.div
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={headingVariants}
        className="mb-8 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter kategori proyek"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors duration-200
              ${
                activeCategory === cat
                  ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-cyan-400/40 hover:text-cyan-300'
              }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Project grid — Req 6.1, 6.4, 6.6 */}
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
