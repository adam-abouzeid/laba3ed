"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { HiMenu, HiX } from "react-icons/hi"; // Importing icons for the menu toggle
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  // State to keep track of selected language
  const [language, setLanguage] = useState<string>("en");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State to toggle mobile menu
  const t = useTranslations("navbar");

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

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#dfdddd] top-0 left-0 w-full z-50 shadow-sm">
        <div className="flex justify-between items-center px-4 h-[64px]">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/logo.jpeg"
              width={64}
              height={64}
              alt="Lebanese Flag"
            />
          </Link>

          {/* Hamburger Menu Icon for Mobile */}
          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Links for desktop, hidden on mobile */}
          <div className="hidden lg:flex gap-4 items-center">
            <Link href="/">
              <Button
                className={cn(
                  "w-full",
                  pathname === "/" ? "text-foreground" : "text-muted-foreground"
                )}
                variant={"link"}
              >
                {t("requests")}
              </Button>
            </Link>

            <Link href="/about">
              <Button
                className={cn(
                  "w-full",
                  pathname === "/about"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                variant={"link"}
              >
                {t("about")}
              </Button>
            </Link>

            {/* Language Dropdown */}
            <select
              value={language}
              onChange={handleLanguageChange}
              className="p-1 border rounded"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Mobile Menu, visible only when toggled */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 p-4 bg-[#dfdddd] shadow-md ">
          <Link href="/" onClick={toggleMenu}>
            <Button
              className={cn(
                "w-full",
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {t("requests")}
            </Button>
          </Link>

          <Link href="/about" onClick={toggleMenu}>
            <Button
              className={cn(
                "w-full",
                pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              variant={"outline"}
            >
              {t("about")}
            </Button>
          </Link>

          {/* Language Dropdown */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-1 border rounded w-full"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      )}

      {/* Content container - ensure it is pushed down when menu is open */}
    </>
  );
};

export default Navbar;
