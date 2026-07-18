import "server-only";

import { renderContactNotificationEmail } from "@/emails/contact-notification";
import {
  getContactEmailConfig,
  getResendClient,
  isResendConfigured,
} from "@/lib/resend";

export type SendContactNotificationInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt?: Date;
};

export type SendContactNotificationResult = {
  sent: boolean;
  /** Safe, non-sensitive reason for logs / optional client info */
  reason?: string;
};

/**
 * Sends admin notification email for a new contact submission.
 * Never throws to callers for delivery failures — returns { sent: false }.
 */
export async function sendContactNotificationEmail(
  input: SendContactNotificationInput
): Promise<SendContactNotificationResult> {
  if (!isResendConfigured()) {
    console.warn("[contact-email] RESEND_API_KEY missing — skipped email.");
    return { sent: false, reason: "Email service not configured." };
  }

  try {
    const { to, from } = getContactEmailConfig();
    const template = renderContactNotificationEmail(input);
    const resend = getResendClient();

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: input.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error("[contact-email] Resend API error:", error.message);
      return { sent: false, reason: "Email delivery failed." };
    }

    return { sent: true };
  } catch (error) {
    console.error(
      "[contact-email] Unexpected error:",
      error instanceof Error ? error.message : "unknown"
    );
    return { sent: false, reason: "Email delivery failed." };
  }
}
