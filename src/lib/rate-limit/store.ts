import "server-only";

import { Redis } from "@upstash/redis";

import { isUpstashConfigured } from "@/lib/rate-limit/config";

export type RateLimitRecord = {
  /** Failed attempts in the current window. */
  attempts: number;
  /** Unix ms when the attempt window started. */
  windowStartedAt: number;
  /** Unix ms until which the action is blocked (0 = not blocked). */
  blockedUntil: number;
};

export type RateLimitStore = {
  get(key: string): Promise<RateLimitRecord | null>;
  set(key: string, value: RateLimitRecord, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
};

const memory = new Map<string, { value: RateLimitRecord; expiresAt: number }>();

function pruneExpiredMemory(now: number) {
  for (const [key, entry] of memory) {
    if (entry.expiresAt <= now) {
      memory.delete(key);
    }
  }
}

export const memoryRateLimitStore: RateLimitStore = {
  async get(key) {
    const now = Date.now();
    pruneExpiredMemory(now);
    const entry = memory.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= now) {
      memory.delete(key);
      return null;
    }
    return entry.value;
  },
  async set(key, value, ttlSeconds) {
    const now = Date.now();
    pruneExpiredMemory(now);
    memory.set(key, {
      value,
      expiresAt: now + Math.max(1, ttlSeconds) * 1000,
    });
  },
  async del(key) {
    memory.delete(key);
  },
};

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  if (!isUpstashConfigured()) return null;
  if (!redisClient) {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!.trim(),
      token: process.env.UPSTASH_REDIS_REST_TOKEN!.trim(),
    });
  }
  return redisClient;
}

export const upstashRateLimitStore: RateLimitStore = {
  async get(key) {
    const redis = getRedis();
    if (!redis) return null;
    const value = await redis.get<RateLimitRecord>(key);
    return value ?? null;
  },
  async set(key, value, ttlSeconds) {
    const redis = getRedis();
    if (!redis) return;
    await redis.set(key, value, { ex: Math.max(1, ttlSeconds) });
  },
  async del(key) {
    const redis = getRedis();
    if (!redis) return;
    await redis.del(key);
  },
};

type WithStoreOptions = {
  /**
   * When true (default), fall back to memory if Upstash fails / is unset.
   * Set false in production login checks so Redis outages fail closed.
   */
  allowMemoryFallback?: boolean;
};

/**
 * Prefer Upstash when configured; optionally fall back to in-memory.
 */
export async function withRateLimitStore<T>(
  operation: (store: RateLimitStore) => Promise<T>,
  options: WithStoreOptions = {}
): Promise<T> {
  const allowMemoryFallback = options.allowMemoryFallback !== false;

  if (isUpstashConfigured()) {
    try {
      return await operation(upstashRateLimitStore);
    } catch (error) {
      console.error("[rate-limit] Upstash error", error);
      if (!allowMemoryFallback) {
        throw error;
      }
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn(
      "[rate-limit] Upstash Redis is not configured. Using in-memory store (not shared across instances)."
    );
  }

  return operation(memoryRateLimitStore);
}
