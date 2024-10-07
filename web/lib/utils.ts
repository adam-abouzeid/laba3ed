import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocale = () => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("lang="));

  return cookies?.split("=")[1] || "ar";
};

