import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { staggerContainer, fadeInUp } from '../../utils/animationVariants';
import useReducedMotion from '../../hooks/useReducedMotion';
import type { HeroData } from '../../types/index';

const ParticleBackground = lazy(() => import('./ParticleBackground'));

type HeroProps = HeroData;

function HeroSection({ name, roles, description, githubUrl, linkedinUrl }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  // Build typing sequence: role text, pause, repeat
  const typingSequence = roles.flatMap((role) => [role, 2000] as [string, number]);

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainer;

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeInUp;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950"
    >
      {/* Decorative background — lazy loaded (Req 2.6, 8.3) */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name — Req 2.1 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 will-change-transform"
        >
          {name}
        </motion.h1>

        {/* Typing effect — Req 2.2 */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl font-mono text-accent mb-6 h-10 will-change-transform"
        >
          {prefersReducedMotion ? (
            <span>{roles[0]}</span>
          ) : (
            <TypeAnimation
              sequence={typingSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          )}
        </motion.div>

        {/* Description — Req 2.3 */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 will-change-transform"
        >
          {description}
        </motion.p>

        {/* CTA Buttons — Req 2.4 */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 will-change-transform"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 rounded-lg bg-accent text-gray-950 font-semibold text-sm hover:bg-accent-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Lihat Proyek
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-3 rounded-lg border border-accent text-accent font-semibold text-sm hover:bg-accent/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Hubungi Saya
          </button>
        </motion.div>

        {/* Social links — Req 2.7 */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 will-change-transform"
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <FiGithub size={24} />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-gray-400 hover:text-accent transition-colors duration-200"
          >
            <FiLinkedin size={24} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
