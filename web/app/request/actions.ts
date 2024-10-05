"use server";

import { z } from "zod";
import db from "../../lib/db";
import { Category } from "@prisma/client";

// Define schema for validation
const schema = z.object({
  description: z.string().min(1, "Description is required"),
  contact: z.string(),
  category: z.nativeEnum(Category),
  area: z.string(),
});

export async function createRequest(formData: FormData) {
  // Validate form data
  const validatedFields = schema.safeParse({
    description: formData.get("description"),
    contact: formData.get("contact"),
    category: formData.get("category"),
    area: formData.get("area"),
  });

  // If validation fails, return an error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    const newNeed = await db.need.create({
      data: {
        description: validatedFields.data.description,
        category: validatedFields.data.category,
        contact: validatedFields.data.contact,
        area: validatedFields.data.area,
      },
    });

    return { success: true, need: newNeed };
  } catch (error) {
    console.error(error);
    return {
      errors: { message: "Failed to create the request. Please try again." },
    };
  }
}
