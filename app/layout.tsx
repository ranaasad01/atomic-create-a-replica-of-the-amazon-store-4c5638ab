import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Amazon — Earth's Biggest Selection",
  description:
    "Shop Amazon for millions of products across electronics, books, clothing, and more. Fast shipping, great prices, and Prime benefits.",
  keywords: ["amazon", "shopping", "deals", "prime", "electronics", "books"],
  openGraph: {
    title: "Amazon — Earth's Biggest Selection",
    description: "Shop millions of products with fast shipping and great prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#EAEDED] text-[#0F1111] antialiased min-h-screen flex flex-col">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}