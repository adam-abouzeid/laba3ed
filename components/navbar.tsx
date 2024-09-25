"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
const Navbar = () => {
  // State to keep track of selected language
  const [language, setLanguage] = useState<string>("en");
  const t = useTranslations("Navbar");

  // Get the initial language from the "lang" cookie or default to English
  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="));

    if (cookies) {
      const lang = cookies.split("=")[1];
      setLanguage(lang || "en");
    }
  }, []);

  // Function to change language and update the cookie
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    // Set the "lang" cookie
    document.cookie = `lang=${selectedLang}; path=/; max-age=31536000`;
    // Reload the page to apply the new language
    window.location.reload();
  };

  return (
    <div className="flex justify-around bg-[#dfdddd] h-[100px] items-center">
      <Image
        src="/images/logo.jpeg"
        width={100}
        height={100}
        alt="Lebanese Flag"
      />
      <div className="flex gap-4">
        <Link href="/">
          <Button>{t("Requests")}</Button>
        </Link>

        <Link href="/request">
          <Button variant={"outline"}>{t("Receive")}</Button>
        </Link>

        {/* Language Dropdown */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className=" p-1 border rounded"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
