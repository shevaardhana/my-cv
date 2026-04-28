import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollSpy from '../../hooks/useScrollSpy';
import useReducedMotion from '../../hooks/useReducedMotion';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

interface NavbarProps {
  activeSection?: string;
  sections?: string[];
}

function Navbar({ activeSection: activeSectionProp, sections = SECTION_IDS }: NavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const scrollSpyActive = useScrollSpy(sections, 80);
  const activeSection = activeSectionProp ?? scrollSpyActive;

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll past hero to toggle solid background (Req 1.5)
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop (Req 1.6)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll to section (Req 1.3)
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -16, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.3, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      y: -8,
      height: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 0.2, ease: 'easeIn' as const },
    },
  };

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-accent font-mono font-bold text-lg tracking-tight hover:text-accent-light transition-colors duration-200 focus:outline-none"
          aria-label="Go to top"
        >
          &lt;SA /&gt;
        </button>

        {/* Desktop nav links (Req 1.2) */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {NAV_SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  className={[
                    'relative text-sm font-medium transition-colors duration-200 focus:outline-none',
                    'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:rounded-full',
                    'after:transition-all after:duration-200',
                    isActive
                      ? 'text-accent after:w-full after:bg-accent'
                      : 'text-gray-400 hover:text-gray-100 after:w-0 after:bg-accent hover:after:w-full',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Hamburger button — visible on mobile (Req 1.6) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={[
              'block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-200',
              menuOpen ? 'rotate-45 translate-y-[7px]' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-200',
              menuOpen ? 'opacity-0 scale-x-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-200',
              menuOpen ? '-rotate-45 -translate-y-[7px]' : '',
            ].join(' ')}
          />
        </button>
      </nav>

      {/* Mobile slide-down menu (Req 1.6, 1.7) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden overflow-hidden bg-gray-950/95 backdrop-blur-md border-b border-white/10"
          >
            <ul className="flex flex-col px-4 py-4 gap-1" role="list">
              {NAV_SECTIONS.map(({ id, label }) => {
                const isActive = activeSection === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => handleNavClick(id)}
                      className={[
                        'w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none',
                        isActive
                          ? 'text-accent bg-accent/10'
                          : 'text-gray-400 hover:text-gray-100 hover:bg-white/5',
                      ].join(' ')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
