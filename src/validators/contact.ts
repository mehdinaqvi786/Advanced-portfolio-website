import { z } from "zod";

/**
 * Server + client contact validation contract.
 * Never trust client-only checks — API re-validates with this schema.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject must be under 120 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  /** Honeypot — bots fill this; humans leave it empty. Accepted then silently dropped. */
  website: z.string().max(200).optional().default(""),
  /** reCAPTCHA v3 token — verified server-side when keys are configured */
  recaptchaToken: z.string().optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormDefaults: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
  recaptchaToken: "",
};

/** Fields persisted to the database (excludes honeypot / captcha). */
export const contactPersistSchema = contactFormSchema.omit({
  website: true,
  recaptchaToken: true,
});

export type ContactPersistInput = z.infer<typeof contactPersistSchema>;
