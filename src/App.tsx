import useScrollSpy from './hooks/useScrollSpy';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import AchievementsSection from './components/AchievementsSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import {
  heroData,
  aboutData,
  skillsData,
  experienceData,
  projectsData,
  contactInfo,
  achievementsData,
} from './data/portfolio';

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'achievements', 'projects', 'contact'];

function App() {
  const activeSection = useScrollSpy(SECTION_IDS, 80);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Navbar — Req 1.2, 1.3 */}
      <Navbar activeSection={activeSection} sections={SECTION_IDS} />

      {/* Main content — Req 1.1: all sections in one SPA page */}
      <main>
        {/* Hero — ParticleBackground lazy loaded inside HeroSection (Req 8.3) */}
        <HeroSection {...heroData} />

        <AboutSection {...aboutData} />

        <SkillsSection skills={skillsData} />

        <ExperienceSection experiences={experienceData} />

        <AchievementsSection achievements={achievementsData} />

        <ProjectsSection projects={projectsData} />

        <ContactSection contactInfo={contactInfo} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
