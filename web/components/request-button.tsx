import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { GoPlus } from "react-icons/go";
import Link from "next/link";

export default function RequestButton() {
  const t = useTranslations("floatingButton");

  return (
    <Link
      href="/request"
      className="fixed bottom-6 right-6 flex items-center justify-center flex-col"
    >
      <Button className="rounded-full size-16">
        <GoPlus className="size-full stroke-1 shrink-0" />
      </Button>
      <span className="text-center text-lg font-medium">
        {t("request").toUpperCase()}
      </span>
    </Link>
  );
}
