"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Star, ChevronDown, ChevronUp, Check, ShoppingCart, Heart, Filter, X, ArrowUpDown } from 'lucide-react';
import { products, categories, type Product } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline variants ──────────────────────────────────────────────────────────
const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const sidebarPanel: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Star renderer ────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const partial = !filled && rating > star - 1;
          return (
            <span key={star} className="relative inline-block w-4 h-4">
              <Star
                size={14}
                className="text-[#CDCDCD]"
                fill="#CDCDCD"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating - (star - 1)) * 100}%` }}
                >
                  <Star size={14} className="text-[#FF9900]" fill="#FF9900" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className="text-[#007185] text-[13px] hover:text-[#C7511F] cursor-pointer">
        {(count ?? 0).toLocaleString("en-US")}
      </span>
    </div>
  );
}

// ─── Prime badge ──────────────────────────────────────────────────────────────
function PrimeBadge() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="text-[#00A8E0] font-bold text-[13px] italic">prime</span>
    </span>
  );
}

// ─── Filter panel wrapper ─────────────────────────────────────────────────────
function FilterPanel({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#DDD] pb-4 mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <span className="font-bold text-[#0F1111] text-[14px]">{title}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sort options ─────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "bestseller", label: "Best Sellers" },
];

// ─── Price ranges ─────────────────────────────────────────────────────────────
const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 to $50", min: 25, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 & Above", min: 200, max: Infinity },
];

// ─── Review filter options ────────────────────────────────────────────────────
const REVIEW_OPTIONS = [4, 3, 2, 1];

// ─── Main page ────────────────────────────────────────────────────────────────
function SearchPageInner() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const filterParam = searchParams.get("filter") ?? "";

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [minReview, setMinReview] = useState<number | null>(null);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  // Apply "deals" filter from URL
  useEffect(() => {
    if (filterParam === "deals") {
      // pre-filter to show discounted items — handled in useMemo
    }
  }, [filterParam]);

  // Filtered + sorted products
  const results = useMemo(() => {
    let list: Product[] = [...products];

    // Query filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Deals filter
    if (filterParam === "deals") {
      list = list.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category));
    }

    // Price range filter
    if (selectedPriceRange !== null) {
      const range = PRICE_RANGES[selectedPriceRange];
      if (range) {
        list = list.filter(
          (p) => p.price >= range.min && p.price < range.max
        );
      }
    }

    // Review filter
    if (minReview !== null) {
      list = list.filter((p) => p.rating >= minReview);
    }

    // Prime filter
    if (primeOnly) {
      list = list.filter((p) => p.isPrime);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return list;
  }, [query, filterParam, selectedCategories, selectedPriceRange, minReview, primeOnly, sortBy]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const handleAddToCart = (id: string) => {
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setMinReview(null);
    setPrimeOnly(false);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange !== null ||
    minReview !== null ||
    primeOnly;

  const pageTitle =
    filterParam === "deals"
      ? "Today's Deals"
      : query
      ? `Results for "${query}"`
      : "All Products";

  // ─── Sidebar content ────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <motion.aside
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Active filters */}
      {hasActiveFilters && (
        <motion.div variants={sidebarPanel} className="mb-4">
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline"
          >
            <X size={12} />
            Clear all filters
          </button>
        </motion.div>
      )}

      {/* Department */}
      <motion.div variants={sidebarPanel}>
        <FilterPanel title="Department">
          <ul className="space-y-1.5">
            {categories.map((cat) => {
              const checked = selectedCategories.includes(cat.slug);
              return (
                <li key={cat.id}>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        checked
                          ? "bg-[#FF9900] border-[#FF9900]"
                          : "border-[#888] group-hover:border-[#FF9900]"
                      }`}
                      onClick={() => toggleCategory(cat.slug)}
                    >
                      {checked && <Check size={10} className="text-white" />}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleCategory(cat.slug)}
                    />
                    <span className="text-[13px] text-[#0F1111] group-hover:text-[#C7511F] group-hover:underline">
                      {cat.icon} {cat.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterPanel>
      </motion.div>

      {/* Price Range */}
      <motion.div variants={sidebarPanel}>
        <FilterPanel title="Price">
          <ul className="space-y-1.5">
            {PRICE_RANGES.map((range, idx) => (
              <li key={range.label}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedPriceRange === idx
                        ? "border-[#FF9900]"
                        : "border-[#888] group-hover:border-[#FF9900]"
                    }`}
                    onClick={() =>
                      setSelectedPriceRange(
                        selectedPriceRange === idx ? null : idx
                      )
                    }
                  >
                    {selectedPriceRange === idx && (
                      <span className="w-2 h-2 rounded-full bg-[#FF9900]" />
                    )}
                  </span>
                  <input
                    type="radio"
                    className="sr-only"
                    checked={selectedPriceRange === idx}
                    onChange={() =>
                      setSelectedPriceRange(
                        selectedPriceRange === idx ? null : idx
                      )
                    }
                  />
                  <span className="text-[13px] text-[#0F1111] group-hover:text-[#C7511F] group-hover:underline">
                    {range.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterPanel>
      </motion.div>

      {/* Avg. Customer Review */}
      <motion.div variants={sidebarPanel}>
        <FilterPanel title="Avg. Customer Review">
          <ul className="space-y-2">
            {REVIEW_OPTIONS.map((stars) => (
              <li key={stars}>
                <button
                  onClick={() =>
                    setMinReview(minReview === stars ? null : stars)
                  }
                  className={`flex items-center gap-2 group w-full text-left ${
                    minReview === stars ? "font-semibold" : ""
                  }`}
                >
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= stars ? "#FF9900" : "#CDCDCD"}
                        className={s <= stars ? "text-[#FF9900]" : "text-[#CDCDCD]"}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#007185] group-hover:text-[#C7511F] group-hover:underline">
                    & Up
                  </span>
                  {minReview === stars && (
                    <Check size={12} className="text-[#FF9900] ml-auto" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </FilterPanel>
      </motion.div>

      {/* Prime */}
      <motion.div variants={sidebarPanel}>
        <FilterPanel title="Prime Eligible">
          <label className="flex items-center gap-2 cursor-pointer group">
            <span
              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                primeOnly
                  ? "bg-[#FF9900] border-[#FF9900]"
                  : "border-[#888] group-hover:border-[#FF9900]"
              }`}
              onClick={() => setPrimeOnly((v) => !v)}
            >
              {primeOnly && <Check size={10} className="text-white" />}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={primeOnly}
              onChange={() => setPrimeOnly((v) => !v)}
            />
            <span className="text-[13px] text-[#0F1111] group-hover:text-[#C7511F] group-hover:underline">
              <span className="text-[#00A8E0] font-bold italic">prime</span> Eligible
            </span>
          </label>
        </FilterPanel>
      </motion.div>
    </motion.aside>
  );

  // ─── Product row ────────────────────────────────────────────────────────────
  const ProductRow = ({ product }: { product: Product }) => {
    const discount =
      product.originalPrice && product.originalPrice > product.price
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100
          )
        : null;

    return (
      <motion.div
        variants={listItem}
        whileHover={{ boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}
        className="flex gap-4 p-4 bg-white border border-[#DDD] rounded-lg transition-shadow duration-200"
      >
        {/* Image */}
        <Link
          href={`/product/${product.id}`}
          className="flex-shrink-0 w-[180px] h-[180px] flex items-center justify-center bg-white rounded overflow-hidden border border-[#EEE]"
        >
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/images/placeholder-product.jpg";
            }}
          />
        </Link>

        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          {product.badge && (
            <span className="inline-block text-[11px] font-semibold text-white bg-[#CC0C39] px-2 py-0.5 rounded mb-1">
              {product.badge}
            </span>
          )}

          {/* Title */}
          <Link href={`/product/${product.id}`}>
            <h2 className="text-[#0F1111] text-[16px] font-medium leading-snug hover:text-[#C7511F] hover:underline line-clamp-2 mb-1">
              {product.title}
            </h2>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          {/* Sold by */}
          <p className="text-[12px] text-[#565959] mb-2">
            by{" "}
            <span className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
              {product.soldBy}
            </span>
          </p>

          {/* Description snippet */}
          <p className="text-[13px] text-[#565959] line-clamp-2 mb-2 leading-relaxed">
            {product.description}
          </p>

          {/* Features */}
          <ul className="mb-3 space-y-0.5">
            {(product.features ?? []).slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[12px] text-[#0F1111]">
                <span className="text-[#565959] mt-0.5">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Prime */}
          {product.isPrime && (
            <div className="flex items-center gap-1 mb-1">
              <PrimeBadge />
              <span className="text-[12px] text-[#565959]">
                FREE delivery
              </span>
            </div>
          )}

          {/* Stock */}
          {product.inStock ? (
            <span className="text-[13px] text-[#007600] font-medium">In Stock</span>
          ) : (
            <span className="text-[13px] text-[#CC0C39] font-medium">Out of Stock</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex-shrink-0 w-[160px] flex flex-col items-start pt-1">
          {/* Price */}
          <div className="mb-1">
            <span className="text-[22px] font-medium text-[#0F1111]">
              <span className="text-[14px] align-top leading-6">$</span>
              {Math.floor(product.price)}
              <span className="text-[14px] align-top leading-6">
                {(product.price % 1).toFixed(2).slice(1)}
              </span>
            </span>
          </div>

          {/* Original price + discount */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[12px] text-[#565959] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              {discount !== null && (
                <span className="text-[12px] text-[#CC0C39] font-medium">
                  ({discount}% off)
                </span>
              )}
            </div>
          )}

          {/* Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAddToCart(product.id)}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-1.5 text-[13px] font-medium py-2 px-3 rounded-full transition-colors duration-150 mb-2 ${
              addedToCart === product.id
                ? "bg-[#5cb85c] text-white"
                : product.inStock
                ? "bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111]"
                : "bg-[#EEE] text-[#888] cursor-not-allowed"
            }`}
          >
            {addedToCart === product.id ? (
              <>
                <Check size={13} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                Add to Cart
              </>
            )}
          </motion.button>

          {/* Save for later */}
          <button className="flex items-center gap-1 text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline">
            <Heart size={12} />
            Save for later
          </button>
        </div>
      </motion.div>
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1500px] mx-auto px-3 py-4">
        {/* Breadcrumb */}
        <motion.nav
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-[12px] text-[#007185] mb-3 flex items-center gap-1 flex-wrap"
        >
          <Link href="/" className="hover:text-[#C7511F] hover:underline">
            Home
          </Link>
          <span className="text-[#565959]">&rsaquo;</span>
          {filterParam === "deals" ? (
            <span className="text-[#0F1111]">Today&apos;s Deals</span>
          ) : query ? (
            <>
              <span className="text-[#0F1111]">Search Results</span>
              <span className="text-[#565959]">&rsaquo;</span>
              <span className="text-[#0F1111]">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            <span className="text-[#0F1111]">All Products</span>
          )}
        </motion.nav>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-3 md:hidden">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-[18px] font-medium text-[#0F1111]"
          >
            {pageTitle}
          </motion.h1>
          <button
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] bg-white border border-[#DDD] rounded px-3 py-1.5 hover:bg-[#F7F8F8]"
          >
            <Filter size={14} />
            Filters
          </button>
        </div>

        {/* Mobile filters drawer */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border border-[#DDD] rounded-lg p-4 mb-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-[14px]">Filters</span>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4">
          {/* Sidebar — desktop */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hidden md:block w-[220px] flex-shrink-0"
          >
            <div className="bg-white border border-[#DDD] rounded-lg p-4">
              <h2 className="font-bold text-[16px] text-[#0F1111] mb-4 border-b border-[#DDD] pb-2">
                Filter Results
              </h2>
              <SidebarContent />
            </div>
          </motion.div>

          {/* Main results area */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3"
            >
              <div>
                <h1 className="text-[20px] font-medium text-[#0F1111] hidden md:block">
                  {pageTitle}
                </h1>
                <p className="text-[13px] text-[#565959]">
                  {results.length.toLocaleString("en-US")}{" "}
                  {results.length === 1 ? "result" : "results"}
                  {query ? ` for "${query}"` : ""}
                </p>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#0F1111] whitespace-nowrap font-medium">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-[#DDD] rounded text-[13px] text-[#0F1111] pl-3 pr-8 py-1.5 hover:bg-[#F7F8F8] focus:outline-none focus:border-[#FF9900] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ArrowUpDown
                    size={12}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#565959] pointer-events-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2 mb-3"
              >
                {selectedCategories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug);
                  return cat ? (
                    <button
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="flex items-center gap-1 text-[12px] bg-white border border-[#DDD] rounded-full px-3 py-1 hover:bg-[#F7F8F8]"
                    >
                      {cat.icon} {cat.name}
                      <X size={10} className="ml-1" />
                    </button>
                  ) : null;
                })}
                {selectedPriceRange !== null && PRICE_RANGES[selectedPriceRange] && (
                  <button
                    onClick={() => setSelectedPriceRange(null)}
                    className="flex items-center gap-1 text-[12px] bg-white border border-[#DDD] rounded-full px-3 py-1 hover:bg-[#F7F8F8]"
                  >
                    {PRICE_RANGES[selectedPriceRange]?.label}
                    <X size={10} className="ml-1" />
                  </button>
                )}
                {minReview !== null && (
                  <button
                    onClick={() => setMinReview(null)}
                    className="flex items-center gap-1 text-[12px] bg-white border border-[#DDD] rounded-full px-3 py-1 hover:bg-[#F7F8F8]"
                  >
                    {minReview}+ Stars
                    <X size={10} className="ml-1" />
                  </button>
                )}
                {primeOnly && (
                  <button
                    onClick={() => setPrimeOnly(false)}
                    className="flex items-center gap-1 text-[12px] bg-white border border-[#DDD] rounded-full px-3 py-1 hover:bg-[#F7F8F8]"
                  >
                    <span className="text-[#00A8E0] font-bold italic text-[11px]">prime</span>
                    <X size={10} className="ml-1" />
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline px-1"
                >
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Results list */}
            {results.length === 0 ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="bg-white border border-[#DDD] rounded-lg p-12 text-center"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-[20px] font-medium text-[#0F1111] mb-2">
                  No results found
                </h2>
                <p className="text-[14px] text-[#565959] mb-4">
                  We couldn&apos;t find any products matching your search.
                </p>
                <ul className="text-[13px] text-[#565959] space-y-1 mb-6 text-left inline-block">
                  <li>• Check the spelling of your search term</li>
                  <li>• Try more general keywords</li>
                  <li>• Try different keywords</li>
                  <li>• Clear some filters</li>
                </ul>
                <div>
                  <Link
                    href="/"
                    className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[13px] font-medium px-6 py-2 rounded-full transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {results.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </motion.div>
            )}

            {/* Pagination placeholder */}
            {results.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center justify-center gap-1 mt-8 mb-4"
              >
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-9 h-9 rounded text-[14px] font-medium transition-colors ${
                      page === 1
                        ? "bg-[#FF9900] text-white"
                        : "bg-white border border-[#DDD] text-[#007185] hover:bg-[#F7F8F8]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 h-9 rounded bg-white border border-[#DDD] text-[13px] text-[#007185] hover:bg-[#F7F8F8]">
                  Next
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
