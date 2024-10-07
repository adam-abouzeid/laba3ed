"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Import next-intl
import Link from "next/link";

const AboutUs = () => {
  const t = useTranslations("aboutUsPage"); // Initialize translation hook

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] bg-blue-500 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="z-10">
          <h1 className="text-4xl font-bold text-white">{t("heroTitle")}</h1>
          <p className="text-lg text-white mt-2">{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Website Purpose Section */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">{t("whatWeDoTitle")}</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          {t("whatWeDoDescription1")}
        </p>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
          {t("whatWeDoDescription2")}
        </p>
      </section>

      {/* Mission Statement */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">{t("missionTitle")}</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            {t("missionDescription")}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 text-center" id="acknowledgements">
        <h2 className="text-3xl font-semibold mb-6">
          {t("acknowledgementTitle")}
        </h2>
        <p className="mb-8">{t("acknowledgementDescription")}</p>

        <div className="mb-4">
          <Link
            href="https://www.linkedin.com/in/adamabzd/"
            className="underline inline-block font-semibold text-lg mr-2"
          >
            {t("partners.1.name")}
          </Link>
          <p className="inline-block text-gray-700">{t("partners.1.role")}</p>
        </div>

        <div className="mb-4">
          <Link
            href="https://zaker.io/"
            className="underline inline-block font-semibold text-lg mr-2"
          >
            {t("partners.2.name")}
          </Link>
          <p className="inline-block text-gray-700">{t("partners.2.role")}</p>
        </div>

        <div className="mb-4">
          <Link
            href="https://www.linkedin.com/in/lara-wehbe/"
            className="underline inline-block font-semibold text-lg mr-2"
          >
            {t("partners.3.name")}
          </Link>
          <p className="inline-block text-gray-700">{t("partners.3.role")}</p>
        </div>

        <div className="mb-4">
          <Link
            href="https://www.linkedin.com/in/wissam-fawaz-6b440839/"
            className="underline inline-block font-semibold text-lg mr-2"
          >
            {t("partners.4.name")}
          </Link>
          <p className="inline-block text-gray-700">{t("partners.4.role")}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
