import "server-only";

import {
  getLoginRateLimitConfig,
  isUpstashConfigured,
  LOGIN_RATE_LIMIT_MESSAGE,
} from "@/lib/rate-limit/config";
import { getClientIp, rateLimitKeyForIp } from "@/lib/rate-limit/ip";
import {
  type RateLimitRecord,
  withRateLimitStore,
} from "@/lib/rate-limit/store";

export type LoginRateLimitCheck =
  | { allowed: true; ip: string }
  | { allowed: false; ip: string; message: string };

function emptyRecord(now: number): RateLimitRecord {
  return {
    attempts: 0,
    windowStartedAt: now,
    blockedUntil: 0,
  };
}

function ttlSecondsFor(record: RateLimitRecord, now: number): number {
  const config = getLoginRateLimitConfig();
  const windowMs = config.windowMinutes * 60_000;

  const candidates = [
    record.windowStartedAt + windowMs - now,
    record.blockedUntil > now ? record.blockedUntil - now : 0,
  ].filter((ms) => ms > 0);

  const ms = candidates.length > 0 ? Math.max(...candidates) : windowMs;
  return Math.max(1, Math.ceil(ms / 1000));
}

function strictUpstashInProduction(): boolean {
  return process.env.NODE_ENV === "production" && isUpstashConfigured();
}

/**
 * Check whether this IP may attempt login. Does not mutate counters.
 */
export async function checkLoginRateLimit(): Promise<LoginRateLimitCheck> {
  const ip = await getClientIp();
  const key = rateLimitKeyForIp(ip, "login:rl");
  const now = Date.now();

  try {
    const blocked = await withRateLimitStore(
      async (store) => {
        const record = await store.get(key);
        if (!record) return false;
        return record.blockedUntil > now;
      },
      { allowMemoryFallback: !strictUpstashInProduction() }
    );

    if (blocked) {
      return {
        allowed: false,
        ip,
        message: LOGIN_RATE_LIMIT_MESSAGE,
      };
    }

    return { allowed: true, ip };
  } catch (error) {
    console.error("[checkLoginRateLimit]", error);
    if (strictUpstashInProduction()) {
      return {
        allowed: false,
        ip,
        message: LOGIN_RATE_LIMIT_MESSAGE,
      };
    }
    return { allowed: true, ip };
  }
}

/**
 * Record a failed authentication attempt for the IP.
 * Blocks the IP after MAX_LOGIN_ATTEMPTS within the window.
 */
export async function recordFailedLoginAttempt(ip: string): Promise<void> {
  const key = rateLimitKeyForIp(ip, "login:rl");
  const config = getLoginRateLimitConfig();
  const now = Date.now();
  const windowMs = config.windowMinutes * 60_000;
  const blockMs = config.blockDurationMinutes * 60_000;

  try {
    await withRateLimitStore(
      async (store) => {
        let record = (await store.get(key)) ?? emptyRecord(now);

        if (record.blockedUntil > now) {
          await store.set(key, record, ttlSecondsFor(record, now));
          return;
        }

        if (now - record.windowStartedAt >= windowMs) {
          record = emptyRecord(now);
        }

        record.attempts += 1;

        if (record.attempts >= config.maxAttempts) {
          record.blockedUntil = now + blockMs;
        }

        await store.set(key, record, ttlSecondsFor(record, now));
      },
      { allowMemoryFallback: true }
    );
  } catch (error) {
    console.error("[recordFailedLoginAttempt]", error);
  }
}

/**
 * Clear failed attempts / block after a successful login.
 */
export async function resetLoginRateLimit(ip: string): Promise<void> {
  const key = rateLimitKeyForIp(ip, "login:rl");

  try {
    await withRateLimitStore(
      async (store) => {
        await store.del(key);
      },
      { allowMemoryFallback: true }
    );
  } catch (error) {
    console.error("[resetLoginRateLimit]", error);
  }
}

export { LOGIN_RATE_LIMIT_MESSAGE };
