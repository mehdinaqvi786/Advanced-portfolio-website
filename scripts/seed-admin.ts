/**
 * Seed the single Admin user into Supabase Auth + profiles table.
 *
 * Usage:
 *   npm run seed:admin
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY (validated for completeness)
 *   SUPABASE_SERVICE_ROLE_KEY
 *   ADMIN_EMAIL
 *   ADMIN_PASSWORD
 *   DATABASE_URL
 */

import "dotenv/config";

import { createClient } from "@supabase/supabase-js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { getAuthEnv } from "../src/lib/auth/env";

const ADMIN_NAME = "Hashim Qureshi";

function createScriptPrisma(): PrismaClient {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

type AuthAdminClient = {
  auth: {
    admin: {
      listUsers: (args: {
        page: number;
        perPage: number;
      }) => Promise<{
        data: { users: Array<{ id: string; email?: string | null }> };
        error: { message: string } | null;
      }>;
    };
  };
};

async function findAuthUserByEmail(admin: AuthAdminClient, email: string) {
  const normalized = email.toLowerCase();
  let page = 1;
  const perPage = 200;

  for (;;) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw new Error(`Failed to list auth users: ${error.message}`);
    }

    const match = data.users.find(
      (user) => user.email?.toLowerCase() === normalized
    );
    if (match) return match;

    if (data.users.length < perPage) return null;
    page += 1;
  }
}

async function seedAdmin() {
  console.log("\n[seed-admin] Starting admin seed...\n");

  const env = getAuthEnv();
  const prisma = createScriptPrisma();
  const supabaseAdmin = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const adminEmail = env.ADMIN_EMAIL.toLowerCase();

  try {
    const existingProfile = await prisma.profile.findFirst({
      where: {
        OR: [{ email: adminEmail }, { role: "ADMIN" }],
      },
    });

    if (existingProfile) {
      console.log("[seed-admin] Admin already exists — nothing to do.");
      console.log(`  Profile ID : ${existingProfile.id}`);
      console.log(`  Email      : ${existingProfile.email}`);
      console.log(`  Auth User  : ${existingProfile.authUserId}`);
      console.log(`  Role       : ${existingProfile.role}`);
      console.log("\n[seed-admin] Exiting safely.\n");
      return;
    }

    let authUserId: string;
    const existingAuthUser = await findAuthUserByEmail(
      supabaseAdmin,
      adminEmail
    );

    if (existingAuthUser) {
      authUserId = existingAuthUser.id;
      console.log(
        "[seed-admin] Auth user already exists — creating Profile only."
      );
      console.log(`  Auth User  : ${authUserId}`);
    } else {
      console.log("[seed-admin] Creating Supabase Auth user...");
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: env.ADMIN_PASSWORD,
        email_confirm: true,
        user_metadata: {
          name: ADMIN_NAME,
          role: "ADMIN",
        },
      });

      if (error || !data.user) {
        throw new Error(
          `Failed to create auth user: ${error?.message ?? "unknown error"}`
        );
      }

      authUserId = data.user.id;
      console.log("[seed-admin] Auth user created.");
      console.log(`  Auth User  : ${authUserId}`);
    }

    console.log("[seed-admin] Creating Profile record...");
    const profile = await prisma.profile.create({
      data: {
        authUserId,
        name: ADMIN_NAME,
        email: adminEmail,
        role: "ADMIN",
      },
    });

    console.log("\n[seed-admin] Admin seeded successfully.");
    console.log(`  Profile ID : ${profile.id}`);
    console.log(`  Name       : ${profile.name}`);
    console.log(`  Email      : ${profile.email}`);
    console.log(`  Role       : ${profile.role}`);
    console.log(`  Auth User  : ${profile.authUserId}`);
    console.log("\n[seed-admin] Done.\n");
  } catch (error) {
    console.error("\n[seed-admin] Failed.");
    if (error instanceof Error) {
      console.error(`  ${error.message}`);
    } else {
      console.error("  Unexpected error.", error);
    }
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
