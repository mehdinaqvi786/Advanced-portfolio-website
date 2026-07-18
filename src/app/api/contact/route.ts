import { Prisma } from "@/generated/prisma/client";

import { apiError, apiSuccess } from "@/lib/api/response";
import { isDatabaseConfigured } from "@/lib/prisma";
import { consumeContactRateLimit } from "@/lib/rate-limit";
import {
  isRecaptchaConfigured,
  RECAPTCHA_ACTIONS,
  recaptchaUserMessage,
  verifyRecaptchaToken,
} from "@/lib/recaptcha";
import { createContactMessage } from "@/server/contact/create-contact-message";
import { sendContactNotificationEmail } from "@/services/contact-email";
import { contactFormSchema } from "@/validators/contact";

export const runtime = "nodejs";

/**
 * POST /api/contact
 * Rate limit → captcha → honeypot → save → Resend notify
 */
export async function POST(request: Request) {
  try {
    const rateLimit = await consumeContactRateLimit(request.headers);
    if (!rateLimit.allowed) {
      return apiError(rateLimit.message, 429);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return apiError("Invalid request body.", 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return apiError("Invalid request body.", 400);
    }

    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "Validation failed.",
        400,
        parsed.error.flatten().fieldErrors
      );
    }

    const { name, email, subject, message, website, recaptchaToken } =
      parsed.data;

    // Honeypot: pretend success so bots do not learn the trap
    if (website && website.trim().length > 0) {
      return apiSuccess("Message Saved", { emailSent: true }, 201);
    }

    const recaptchaConfigured = isRecaptchaConfigured();

    if (recaptchaConfigured) {
      const captcha = await verifyRecaptchaToken(recaptchaToken, {
        action: RECAPTCHA_ACTIONS.contactSubmit,
      });

      if (!captcha.ok) {
        return apiError(recaptchaUserMessage(captcha.reason), 400);
      }
    } else if (process.env.NODE_ENV === "production") {
      console.warn(
        "[POST /api/contact] reCAPTCHA is not configured. Skipping verification."
      );
    }

    const isDbConfigured = isDatabaseConfigured();

    if (!isDbConfigured) {
      console.warn(
        "[POST /api/contact] DATABASE_URL is not configured. Skipping persistence."
      );
    }

    const submittedAt = new Date();

    // Persist first when a database is available.
    if (isDbConfigured) {
      await createContactMessage({ name, email, subject, message });
    }

    const emailResult = await sendContactNotificationEmail({
      name,
      email,
      subject,
      message,
      submittedAt,
    });

    const successMessage = isDbConfigured
      ? "Message Saved"
      : "Message received";

    if (!emailResult.sent) {
      return apiSuccess(
        `${successMessage}. Email notification could not be sent right now.`,
        { emailSent: false },
        201
      );
    }

    return apiSuccess(successMessage, { emailSent: true }, 201);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return apiError(
        "Unable to save your message. Please try again later.",
        503
      );
    }

    if (
      error instanceof Error &&
      error.message.includes("DATABASE_URL is not set")
    ) {
      return apiError(
        "Unable to save your message. Please try again later.",
        503
      );
    }

    console.error("[POST /api/contact]", error);
    return apiError("Unexpected server error.", 500);
  }
}
