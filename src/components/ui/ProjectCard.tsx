import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '../../types/index';
import { fadeInUp } from '../../utils/animationVariants';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  reducedMotion?: boolean;
}

function ProjectCard({ project, reducedMotion = false }: ProjectCardProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  const cardVariants = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.article
      variants={cardVariants}
      className="relative flex flex-col rounded-xl bg-white border border-gray-200 overflow-hidden
                 hover:border-orange-300 hover:shadow-xl transition-all duration-200 shadow-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Project: ${project.name}`}
    >
      {/* Hover overlay with action links */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 z-10 flex items-center justify-center gap-4
                       bg-orange-500/80 backdrop-blur-sm"
          >
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium
                           text-orange-500 hover:bg-orange-50 transition-colors duration-200 shadow"
                aria-label={`View repository for ${project.name}`}
              >
                <FiGithub className="text-lg" aria-hidden="true" />
                {t('projects.viewCode')}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium
                           text-orange-500 hover:bg-orange-50 transition-colors duration-200 shadow"
                aria-label={`View live demo for ${project.name}`}
              >
                <FiExternalLink className="text-lg" aria-hidden="true" />
                {t('projects.viewDemo')}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category badge */}
        <span className="self-start rounded-full bg-orange-50 px-3 py-0.5 text-xs font-medium text-orange-500 border border-orange-200">
          {project.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug">{project.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 border border-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Inline links */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
                aria-label={`Repository for ${project.name}`}
              >
                <FiGithub aria-hidden="true" />
                Repo
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-orange-500 transition-colors duration-200"
                aria-label={`Demo for ${project.name}`}
              >
                <FiExternalLink aria-hidden="true" />
                Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default ProjectCard;
