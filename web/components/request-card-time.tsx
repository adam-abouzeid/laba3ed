import { format, formatDistanceToNow } from "date-fns";
import { cookies } from "next/headers";
import { enUS, ar } from "date-fns/locale";

export default function RequestCardTime({ createdAt }: { createdAt: Date }) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cookieStore = cookies();

  const localeMap = {
    ar: ar,
    en: enUS,
  } as const;

  const locale = (cookieStore.get("lang")?.value ||
    "ar") as keyof typeof localeMap;

  return (
    <time className="text-secondary-foreground text-sm">
      {createdAt > sevenDaysAgo
        ? formatDistanceToNow(createdAt, {
            addSuffix: true,
            locale: localeMap[locale],
          })
        : format(createdAt, "MMMM d, yyyy", {
            locale: localeMap[locale],
          })}
    </time>
  );
}
