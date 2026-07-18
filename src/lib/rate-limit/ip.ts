import "server-only";

import { headers } from "next/headers";

/**
 * Resolve client IP from request headers (proxy-aware).
 * Prefers platform-trusted headers before X-Forwarded-For.
 */
export function resolveClientIp(headerStore: Headers): string {
  const cfIp = headerStore.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const vercelIp = headerStore.get("x-vercel-forwarded-for")?.trim();
  if (vercelIp) {
    const first = vercelIp.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = headerStore.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    // Rightmost hop is typically the proxy-appended client when the edge is trusted.
    const parts = forwarded.split(",").map((part) => part.trim()).filter(Boolean);
    const candidate = parts.at(-1) ?? parts[0];
    if (candidate) return candidate;
  }

  return "unknown";
}

/**
 * Best-effort client IP for rate limiting in Server Components / Actions.
 */
export async function getClientIp(): Promise<string> {
  try {
    return resolveClientIp(await headers());
  } catch (error) {
    console.error("[getClientIp]", error);
    return "unknown";
  }
}

/** Normalize IP for Redis/memory keys. */
export function rateLimitKeyForIp(ip: string, scope: string): string {
  const safe = ip.trim().toLowerCase().replace(/[^a-z0-9:._-]/g, "_");
  return `${scope}:${safe || "unknown"}`;
}
