"use server";

import { z } from "zod";
import db from "../lib/db";

// Define schema for validation
const schema = z.object({
  reason: z.string(),
  needId: z.string(),
});

export async function reportRequest(formData: FormData) {
  // Validate form data
  const validatedFields = schema.safeParse({
    reason: formData.get("reason"),
    needId: formData.get("needId"),
  });

  // If validation fails, return an error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Save the report in the database
    const newReport = await db.report.create({
      data: {
        reason: validatedFields.data.reason,
        needId: Number(validatedFields.data.needId),
      },
    });

    return { success: true, report: newReport };
  } catch (error) {
    console.error(error);
    return {
      errors: { message: "Failed to submit the report. Please try again." },
    };
  }
}
