import "server-only";

function parsePositiveInt(
  value: string | undefined,
  fallback: number
): number {
  if (!value?.trim()) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

/**
 * Login rate-limit configuration (env-overridable).
 */
export function getLoginRateLimitConfig() {
  return {
    maxAttempts: parsePositiveInt(process.env.MAX_LOGIN_ATTEMPTS, 5),
    /** Sliding/fixed window for counting failures. */
    windowMinutes: parsePositiveInt(process.env.LOGIN_WINDOW_MINUTES, 15),
    /** How long an IP stays blocked after exceeding the limit. */
    blockDurationMinutes: parsePositiveInt(
      process.env.LOGIN_BLOCK_DURATION,
      15
    ),
  } as const;
}

export function isUpstashConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL?.trim() &&
      process.env.UPSTASH_REDIS_REST_TOKEN?.trim()
  );
}

export const LOGIN_RATE_LIMIT_MESSAGE =
  "Too many failed login attempts. Please try again in a few minutes.";
