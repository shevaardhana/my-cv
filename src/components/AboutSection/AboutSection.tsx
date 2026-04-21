import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInRight } from '../../utils/animationVariants';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useCountUp from '../../hooks/useCountUp';
import useReducedMotion from '../../hooks/useReducedMotion';
import type { AboutData } from '../../types/index';

type AboutProps = AboutData;

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
      <span className="text-2xl sm:text-4xl font-bold text-accent">
        {count}
        {suffix}
      </span>
      <span className="text-sm text-gray-400 mt-1 text-center">{label}</span>
    </div>
  );
}

/** Fallback avatar shown when imageUrl fails to load (Req 3.1) */
function FallbackAvatar() {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-800 rounded-2xl"
      aria-label="Profile avatar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-24 h-24 text-gray-500"
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

function AboutSection({ description, stats, imageUrl }: AboutProps) {
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
      className="py-20 bg-gray-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          Tentang <span className="text-accent">Saya</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text side — fade-in from left (Req 3.4) */}
          <motion.div
            className="flex-1 w-full"
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {/* Glassmorphism card */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8 will-change-transform">
              {/* Description — Req 3.2 */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
                {description}
              </p>

              {/* Stats — Req 3.3, 3.5 */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {stats.map((stat) => (
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
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-accent/30 shadow-lg shadow-accent/10 will-change-transform">
              {imgError ? (
                <FallbackAvatar />
              ) : (
                <img
                  src={imageUrl}
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
