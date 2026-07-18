/**
 * Safe internal admin redirects — blocks open-redirect abuse.
 */
export function getSafeAdminPath(
  value: unknown,
  fallback = "/admin/dashboard"
): string {
  if (typeof value !== "string") return fallback;

  const path = value.trim();
  if (!path.startsWith("/admin")) return fallback;
  if (path.startsWith("//")) return fallback;
  if (path.includes("://") || path.includes("\\")) return fallback;

  return path;
}

export type AuthToastKey = "login" | "logout" | "session" | "unauthorized";

const AUTH_TOAST_MESSAGES: Record<
  AuthToastKey,
  { type: "success" | "error"; message: string }
> = {
  login: { type: "success", message: "Login successful." },
  logout: {
    type: "success",
    message: "You have been logged out successfully.",
  },
  session: {
    type: "error",
    message: "Your session has expired. Please sign in again.",
  },
  unauthorized: {
    type: "error",
    message: "You do not have access to the admin area.",
  },
};

export function isAuthToastKey(value: unknown): value is AuthToastKey {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(AUTH_TOAST_MESSAGES, value)
  );
}

export function getAuthToast(key: AuthToastKey) {
  return AUTH_TOAST_MESSAGES[key];
}

/** Build a login URL with optional next path + toast key. */
export function buildLoginUrl(options?: {
  next?: string;
  toast?: AuthToastKey;
}): string {
  const params = new URLSearchParams();
  if (options?.next) {
    params.set("next", getSafeAdminPath(options.next));
  }
  if (options?.toast) {
    params.set("toast", options.toast);
  }
  const query = params.toString();
  return query ? `/login?${query}` : "/login";
}

/** Append a toast query param to an admin destination. */
export function withAuthToast(path: string, toast: AuthToastKey): string {
  const safe = getSafeAdminPath(path);
  const url = new URL(safe, "http://local.invalid");
  url.searchParams.set("toast", toast);
  return `${url.pathname}${url.search}`;
}
