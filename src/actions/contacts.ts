"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { ContactStatus } from "@/generated/prisma/client";
import { resolveAdminGate } from "@/lib/auth/gate";
import { prisma } from "@/lib/prisma";

const updateStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum([
    ContactStatus.Pending,
    ContactStatus.Completed,
    ContactStatus.Resolved,
    ContactStatus.Done,
  ]),
});

export type UpdateContactStatusResult = {
  ok: boolean;
  message: string;
  status?: ContactStatus;
};

/**
 * Admin-only contact status update.
 * Revalidates contacts + dashboard so stats refresh without a hard reload.
 */
export async function updateContactStatusAction(input: {
  id: string;
  status: ContactStatus;
}): Promise<UpdateContactStatusResult> {
  const gate = await resolveAdminGate();
  if (gate.status !== "ok") {
    return {
      ok: false,
      message:
        gate.status === "forbidden"
          ? "You do not have access to perform this action."
          : "Your session has expired. Please sign in again.",
    };
  }

  const parsed = updateStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Invalid status update." };
  }

  try {
    const updated = await prisma.contact.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
      select: { status: true },
    });

    revalidatePath("/admin/contacts");
    revalidatePath("/admin/dashboard");

    return {
      ok: true,
      message: "Status updated successfully.",
      status: updated.status,
    };
  } catch (error) {
    console.error("[updateContactStatusAction]", error);
    return {
      ok: false,
      message: "Unable to update status. Please try again.",
    };
  }
}
