"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { updateContactStatusAction } from "@/actions/contacts";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusSelector } from "@/components/admin/status-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ContactStatus } from "@/generated/prisma/client";
import type { AdminContact } from "@/server/admin/contacts";
import { formatAdminDateTime } from "@/utils/admin";

type ContactDialogProps = {
  contact: AdminContact | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdated: (id: string, status: ContactStatus) => void;
};

export function ContactDialog({
  contact,
  open,
  onOpenChange,
  onStatusUpdated,
}: ContactDialogProps) {
  const [status, setStatus] = useState<ContactStatus>("Pending");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (contact) {
      setStatus(contact.status);
    }
  }, [contact]);

  if (!contact) return null;

  function handleStatusChange(next: ContactStatus) {
    if (!contact || next === contact.status) {
      setStatus(next);
      return;
    }

    const previous = contact.status;
    setStatus(next);
    onStatusUpdated(contact.id, next);

    startTransition(async () => {
      const result = await updateContactStatusAction({
        id: contact.id,
        status: next,
      });

      if (!result.ok) {
        setStatus(previous);
        onStatusUpdated(contact.id, previous);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="contact-dialog-description">
        <DialogHeader>
          <DialogTitle>Contact details</DialogTitle>
          <DialogDescription id="contact-dialog-description">
            Full message and status for this portfolio inquiry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 overflow-y-auto px-5 py-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Full name
              </dt>
              <dd className="font-medium text-foreground">{contact.name}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Email
              </dt>
              <dd>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Subject
              </dt>
              <dd className="font-medium text-foreground">{contact.subject}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Submission date
              </dt>
              <dd className="text-foreground">
                <time dateTime={contact.createdAt}>
                  {formatAdminDateTime(contact.createdAt)}
                </time>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Current status
              </dt>
              <dd className="flex items-center gap-2">
                <StatusBadge status={status} />
                {isPending ? (
                  <Loader2
                    className="size-3.5 animate-spin text-muted-foreground"
                    aria-label="Updating status"
                  />
                ) : null}
              </dd>
            </div>
          </dl>

          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Complete message
            </p>
            <div className="max-h-48 overflow-y-auto rounded-xl border border-border/50 bg-muted/20 p-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
              {contact.message}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contact-status"
              className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
            >
              Update status
            </label>
            <StatusSelector
              id="contact-status"
              value={status}
              onChange={handleStatusChange}
              disabled={isPending}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
