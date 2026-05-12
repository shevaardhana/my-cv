import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.skills': 'Keahlian',
    'nav.experience': 'Pengalaman',
    'nav.projects': 'Proyek',
    'nav.contact': 'Kontak',

    // Hero Section
    'hero.greeting': 'Halo, Saya Seorang',
    'hero.description': 'Fullstack Developer dengan 4 tahun pengalaman membangun aplikasi web modern yang scalable dan performant.',
    'hero.cta': 'Lihat Portfolio',
    'hero.contact': 'Hubungi Saya',

    // About Section
    'about.title': 'Tentang',
    'about.me': 'Saya',
    'about.description': 'Saya adalah seorang Fullstack Developer dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web end-to-end. Saya berpengalaman dalam teknologi frontend seperti ReactJS dan VueJS, serta backend seperti Laravel, Golang, dan ExpressJS.',
    'about.stats.experience': 'Tahun Pengalaman',
    'about.stats.projects': 'Proyek Selesai',
    'about.stats.technologies': 'Teknologi',

    // Skills Section
    'skills.title': 'Skills & Teknologi',
    'skills.subtitle': 'Teknologi yang saya kuasai',

    // Experience Section
    'experience.title': 'Pengalaman Kerja',
    'experience.subtitle': 'Perjalanan karir profesional saya',

    // Projects Section
    'projects.title': 'Proyek Terbaru',
    'projects.subtitle': 'Beberapa proyek yang telah saya kerjakan',
    'projects.viewCode': 'Lihat Kode',
    'projects.viewDemo': 'Lihat Demo',
    'projects.all': 'Semua',

    // Achievements
    'achievements.title': 'Pencapaian',
    'achievements.subtitle': 'Dampak nyata dari sistem yang saya bangun',

    // Contact Section
    'contact.title': 'Mari Berkolaborasi',
    'contact.subtitle': 'Hubungi saya untuk diskusi proyek atau peluang kerja sama',
    'contact.info': 'Info Kontak',
    'contact.social': 'Media Sosial',
    'contact.downloadCV': 'Unduh CV',
    'contact.sent': 'Pesan terkirim!',
    'contact.sentDesc': 'Terima kasih, saya akan segera menghubungi Anda.',
    'contact.sendAnother': 'Kirim pesan lain',
    'contact.form.name': 'Nama',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subjek',
    'contact.form.message': 'Pesan',
    'contact.form.send': 'Kirim Pesan',
    'contact.placeholder.name': 'Nama lengkap',
    'contact.placeholder.email': 'email@contoh.com',
    'contact.placeholder.subject': 'Subjek pesan',
    'contact.placeholder.message': 'Tulis pesan Anda...',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.greeting': 'Hello, I am a',
    'hero.description': 'Fullstack Developer with 4 years of experience building modern, scalable and performant web applications.',
    'hero.cta': 'View Portfolio',
    'hero.contact': 'Contact Me',

    // About Section
    'about.title': 'About',
    'about.me': 'Me',
    'about.description': 'I am a Fullstack Developer with more than 4 years of experience in building end-to-end web applications. I have experience in frontend technologies like ReactJS and VueJS, as well as backend technologies like Laravel, Golang, and ExpressJS.',
    'about.stats.experience': 'Years Experience',
    'about.stats.projects': 'Projects Completed',
    'about.stats.technologies': 'Technologies',

    // Skills Section
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Technologies I master',

    // Experience Section
    'experience.title': 'Work Experience',
    'experience.subtitle': 'My professional career journey',

    // Projects Section
    'projects.title': 'Latest Projects',
    'projects.subtitle': 'Some projects I have worked on',
    'projects.viewCode': 'View Code',
    'projects.viewDemo': 'View Demo',
    'projects.all': 'All',

    // Achievements
    'achievements.title': 'Achievements',
    'achievements.subtitle': 'Real impact from systems I built',

    // Contact Section
    'contact.title': "Let's Collaborate",
    'contact.subtitle': 'Contact me to discuss projects or collaboration opportunities',
    'contact.info': 'Contact Info',
    'contact.social': 'Social Media',
    'contact.downloadCV': 'Download CV',
    'contact.sent': 'Message sent!',
    'contact.sentDesc': 'Thank you, I will get back to you soon.',
    'contact.sendAnother': 'Send another message',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.placeholder.name': 'Full name',
    'contact.placeholder.email': 'email@example.com',
    'contact.placeholder.subject': 'Message subject',
    'contact.placeholder.message': 'Write your message...',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
