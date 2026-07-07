"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { footerLinks, APP_NAME } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#131921] text-white mt-auto">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475A] hover:bg-[#485769] transition-colors py-3 text-[13px] text-white text-center"
      >
        {t("footer.backToTop")}
      </button>

      {/* Main footer links */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-[1500px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {/* Get to Know Us */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-white font-bold text-[14px] mb-3">
            {t("footer.getToKnowUs")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.getToKnowUs.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-[#DDDDDD] text-[13px] hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Make Money With Us */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-white font-bold text-[14px] mb-3">
            {t("footer.makeMoneyWithUs")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.makeMoneyWithUs.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-[#DDDDDD] text-[13px] hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Amazon Payment Products */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-white font-bold text-[14px] mb-3">
            {t("footer.amazonPayment")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.amazonPaymentProducts.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-[#DDDDDD] text-[13px] hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Let Us Help You */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-white font-bold text-[14px] mb-3">
            {t("footer.letUsHelpYou")}
          </h3>
          <ul className="space-y-2">
            {footerLinks.letUsHelpYou.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-[#DDDDDD] text-[13px] hover:text-white hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-[#3A4553]" />

      {/* Logo + legal */}
      <div className="max-w-[1500px] mx-auto px-6 py-6 flex flex-col items-center gap-4">
        <Link href="/" className="flex items-center">
          <span className="text-white font-bold text-xl tracking-tight">
            amazon
          </span>
          <span className="text-[#FF9900] font-bold text-xl">.com</span>
        </Link>

        {/* Country/language selectors */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="border border-[#5A6778] text-[#DDDDDD] text-[12px] px-3 py-1 rounded hover:border-white hover:text-white transition-colors">
            🌐 {t("footer.english")}
          </button>
          <button className="border border-[#5A6778] text-[#DDDDDD] text-[12px] px-3 py-1 rounded hover:border-white hover:text-white transition-colors">
            🇺🇸 {t("footer.unitedStates")}
          </button>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-4 text-[#DDDDDD] text-[11px]">
          {[
            t("footer.conditionsOfUse"),
            t("footer.privacyNotice"),
            t("footer.yourAdsPrivacy"),
          ].map((label) => (
            <Link
              key={label}
              href="/"
              className="hover:text-white hover:underline transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="text-[#DDDDDD] text-[11px] text-center">
          {t("footer.copyright", { year: "2024", name: APP_NAME })}
        </p>
      </div>
    </footer>
  );
}