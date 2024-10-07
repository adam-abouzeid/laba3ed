import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

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

  console.log(GeistSans.variable);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <Toaster />
          <div className="max-w-2xl py-6 px-4 md:px-0 mx-auto container">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
