import { prisma } from "@/lib/prisma";
import type { ContactPersistInput } from "@/validators/contact";
import type { ContactRecord } from "@/types/contact";
import {
  sanitizeContactMessage,
  sanitizeContactText,
} from "@/server/contact/sanitize";

/**
 * Persists a validated contact submission.
 * Status defaults to Pending via Prisma schema.
 */
export async function createContactMessage(
  input: ContactPersistInput
): Promise<ContactRecord> {
  const name = sanitizeContactText(input.name);
  const email = sanitizeContactText(input.email).toLowerCase();
  const subject = sanitizeContactText(input.subject);
  const message = sanitizeContactMessage(input.message);

  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      subject,
      message,
    },
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      message: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return contact;
}
