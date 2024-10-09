import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// getLocale returns the language from the "lang" cookie or default to Arabic
export const getLocaleFromCookie = (): string => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("lang="));

  const locale = cookies?.split("=")[1] || "ar";
  return locale
};

