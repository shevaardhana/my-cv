import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight } from '../../utils/animationVariants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useCountUp from '../../hooks/useCountUp';
import useReducedMotion from '../../hooks/useReducedMotion';
import { useLanguage } from '../../contexts/LanguageContext';
import { aboutData } from '../../data/portfolio';

/** Sub-component: renders a single stat with count-up effect (Req 3.3, 3.5) */
function StatItem({
  label,
  value,
  suffix = '',
  trigger,
}: {
  label: string;
  value: number;
  suffix?: string;
  trigger: boolean;
}) {
  const count = useCountUp(value, 2000, trigger);
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-4xl font-bold text-orange-500">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-gray-600 mt-1 text-center">{label}</span>
    </div>
  );
}

/** Fallback avatar shown when imageUrl fails to load (Req 3.1) */
function FallbackAvatar() {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl"
      aria-label="Profile avatar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-24 h-24 text-gray-400"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function AboutSection() {
  const { language, t } = useLanguage();
  const currentAboutData = aboutData[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Trigger animations when section enters viewport (Req 3.4)
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.2 });

  const textVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : fadeInLeft;

  const imageVariants = prefersReducedMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : fadeInRight;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
          {t('about.title')} <span className="text-orange-500">{t('about.me')}</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text side — fade-in from left (Req 3.4) */}
          <motion.div
            className="flex-1 w-full"
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {/* Card with light theme */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8 will-change-transform shadow-lg">
              {/* Description — Req 3.2 */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-10">
                {currentAboutData.description}
              </p>

              {/* Stats — Req 3.3, 3.5 */}
              <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-8">
                {currentAboutData.stats.map((stat) => (
                  <StatItem
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    suffix={stat.suffix}
                    trigger={isVisible}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image side — fade-in from right (Req 3.1, 3.4) */}
          <motion.div
            className="flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-72 lg:h-72"
            variants={imageVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-orange-200 shadow-lg shadow-orange-100 will-change-transform">
              {imgError ? (
                <FallbackAvatar />
              ) : (
                <img
                  src={currentAboutData.imageUrl}
                  alt="Profile photo"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;