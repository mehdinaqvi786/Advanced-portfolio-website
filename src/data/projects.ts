import type { Project, ProjectCategory } from "@/types";

/**
 * Projects source of truth — data-driven UI for home, /projects, and detail pages.
 * No project images by design; cards use glass + gradient composition.
 */
export const projects: Project[] = [
  {
    id: "1",
    slug: "curepath-ai",
    title: "AI-Based Healthcare Assistant",
    shortDescription:
      "Built an AI-powered healthcare platform using the MERN stack that delivers intelligent symptom analysis, disease prediction, and personalized healthcare recommendations.",
    fullDescription:
      "CurePath AI is an AI-powered healthcare platform built with the MERN stack that helps users analyze symptoms, predict potential diseases, and receive personalized health recommendations. It also provides medicine suggestions, connects users with nearby hospitals and doctors, and promotes preventive healthcare through intelligent, data-driven insights.",
    technologies: ["Node.js", "TypeScript", "Tailwind CSS", "AI", "MongoDb"],
    github: "https://github.com/mehdinaqvi786/curepath-ai/",
    featured: true,
    category: "ai",
    priority: 1,
    year: 2026,
    features: [
  "AI-powered symptom analysis and disease prediction",
  "Personalized healthcare recommendations and medicine suggestions",
  "Nearby hospital and doctor locator with responsive dashboard",
  "Secure authentication and modern MERN stack architecture",
],

challenges: [
  "Integrating AI predictions with accurate healthcare recommendations",
  "Managing secure medical data while maintaining application performance",
  "Designing an intuitive healthcare interface for users of all ages",
],

learned: [
  "Building and integrating AI-powered healthcare solutions with the MERN stack",
  "Developing scalable full-stack applications with secure authentication and APIs",
  "Creating user-centric healthcare experiences with responsive and maintainable architecture",
],
  },
  {
    id: "2",
    slug: "modern-gym-website",
    title: "Modern Gym Website",
   shortDescription:
  "AI-powered fitness platform with personalized workouts, nutrition guidance, and an intelligent virtual trainer.",

fullDescription:
  "GymAI is a modern fitness web application that helps users achieve their fitness goals through personalized workout plans, nutrition tracking, progress monitoring, and an AI-powered trainer bot that provides real-time guidance, exercise recommendations, and answers to fitness-related questions. The platform focuses on delivering an engaging, responsive, and user-friendly experience.",   
   technologies: ["React",  "Tailwind CSS", "Ai"],
    github: "https://github.com/mehdinaqvi786/react_project",
    //liveDemo: "https://react-project-coral-zeta.vercel.app/",
    featured: true,
    category: "social",
    priority: 2,
    year: 2025,
    features: [
  "AI-powered virtual trainer for personalized fitness guidance",
  "Custom workout plans with exercise tracking and progress monitoring",
  "Nutrition recommendations and calorie management",
  "Responsive dashboard with authentication and user profiles",
],

challenges: [
  "Integrating AI responses with personalized fitness recommendations",
  "Managing real-time workout and progress data efficiently",
  "Designing an engaging and responsive user experience across devices",
],

learned: [
  "Building AI-integrated fitness applications using the MERN stack",
  "Developing scalable full-stack solutions with secure authentication",
  "Creating intuitive, high-performance user interfaces focused on user engagement",
],
  },
  {
    id: "3",
    slug: "ai-video-summarizer",
    title: "Ai Video Summarizer",
    shortDescription:
  "AI-powered video summarization tool that converts long videos into concise, meaningful summaries.",
    fullDescription:
  "An intelligent video summarization application built with Python, Gradient AI, and OpenAI Whisper that transcribes uploaded videos, extracts key insights, and generates accurate, easy-to-read summaries. The project focuses on fast processing, offline speech-to-text capabilities, and an intuitive user experience for educational, professional, and content creation workflows.",
   technologies: ["Python", "OpenAI Whisper", "Gradient AI", "Gradio", "FFmpeg"],
    github: "https://github.com/mehdinaqvi786/Ai-Video-Summarizer",
    featured: true,
    category: "education",
    priority: 1,
    year: 2025,
    features: [
  "AI-powered video transcription using OpenAI Whisper",
  "Automatic video summarization with Gradient AI",
  "Support for multiple video formats with fast processing",
  "Simple and responsive interface for uploading and summarizing videos",
],

challenges: [
  "Handling large video files efficiently",
  "Optimizing transcription accuracy and summary quality",
  "Integrating AI models while maintaining performance",
],

learned: [
  "Building AI-powered applications with Python and Whisper",
  "Integrating speech-to-text and LLM-based summarization workflows",
  "Developing efficient video processing pipelines with a user-friendly interface",
],
  },

{
  id: "4",
  slug: "lovegram-platform",
  title: "LoveGram",
  shortDescription:
    "A modern AI-powered dating and matchmaking platform designed to help people discover meaningful connections through smart matching and interactive features.",

  fullDescription:
    "LoveGram is a full-stack social matchmaking platform built with Next.js, TypeScript, MongoDB, Clerk Authentication, Tailwind CSS, and modern web technologies. It provides a secure and engaging experience with user authentication, profile management, real-time messaging, AI-powered compatibility matching, and interactive features that help users build genuine connections.",

  technologies: [
    "Next.js",
    "TypeScript",
    "MongoDB",
    "Clerk",
    "Tailwind CSS",
    "Prisma",
    "Vercel"
  ],

  github: "https://github.com/mehdinaqvi786/lovegram-platform",

  liveDemo: "https://lovegram-platform.vercel.app",

  featured: true,
  category: "social",
  priority: 2,
  year: 2026,

  features: [
    "Secure authentication with Clerk",
    "AI-powered compatibility matching",
    "User profile creation and customization",
    "Real-time messaging system",
    "Passport and profile verification",
    "Smart recommendations based on user preferences",
    "Responsive design optimized for desktop and mobile",
    "Modern dashboard with account settings"
  ],

  challenges: [
    "Integrating Clerk authentication with MongoDB",
    "Managing secure environment variables and deployment",
    "Designing scalable database models for user relationships",
    "Building a responsive and interactive user experience"
  ],

  learned: [
    "Building production-ready applications with Next.js and TypeScript",
    "Deploying full-stack applications on Vercel",
    "Integrating MongoDB Atlas and Clerk Authentication",
    "Managing secure authentication and scalable backend architecture",
    "Implementing modern UI/UX with Tailwind CSS"
  ],
},  
  
];

export const PROJECT_CATEGORIES: {
  id: ProjectCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ml", label: "ML" },
  { id: "business", label: "Business" },
  { id: "social", label: "Social" },
  { id: "education", label: "Education" },
  { id: "productivity", label: "Productivity" },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => a.priority - b.priority);
}

export function getOtherProjects(): Project[] {
  return projects
    .filter((project) => !project.featured)
    .sort((a, b) => a.priority - b.priority);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous?: Project;
  next?: Project;
} {
  const ordered = [...projects].sort((a, b) => a.priority - b.priority);
  const index = ordered.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: ordered[index - 1],
    next: ordered[index + 1],
  };
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
