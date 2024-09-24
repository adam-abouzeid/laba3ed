"use server";

import { z } from "zod";
import db from "../../lib/db";

// Define schema for validation
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contact: z.string(),
  category: z.enum([
    "FOOD",
    "CLOTHING",
    "SHELTER",
    "TRANSPORTATION",
    "MEDICINE",
    "OTHER",
  ]),
});

export async function createRequest(formData) {
  // Validate form data
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    contact: formData.get("contact"),
    category: formData.get("category"),
  });

  // If validation fails, return an error
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  console.log(validatedFields.data);
  // Insert data into the database
  try {
    const newNeed = await db.need.create({
      data: {
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        category: validatedFields.data.category,
        contact: validatedFields.data.contact,
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
