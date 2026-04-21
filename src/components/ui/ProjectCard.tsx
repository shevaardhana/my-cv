import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '../../types/index';
import { fadeInUp } from '../../utils/animationVariants';

interface ProjectCardProps {
  project: Project;
  reducedMotion?: boolean;
}

/**
 * Card proyek dengan hover overlay yang menampilkan tautan aksi.
 * Requirements: 6.2, 6.3
 */
function ProjectCard({ project, reducedMotion = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardVariants = reducedMotion ? { hidden: {}, visible: {} } : fadeInUp;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.article
      variants={cardVariants}
      className="relative flex flex-col rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden
                 hover:border-cyan-400/40 transition-colors duration-200"
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
                       bg-black/60 backdrop-blur-sm"
          >
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium
                           text-white border border-white/20 hover:bg-cyan-400/20 hover:border-cyan-400
                           transition-colors duration-200"
                aria-label={`View repository for ${project.name}`}
              >
                <FiGithub className="text-lg" aria-hidden="true" />
                Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-cyan-400/20 px-4 py-2 text-sm font-medium
                           text-cyan-400 border border-cyan-400/40 hover:bg-cyan-400/30 hover:border-cyan-400
                           transition-colors duration-200"
                aria-label={`View live demo for ${project.name}`}
              >
                <FiExternalLink className="text-lg" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category badge */}
        <span className="self-start rounded-full bg-cyan-400/10 px-3 py-0.5 text-xs font-medium text-cyan-400 border border-cyan-400/20">
          {project.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-white leading-snug">{project.name}</h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Inline links (visible without hover, hidden if both absent) */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="flex gap-3 pt-2 border-t border-white/10">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-200"
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
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors duration-200"
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
