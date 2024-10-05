"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl"; // Import next-intl

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
      <section className="py-12 px-4 lg:px-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">{t("whatWeDoTitle")}</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          {t("whatWeDoDescription1")}
        </p>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto mt-4">
          {t("whatWeDoDescription2")}
        </p>
      </section>

      {/* Mission Statement */}
      <section className="bg-gray-100 py-12 px-4 lg:px-24">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6">{t("missionTitle")}</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            {t("missionDescription")}
          </p>
        </div>
      </section>

      {/* Money Donation Section */}
      <section className="py-12 px-4 lg:px-24 text-center">
        <h2 className="text-3xl font-semibold mb-6">{t("donateTitle")}</h2>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6">
          {t("donateDescription")}
        </p>

        <div className="flex justify-center gap-2 items-center">
          <Image
            src={"/images/whish.png"}
            width={100}
            height={100}
            alt="whish logo"
          />
          <h2 className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg ">
            {t("donateButton")}
          </h2>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
