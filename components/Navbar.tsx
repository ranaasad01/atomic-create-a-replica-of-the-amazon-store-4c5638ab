"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, MapPin, ChevronDown, User } from 'lucide-react';
import { categories } from "@/lib/data";
import { useTranslations } from "next-intl";

const cartItemCount = 3;

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50">
        {/* Top bar */}
        <div className="bg-[#131921] text-white">
          <div className="max-w-[1500px] mx-auto px-3 flex items-center gap-2 h-[60px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center border border-transparent hover:border-white rounded px-2 py-1 transition-colors duration-150"
            >
              <span className="text-white font-bold text-2xl tracking-tight">
                amazon
              </span>
              <span className="text-[#FF9900] font-bold text-2xl">.com</span>
            </Link>

            {/* Deliver to */}
            <Link
              href="/"
              className="hidden lg:flex flex-col items-start border border-transparent hover:border-white rounded px-2 py-1 transition-colors duration-150 flex-shrink-0"
            >
              <span className="text-[#CCCCCC] text-[11px] leading-tight">
                {t("nav.deliverTo")}
              </span>
              <span className="text-white text-[13px] font-bold flex items-center gap-1">
                <MapPin size={14} className="text-white" />
                {t("nav.location")}
              </span>
            </Link>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center h-10 rounded-lg overflow-hidden border-2 border-[#FF9900] focus-within:border-[#FF9900]"
            >
              {/* Category selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="hidden md:flex items-center gap-1 bg-[#F3F3F3] text-[#0F1111] text-[13px] px-3 h-full border-r border-[#CDCDCD] hover:bg-[#E3E6E6] transition-colors whitespace-nowrap"
                >
                  <span className="max-w-[80px] truncate">{selectedCategory}</span>
                  <ChevronDown size={12} />
                </button>
                <AnimatePresence>
                  {categoryDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 bg-white border border-[#CDCDCD] rounded shadow-lg z-50 min-w-[200px] max-h-[400px] overflow-y-auto"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("All");
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F3F3] text-[#0F1111]"
                      >
                        All Departments
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            setCategoryDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] hover:bg-[#F3F3F3] text-[#0F1111]"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("nav.searchPlaceholder")}
                className="flex-1 px-3 text-[#0F1111] text-[14px] outline-none bg-white h-full"
              />
              <button
                type="submit"
                className="bg-[#FF9900] hover:bg-[#FA8900] transition-colors px-4 h-full flex items-center justify-center"
              >
                <Search size={20} className="text-[#131921]" />
              </button>
            </form>

            {/* Right side actions */}
            <div className="flex items-center gap-1 flex-shrink-0 ml-1">
              {/* Account */}
              <Link
                href="/"
                className="hidden md:flex flex-col items-start border border-transparent hover:border-white rounded px-2 py-1 transition-colors duration-150"
              >
                <span className="text-[#CCCCCC] text-[11px] leading-tight">
                  {t("nav.hello")}
                </span>
                <span className="text-white text-[13px] font-bold flex items-center gap-1">
                  <User size={14} />
                  {t("nav.accountLists")}
                </span>
              </Link>

              {/* Returns */}
              <Link
                href="/"
                className="hidden md:flex flex-col items-start border border-transparent hover:border-white rounded px-2 py-1 transition-colors duration-150"
              >
                <span className="text-[#CCCCCC] text-[11px] leading-tight">
                  {t("nav.returns")}
                </span>
                <span className="text-white text-[13px] font-bold">
                  {t("nav.orders")}
                </span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-end gap-1 border border-transparent hover:border-white rounded px-2 py-1 transition-colors duration-150"
              >
                <div className="relative">
                  <ShoppingCart size={32} className="text-white" />
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#FF9900] text-[#131921] text-[11px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartItemCount}
                  </span>
                </div>
                <span className="text-white text-[13px] font-bold hidden sm:block pb-1">
                  {t("nav.cart")}
                </span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden border border-transparent hover:border-white rounded p-2 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X size={20} className="text-white" />
                ) : (
                  <Menu size={20} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary nav bar */}
        <div className="bg-[#232F3E] text-white">
          <div className="max-w-[1500px] mx-auto px-3 flex items-center gap-1 h-[38px] overflow-x-auto scrollbar-hide">
            {/* All menu */}
            <button
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              className="flex items-center gap-1 text-[13px] font-bold px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap border border-transparent hover:border-white/30"
            >
              <Menu size={16} />
              {t("nav.allMenu")}
            </button>

            {/* Quick links */}
            {[
              { label: t("nav.todaysDeals"), href: "/search?filter=deals" },
              { label: t("nav.customerService"), href: "/" },
              { label: t("nav.registry"), href: "/" },
              { label: t("nav.giftCards"), href: "/" },
              { label: t("nav.sell"), href: "/" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] px-3 py-1 rounded hover:bg-white/10 transition-colors whitespace-nowrap border border-transparent hover:border-white/30"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Category mega menu */}
        <AnimatePresence>
          {categoryMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setCategoryMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed top-0 left-0 h-full w-80 bg-white z-50 overflow-y-auto shadow-2xl"
              >
                <div className="bg-[#232F3E] text-white px-4 py-3 flex items-center justify-between">
                  <span className="font-bold text-[16px]">{t("nav.browseAll")}</span>
                  <button
                    onClick={() => setCategoryMenuOpen(false)}
                    className="hover:bg-white/10 rounded p-1 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/search?category=${cat.slug}`}
                      onClick={() => setCategoryMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F3F3F3] transition-colors text-[#0F1111] text-[14px]"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-[#232F3E] overflow-hidden md:hidden"
            >
              <div className="px-4 py-3 space-y-1">
                <form onSubmit={handleSearch} className="flex mb-3">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("nav.searchPlaceholder")}
                    className="flex-1 px-3 py-2 text-[#0F1111] text-[14px] rounded-l outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF9900] px-4 rounded-r flex items-center"
                  >
                    <Search size={18} className="text-[#131921]" />
                  </button>
                </form>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/search?category=${cat.slug}`}
                    className="flex items-center gap-3 py-2 text-white text-[14px] hover:text-[#FF9900] transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}