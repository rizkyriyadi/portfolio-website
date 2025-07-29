// Types for portfolio data structures

export interface Skill {
  name: string;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured?: boolean;
  images?: string[];
}

// Constants for reusable strings
export const PORTFOLIO_CONSTANTS = {
  SECTIONS: {
    HOME: 'home',
    ABOUT: 'about',
    EXPERIENCE: 'experience',
    PROJECTS: 'projects',
    CONTACT: 'contact',
  },
  SOCIAL_LINKS: {
    GITHUB: 'https://github.com/rizkyriyadi',
    LINKEDIN: 'https://linkedin.com/in/rizkyriyadi',
    EMAIL: 'mailto:rizky@example.com',
  },
  ANIMATION_DELAYS: {
    INITIAL: 0.2,
    STAGGER: 0.1,
    SECTION: 0.3,
  },
} as const;

export type SectionId = typeof PORTFOLIO_CONSTANTS.SECTIONS[keyof typeof PORTFOLIO_CONSTANTS.SECTIONS];