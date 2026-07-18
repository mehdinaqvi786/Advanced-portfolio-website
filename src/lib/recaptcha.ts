import "server-only";

/**
 * Google reCAPTCHA v3 server verification.
 * Secret key never leaves the server.
 */

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/** Default v3 score threshold (0.0 = bot … 1.0 = human). */
export const RECAPTCHA_MIN_SCORE = 0.5;

export const RECAPTCHA_ACTIONS = {
  adminLogin: "admin_login",
  contactSubmit: "contact_submit",
} as const;

type GoogleSiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type RecaptchaVerification =
  | { ok: true; score: number }
  | {
      ok: false;
      reason:
        | "missing_token"
        | "not_configured"
        | "invalid_token"
        | "low_score"
        | "action_mismatch"
        | "api_error"
        | "network_error";
    };

export function isRecaptchaConfigured(): boolean {
  return Boolean(
    process.env.RECAPTCHA_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()
  );
}

/**
 * Verify a reCAPTCHA v3 token with Google.
 * In local development without keys, verification is skipped so login still works.
 */
export async function verifyRecaptchaToken(
  token: string | null | undefined,
  options?: {
    action?: string;
    minScore?: number;
    remoteIp?: string;
  }
): Promise<RecaptchaVerification> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  const minScore = options?.minScore ?? RECAPTCHA_MIN_SCORE;
  const expectedAction = options?.action;

  if (!secret) {
    if (process.env.NODE_ENV === "development") {
      return { ok: true, score: 1 };
    }
    return { ok: false, reason: "not_configured" };
  }

  const value = typeof token === "string" ? token.trim() : "";
  if (!value) {
    return { ok: false, reason: "missing_token" };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: value,
    });

    if (options?.remoteIp) {
      body.set("remoteip", options.remoteIp);
    }

    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[recaptcha] siteverify HTTP", response.status);
      return { ok: false, reason: "api_error" };
    }

    const data = (await response.json()) as GoogleSiteVerifyResponse;

    if (!data.success) {
      const codes = data["error-codes"] ?? [];
      console.error("[recaptcha] verification failed", codes);

      if (
        codes.includes("timeout-or-duplicate") ||
        codes.includes("invalid-input-response") ||
        codes.includes("missing-input-response")
      ) {
        return { ok: false, reason: "invalid_token" };
      }

      return { ok: false, reason: "invalid_token" };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      console.error("[recaptcha] action mismatch", {
        expected: expectedAction,
        received: data.action,
      });
      return { ok: false, reason: "action_mismatch" };
    }

    const score = typeof data.score === "number" ? data.score : 0;
    if (score < minScore) {
      console.error("[recaptcha] low score", score);
      return { ok: false, reason: "low_score" };
    }

    return { ok: true, score };
  } catch (error) {
    console.error("[recaptcha] network/api failure", error);
    return { ok: false, reason: "network_error" };
  }
}

/** Friendly message for login — never leaks Google error codes. */
export function recaptchaUserMessage(
  reason: Extract<RecaptchaVerification, { ok: false }>["reason"]
): string {
  switch (reason) {
    case "not_configured":
      return "Security verification is temporarily unavailable. Please try again later.";
    case "network_error":
    case "api_error":
      return "Security verification failed. Please try again.";
    case "missing_token":
    case "invalid_token":
    case "low_score":
    case "action_mismatch":
    default:
      return "Security verification failed. Please try again.";
  }
}
