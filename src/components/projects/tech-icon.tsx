import {
  Binary,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe2,
  Layers3,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube2,
  Wind,
} from "lucide-react";

import { cn } from "@/lib/utils";

const TECH_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Next.js": Globe2,
  React: Sparkles,
  TypeScript: FileCode2,
  JavaScript: Binary,
  "Tailwind CSS": Wind,
  "Node.js": Server,
  "Express.js": Terminal,
  Express: Terminal,
  MongoDB: Database,
  Supabase: Database,
  Prisma: Layers3,
  Git: GitBranch,
  GitHub: GitBranch,
  "React Native": Smartphone,
  "Machine Learning": BrainCircuit,
  Selenium: TestTube2,
  HTML: Code2,
  CSS: Code2,
  "REST APIs": Server,
  Vercel: Boxes,
  AI: BrainCircuit,
  Python: Binary,
  MERN: Boxes,
  "Data Analysis": BrainCircuit,
  "Mobile UI": Smartphone,
  "UI Design": Sparkles,
  "Responsive UI": Smartphone,
};

type TechIconProps = {
  name: string;
  className?: string;
};

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = TECH_ICON_MAP[name] ?? Code2;
  return <Icon className={cn("size-4", className)} aria-hidden />;
}
