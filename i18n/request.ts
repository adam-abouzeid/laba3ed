import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  let locale = "en"; // Default locale

  // Check if "lang" cookie exists and set the locale
  const langCookie = cookieStore.get("lang");
  if (langCookie?.value) {
    locale = langCookie.value;
  }

  try {
    // Dynamically import locale messages based on the locale
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);
    throw new Error(`Unable to load locale messages for ${locale}`);
  }
});
