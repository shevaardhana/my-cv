import { motion } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const navLinks = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  const reducedMotion = useReducedMotion();

  const fadeIn = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <footer className="bg-gray-950 border-t border-white/10 py-10 px-4">
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
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-white/10" />

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Sheva Ardhana. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
