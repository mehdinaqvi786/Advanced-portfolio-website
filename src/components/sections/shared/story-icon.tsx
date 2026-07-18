import {
  BriefcaseBusiness,
  Code2,
  Flag,
  GraduationCap,
  Layers3,
  Puzzle,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  graduation: GraduationCap,
  code: Code2,
  spark: Sparkles,
  briefcase: BriefcaseBusiness,
  puzzle: Puzzle,
  zap: Zap,
  flag: Flag,
  layers: Layers3,
  rocket: Rocket,
} as const;

export type StoryIconName = keyof typeof iconMap;

type StoryIconProps = {
  name: StoryIconName;
  className?: string;
};

export function StoryIcon({ name, className }: StoryIconProps) {
  const Icon = iconMap[name];
  return <Icon className={cn("size-5", className)} aria-hidden />;
}
