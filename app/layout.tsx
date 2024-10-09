import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import RecaptchaProvider from "@/components/recaptcha-provider";

export const metadata: Metadata = {
  title: "La Ba3ed",
  description:
    "App created so people can help each other during these tough times",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <Toaster />
          <div className="max-w-2xl py-6 px-4 md:px-0 mx-auto container">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
