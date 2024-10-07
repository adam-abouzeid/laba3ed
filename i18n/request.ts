import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = cookieStore.get("lang")?.value || "ar";

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
