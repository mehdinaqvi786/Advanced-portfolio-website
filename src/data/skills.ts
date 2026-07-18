import type { Skill, SkillCategory } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "HTML", category: "frontend", level: 5 },
  { name: "CSS", category: "frontend", level: 5 },
  { name: "JavaScript", category: "frontend", level: 5 },
  { name: "TypeScript", category: "frontend", level: 4 },
  { name: "React", category: "frontend", level: 5 },
  { name: "Next.js", category: "frontend", level: 4 },
  { name: "Tailwind CSS", category: "frontend", level: 5 },
  // Backend
  { name: "Node.js", category: "backend", level: 4 },
  { name: "Express.js", category: "backend", level: 4 },
  { name: "REST APIs", category: "backend", level: 4 },
  // Database
  { name: "MongoDB", category: "database", level: 4 },
  { name: "Supabase", category: "database", level: 3 },
  { name: "Prisma", category: "database", level: 3 },
  // Mobile
  { name: "React Native", category: "mobile", level: 3 },
  // Tools
  { name: "Git", category: "tools", level: 4 },
  { name: "GitHub", category: "tools", level: 4 },
  { name: "Vercel", category: "tools", level: 4 },
  // Other
  { name: "Machine Learning", category: "other", level: 2 },
  { name: "Selenium", category: "other", level: 2 },
];

export const skillCategories: {
  id: SkillCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces, interaction design, and modern React architecture.",
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs, services, and server-side application logic.",
  },
  {
    id: "database",
    label: "Database",
    description: "Data modeling, persistence, and query-friendly schemas.",
  },
  {
    id: "mobile",
    label: "Mobile",
    description: "Cross-platform mobile experiences with React Native.",
  },
  {
    id: "tools",
    label: "Tools",
    description: "Version control, delivery, and production workflows.",
  },
  {
    id: "other",
    label: "Other Technologies",
    description: "Experimentation across ML and automation tooling.",
  },
];

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category);
}
