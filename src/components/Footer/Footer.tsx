import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';
import { useLanguage } from '../../contexts/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const fadeIn = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-10 px-4">
      <motion.div
        {...fadeIn}
        className="max-w-6xl mx-auto flex flex-col items-center gap-6"
      >
        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gray-300" />

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Sheva Ardhana. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
