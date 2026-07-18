"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";

import { FloatingField } from "@/components/sections/contact/floating-field";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonVariants } from "@/components/ui/button";
import {
  contactFormDefaults,
  contactFormSchema,
  type ContactFormValues,
} from "@/validators/contact";
import {
  executeRecaptcha,
  RECAPTCHA_CONTACT_ACTION,
} from "@/lib/recaptcha-client";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * Contact form — client UX + POST /api/contact (DB + Resend on server).
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(contactFormDefaults);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const submittingRef = useRef(false);

  const isBusy = isPending || submittingRef.current;

  const setField = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
    setServerMessage("");
    if (touched[key]) {
      validateField(key, { ...values, [key]: value });
    }
  };

  const validateField = (
    key: keyof ContactFormValues,
    nextValues: ContactFormValues = values
  ) => {
    const parsed = contactFormSchema.safeParse(nextValues);
    if (parsed.success) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      return true;
    }

    const issue = parsed.error.issues.find((item) => item.path[0] === key);
    setErrors((prev) => ({
      ...prev,
      [key]: issue?.message,
    }));
    return !issue;
  };

  const validateAll = () => {
    const parsed = contactFormSchema.safeParse(values);
    if (parsed.success) {
      setErrors({});
      return true;
    }

    const nextErrors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactFormValues;
      if (!nextErrors[key]) {
        nextErrors[key] = issue.message;
      }
    }
    setErrors(nextErrors);
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current || isPending) return;

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (!validateAll()) return;

    submittingRef.current = true;

    startTransition(async () => {
      try {
        let recaptchaToken = "";
        try {
          recaptchaToken = (await executeRecaptcha(RECAPTCHA_CONTACT_ACTION)) ?? "";
        } catch {
          setStatus("error");
          setServerMessage("Security verification failed. Please try again.");
          return;
        }

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, recaptchaToken }),
        });

        const payload = (await response.json().catch(() => null)) as {
          success?: boolean;
          message?: string;
          errors?: Record<string, string[] | undefined>;
        } | null;

        if (!response.ok || !payload?.success) {
          if (payload?.errors) {
            const nextErrors: FieldErrors = {};
            for (const [key, messages] of Object.entries(payload.errors)) {
              if (messages?.[0] && key in contactFormDefaults) {
                nextErrors[key as keyof ContactFormValues] = messages[0];
              }
            }
            if (Object.keys(nextErrors).length > 0) {
              setErrors(nextErrors);
            }
          }

          setStatus("error");
          setServerMessage(
            payload?.message ?? "Unable to send your message. Please try again."
          );
          return;
        }

        setStatus("success");
        setServerMessage(payload.message ?? "Message Saved");
        setValues(contactFormDefaults);
        setTouched({});
        setErrors({});
      } catch {
        setStatus("error");
        setServerMessage("Unable to send your message. Please try again.");
      } finally {
        submittingRef.current = false;
      }
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-busy={isBusy}
      aria-describedby={
        status === "success" || status === "error"
          ? "contact-form-status"
          : undefined
      }
    >
      <FloatingField
        name="name"
        label="Name"
        value={values.name}
        autoComplete="name"
        required
        disabled={isBusy}
        error={touched.name ? errors.name : undefined}
        onChange={(value) => setField("name", value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, name: true }));
          validateField("name");
        }}
      />

      <FloatingField
        name="email"
        label="Email"
        type="email"
        value={values.email}
        autoComplete="email"
        required
        disabled={isBusy}
        error={touched.email ? errors.email : undefined}
        onChange={(value) => setField("email", value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, email: true }));
          validateField("email");
        }}
      />

      <FloatingField
        name="subject"
        label="Subject"
        value={values.subject}
        autoComplete="off"
        required
        disabled={isBusy}
        error={touched.subject ? errors.subject : undefined}
        onChange={(value) => setField("subject", value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, subject: true }));
          validateField("subject");
        }}
      />

      <FloatingField
        name="message"
        label="Message"
        value={values.message}
        multiline
        rows={6}
        required
        disabled={isBusy}
        error={touched.message ? errors.message : undefined}
        onChange={(value) => setField("message", value)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, message: true }));
          validateField("message");
        }}
      />

      {/* Honeypot — hidden from users */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website ?? ""}
          onChange={(event) => setField("website", event.target.value)}
        />
      </div>

      <Magnetic strength={0.16} className="w-full sm:w-auto">
        <button
          type="submit"
          disabled={isBusy}
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-12 w-full gap-2 rounded-2xl px-6 sm:w-auto",
            "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
            "disabled:pointer-events-none disabled:opacity-70"
          )}
        >
          {isBusy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" aria-hidden />
            </>
          )}
        </button>
      </Magnetic>

      {status === "success" ? (
        <div
          id="contact-form-status"
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
        >
          <CheckCircle2
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden
          />
          <p>{serverMessage || "Message Saved"}</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div
          id="contact-form-status"
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-2xl border border-destructive/35 bg-destructive/10 px-4 py-3 text-sm text-foreground"
        >
          <XCircle
            className="mt-0.5 size-4 shrink-0 text-destructive"
            aria-hidden
          />
          <p>
            {serverMessage || "Unable to send your message. Please try again."}
          </p>
        </div>
      ) : null}

      {status === "idle" ? (
        <p className="text-xs text-muted-foreground">
          Your message is validated and stored securely when you submit.
        </p>
      ) : null}
    </form>
  );
}
