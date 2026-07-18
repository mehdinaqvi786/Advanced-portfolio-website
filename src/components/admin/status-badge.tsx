import type { ContactStatus } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import {
  contactStatusClassName,
  formatContactStatus,
} from "@/utils/admin";

type StatusBadgeProps = {
  status: ContactStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(contactStatusClassName(status), className)}>
      {formatContactStatus(status)}
    </span>
  );
}
