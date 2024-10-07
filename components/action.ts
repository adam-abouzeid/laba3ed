"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteRequest(requestId: number, deletionToken: string) {
  const tokenRecord = await db.requestDeletionToken.findUnique({
    where: { needId: requestId },
  });

  if (!tokenRecord || tokenRecord.token !== deletionToken) {
    throw new Error("Invalid or expired deletion token");
  }

  await db.need.delete({
    where: { id: requestId },
  });
  revalidatePath("/requests");
  return { success: true, message: "Request deleted successfully" };
}
