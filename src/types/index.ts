export type ProjectCategory =
  | "ai"
  | "web"
  | "mobile"
  | "ml"
  | "business"
  | "social"
  | "education"
  | "productivity";

export type * from "@/types/contact";
export type * from "@/types/api";

export type SocialPlatform = "github" | "linkedin" | "email" | "phone";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  featured: boolean;
  category: ProjectCategory;
  priority: number;
  year?: number;
  status?: "live" | "wip" | "archived";
  features: string[];
  challenges: string[];
  learned: string[];
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "mobile"
  | "tools"
  | "other";

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: 1 | 2 | 3 | 4 | 5;
  relatedProjects?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  tech: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  highlights?: string[];
}

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
}
