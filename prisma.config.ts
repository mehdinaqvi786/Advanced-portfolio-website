import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma CLI config (migrate / introspect / generate).
 *
 * Prefer DIRECT_URL for migrations (bypasses pooler).
 * Fall back to DATABASE_URL so `prisma generate` succeeds on Vercel
 * even when only the pooled URL is present during install.
 *
 * Do NOT use env("DIRECT_URL") here — Prisma's env() helper throws when
 * the variable is unset, which breaks `postinstall` / generate on CI.
 */
const datasourceUrl =
  process.env.DIRECT_URL?.trim() ||
  process.env.DATABASE_URL?.trim() ||
  // Placeholder only for generate — never used to connect during `prisma generate`
  "postgresql://postgres:postgres@127.0.0.1:5432/postgres";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: datasourceUrl,
  },
});
