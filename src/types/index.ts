export interface HeroData {
  name: string;
  roles: string[];
  description: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface AboutData {
  description: string;
  stats: { label: string; value: number; suffix?: string }[];
  imageUrl: string;
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'Frontend' | 'Backend' | 'Database';
  iconUrl: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  category: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  cvUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Achievement {
  title: string;
  impacts: string[];
}
