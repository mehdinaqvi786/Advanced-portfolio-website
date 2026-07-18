import { Mail, Phone } from "lucide-react";

import type { SocialPlatform } from "@/types";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
};

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-4", className)}
    >
      <path d="M12 2C6.477 2 2 6.586 2 12.253c0 4.537 2.865 8.369 6.839 9.72.5.095.683-.222.683-.486 0-.24-.009-.875-.014-1.717-2.782.62-3.369-1.375-3.369-1.375-.455-1.177-1.11-1.49-1.11-1.49-.908-.638.069-.625.069-.625 1.004.072 1.532 1.055 1.532 1.055.892 1.563 2.341 1.112 2.91.85.092-.663.35-1.112.636-1.367-2.22-.259-4.555-1.138-4.555-5.066 0-1.119.39-2.034 1.029-2.752-.103-.26-.446-1.302.098-2.714 0 0 .84-.276 2.75 1.05A9.36 9.36 0 0 1 12 7.14c.85.004 1.705.117 2.504.343 1.909-1.326 2.747-1.05 2.747-1.05.546 1.412.203 2.454.1 2.714.64.718 1.028 1.633 1.028 2.752 0 3.939-2.339 4.804-4.566 5.058.359.317.679.943.679 1.901 0 1.371-.013 2.477-.013 2.814 0 .267.18.586.688.485A10.27 10.27 0 0 0 22 12.253C22 6.586 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-4", className)}
    >
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a1.986 1.986 0 1 1-.004-3.972 1.986 1.986 0 0 1 .004 3.972ZM7.119 20.452H3.552V9h3.567v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

const iconMap: Record<
  SocialPlatform,
  (props: IconProps) => React.ReactElement
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: ({ className }) => <Mail className={cn("size-4", className)} />,
  phone: ({ className }) => <Phone className={cn("size-4", className)} />,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = iconMap[platform];
  return <Icon className={className} />;
}
