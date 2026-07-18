export const HERO_CONTENT = {
  greeting: "Hello, I'm",
  name: "Mehdi Naqvi",
  titles: ["MERN Stack Developer", "Software Engineer"] as const,
  tagline:
    "Turning ideas into modern web applications through clean code and creative solutions.",
  description:
    "I build scalable, responsive, and user-focused web applications using modern technologies like Next.js, React, Node.js, Express, MongoDB, Supabase, and TypeScript. Passionate about creating intuitive digital experiences with clean architecture and beautiful UI.",
  profileImage: {
    src: "/images/profile/mehdi-profile.jpeg",
    alt: "Mehdi Naqvi — Software Engineer and MERN Stack Developer",
  },
  resumeHref: "/resume/cv_mehdi.pdf",
} as const;

export const HERO_TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Supabase",
  "Prisma",
  "Tailwind CSS",
] as const;
