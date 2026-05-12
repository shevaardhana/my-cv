import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { staggerContainer, fadeInUp } from '../../utils/animationVariants';
import useReducedMotion from '../../hooks/useReducedMotion';
import { useLanguage } from '../../contexts/LanguageContext';
import { heroData } from '../../data/portfolio';

const ParticleBackground = lazy(() => import('./ParticleBackground'));

function HeroSection() {
  const { language, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  
  const currentHeroData = heroData[language];
  const typingSequence = currentHeroData.roles.flatMap((role) => [role, 2000] as [string, number]);

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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-gray-50"
    >
      {/* Decorative background — lazy loaded (Req 2.6, 8.3) */}
      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 mb-2 will-change-transform"
            >
              {t('hero.greeting')}
            </motion.p>

            {/* Typing roles */}
            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl font-mono text-orange-500 mb-4 h-8 will-change-transform"
            >
              {prefersReducedMotion ? (
                <span>{currentHeroData.roles[0]}</span>
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

            {/* Main Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 will-change-transform leading-tight"
            >
              YOUR EPIC
              <br />
              <span className="text-orange-500">DEVELOPER</span>
              <br />
              JOURNEY
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg max-w-lg mb-8 will-change-transform leading-relaxed"
            >
              {currentHeroData.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mb-12 will-change-transform"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 rounded-lg bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                {t('hero.cta')}
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 will-change-transform"
            >
              <a
                href={currentHeroData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
              >
                <FiGithub size={28} />
              </a>
              <a
                href={currentHeroData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
              >
                <FiLinkedin size={28} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image/Visual */}
          <motion.div
            className="relative z-10 lg:block hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Main Hero Visual */}
              <div className="relative w-full h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                
                {/* Code snippet overlay */}
                <div className="absolute top-6 left-6 right-6 bg-gray-900 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-green-400">
                    <div className="mb-1">const developer = {`{`}</div>
                    <div className="ml-4 text-blue-400">name: <span className="text-yellow-300">"{currentHeroData.name}"</span>,</div>
                    <div className="ml-4 text-blue-400">skills: <span className="text-purple-400">[</span></div>
                    {currentHeroData.roles.map((role, i) => (
                      <div key={i} className="ml-8 text-yellow-300">"{role}"{i < currentHeroData.roles.length - 1 ? ',' : ''}</div>
                    ))}
                    <div className="ml-4 text-purple-400">]</div>
                    <div>{`}`}</div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute bottom-6 right-6 bg-white rounded-lg p-3 shadow-lg">
                  <div className="text-orange-500 font-bold text-lg">4+</div>
                  <div className="text-gray-600 text-sm">Years Exp</div>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-sm font-semibold text-gray-900">13+ Projects</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-sm font-semibold text-gray-900">Fast & Scalable</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
