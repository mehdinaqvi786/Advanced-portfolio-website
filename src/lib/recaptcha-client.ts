/**
 * Browser helpers for Google reCAPTCHA v3 (invisible).
 */

export const RECAPTCHA_LOGIN_ACTION = "admin_login";
export const RECAPTCHA_CONTACT_ACTION = "contact_submit";

const SCRIPT_ID = "google-recaptcha-v3";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

export function getRecaptchaSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  return key || undefined;
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("recaptcha_ssr"));
  }

  if (window.grecaptcha) {
    return Promise.resolve();
  }

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("recaptcha_script")),
        { once: true }
      );
      // Script may already be loaded.
      if (window.grecaptcha) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("recaptcha_script"));
    document.head.appendChild(script);
  });
}

/**
 * Generate an invisible reCAPTCHA v3 token for the given action.
 * Returns null when the site key is not configured (local/dev without keys).
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey) {
    return null;
  }

  await loadRecaptchaScript(siteKey);

  return new Promise((resolve, reject) => {
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) {
      reject(new Error("recaptcha_unavailable"));
      return;
    }

    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then((token) => resolve(token))
        .catch(() => reject(new Error("recaptcha_execute")));
    });
  });
}
