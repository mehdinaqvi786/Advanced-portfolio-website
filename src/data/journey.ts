export const JOURNEY_MILESTONES = [
  {
    id: "started-se",
    year: "2022",
    title: "Started Software Engineering",
    description:
      "Began BS Software Engineering at University of Central Punjab and built a foundation in computing fundamentals.",
    icon: "flag",
  },
  {
    id: "learned-mern",
    year: "2023",
    title: "Learned MERN Stack",
    description:
      "Dove deep into MongoDB, Express, React, and Node — turning classroom concepts into full-stack applications.",
    icon: "layers",
  },
  {
    id: "built-projects",
    year: "2024",
    title: "Built Real World Projects",
    description:
      "Shipped portfolio products across AI, business sites, networking platforms, and mobile experiences.",
    icon: "rocket",
  },
  {
    id: "internship",
    year: "2026",
    title: "Started Professional Internship",
    description:
      "Joined Dafi Labs as a MERN Stack Intern to grow through production systems and collaboration.",
    icon: "briefcase",
  },
] as const;

export type JourneyMilestone = (typeof JOURNEY_MILESTONES)[number];
