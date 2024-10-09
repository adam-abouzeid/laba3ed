import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// getLocale returns the language from the "lang" cookie or default to Arabic
export const getLocaleFromCookie = (cookies: string): string => {
  const langCookie = cookies
    .split("; ")
    .find((row) => row.startsWith("lang="));

  return langCookie?.split("=")[1] || "ar";
};

