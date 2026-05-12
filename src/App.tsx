import useScrollSpy from './hooks/useScrollSpy';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import AchievementsSection from './components/AchievementsSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import { skillsData } from './data/portfolio';

const SECTION_IDS = ['hero', 'about', 'skills', 'experience', 'achievements', 'projects', 'contact'];

function App() {
  const activeSection = useScrollSpy(SECTION_IDS, 80);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
        <Navbar activeSection={activeSection} sections={SECTION_IDS} />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection skills={skillsData} />
          <ExperienceSection />
          <AchievementsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
