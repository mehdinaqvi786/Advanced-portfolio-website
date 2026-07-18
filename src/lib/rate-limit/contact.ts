import "server-only";

import { resolveClientIp, rateLimitKeyForIp } from "@/lib/rate-limit/ip";
import {
  type RateLimitRecord,
  withRateLimitStore,
} from "@/lib/rate-limit/store";

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value?.trim()) return fallback;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function getContactRateLimitConfig() {
  return {
    maxAttempts: parsePositiveInt(process.env.MAX_CONTACT_ATTEMPTS, 8),
    windowMinutes: parsePositiveInt(process.env.CONTACT_WINDOW_MINUTES, 10),
    blockDurationMinutes: parsePositiveInt(
      process.env.CONTACT_BLOCK_DURATION,
      30
    ),
  } as const;
}

export const CONTACT_RATE_LIMIT_MESSAGE =
  "Too many messages sent. Please try again in a few minutes.";

function emptyRecord(now: number): RateLimitRecord {
  return {
    attempts: 0,
    windowStartedAt: now,
    blockedUntil: 0,
  };
}

function ttlSecondsFor(
  record: RateLimitRecord,
  now: number,
  windowMinutes: number
): number {
  const windowMs = windowMinutes * 60_000;
  const candidates = [
    record.windowStartedAt + windowMs - now,
    record.blockedUntil > now ? record.blockedUntil - now : 0,
  ].filter((ms) => ms > 0);
  const ms = candidates.length > 0 ? Math.max(...candidates) : windowMs;
  return Math.max(1, Math.ceil(ms / 1000));
}

export type ContactRateLimitCheck =
  | { allowed: true; ip: string }
  | { allowed: false; ip: string; message: string };

/**
 * Check + consume one contact submission attempt for the IP.
 */
export async function consumeContactRateLimit(
  headerStore: Headers
): Promise<ContactRateLimitCheck> {
  const ip = resolveClientIp(headerStore);
  const key = rateLimitKeyForIp(ip, "contact:rl");
  const config = getContactRateLimitConfig();
  const now = Date.now();
  const windowMs = config.windowMinutes * 60_000;
  const blockMs = config.blockDurationMinutes * 60_000;

  try {
    return await withRateLimitStore(async (store) => {
      let record = (await store.get(key)) ?? emptyRecord(now);

      if (record.blockedUntil > now) {
        await store.set(
          key,
          record,
          ttlSecondsFor(record, now, config.windowMinutes)
        );
        return {
          allowed: false as const,
          ip,
          message: CONTACT_RATE_LIMIT_MESSAGE,
        };
      }

      if (now - record.windowStartedAt >= windowMs) {
        record = emptyRecord(now);
      }

      record.attempts += 1;

      if (record.attempts > config.maxAttempts) {
        record.blockedUntil = now + blockMs;
        await store.set(
          key,
          record,
          ttlSecondsFor(record, now, config.windowMinutes)
        );
        return {
          allowed: false as const,
          ip,
          message: CONTACT_RATE_LIMIT_MESSAGE,
        };
      }

      await store.set(
        key,
        record,
        ttlSecondsFor(record, now, config.windowMinutes)
      );

      return { allowed: true as const, ip };
    });
  } catch (error) {
    console.error("[consumeContactRateLimit]", error);
    // Fail open for public contact form availability.
    return { allowed: true, ip };
  }
}
