export const ABOUT_CONTENT = {
  heading: "About Me",
  eyebrow: "Story",
  introduction: [
  "I am Mehdi Naqvi, a Software Engineering graduate passionate about building modern, scalable, and user-focused web applications.",
  "I specialize in the MERN Stack and enjoy developing full-stack applications, integrating AI solutions, and creating responsive, high-performance user experiences.",
  "I am continuously improving my skills by building real-world projects, exploring modern technologies, and delivering clean, maintainable, and impactful software solutions.",
],
  image: {
    src: "/images/profile/mehdi-profile.jpeg",
    alt: "Mehdi Naqvi — Software Engineering graduate and MERN Stack Developer",
  },
} as const;

export const ABOUT_HIGHLIGHTS = [
  {
    id: "graduate",
    title: "Software Engineering Graduate",
    description: "Strong foundations in architecture, systems, and product thinking.",
    icon: "graduation",
  },
  {
    id: "mern",
    title: "MERN Stack Developer",
    description: "Shipping full-stack experiences with React, Node, and MongoDB.",
    icon: "code",
  },
  {
    id: "open",
    title: "Open to Opportunities",
    description: "Ready for full-time Software Engineer roles and meaningful work.",
    icon: "spark",
  },
  {
    id: "intern",
    title: "Web developer internship at PNY Trainings",
    description: "Building production features and growing through real delivery.",
    icon: "briefcase",
  },
  {
    id: "solver",
    title: "Problem Solver",
    description: "Turning ambiguous ideas into clear, usable product outcomes.",
    icon: "puzzle",
  },
  {
    id: "learner",
    title: "Fast Learner",
    description: "Quick to adopt modern tools, patterns, and best practices.",
    icon: "zap",
  },
] as const;

export type AboutHighlight = (typeof ABOUT_HIGHLIGHTS)[number];
