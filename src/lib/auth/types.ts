import type { Role } from "@/generated/prisma/client";

export type AuthRole = Role;

export type SessionUser = {
  id: string;
  email: string | undefined;
};

export type AdminProfile = {
  id: string;
  authUserId: string;
  name: string;
  email: string;
  role: AuthRole;
};
