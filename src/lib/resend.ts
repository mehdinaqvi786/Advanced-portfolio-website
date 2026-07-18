import "server-only";

import { Resend } from "resend";

/**
 * Singleton Resend client. API key stays server-side only.
 */
const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.");
  }

  if (!globalForResend.resend) {
    globalForResend.resend = new Resend(apiKey);
  }

  return globalForResend.resend;
}

export function getContactEmailConfig() {
  return {
    to: process.env.CONTACT_TO_EMAIL?.trim() || "ihashimaq@gmail.com",
    from:
      process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>",
  };
}
