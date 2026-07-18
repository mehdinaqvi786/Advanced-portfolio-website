import type { ContactStatus } from "@/generated/prisma/client";

export type ContactStatusValue = ContactStatus;

export type ContactRecord = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatusValue;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
