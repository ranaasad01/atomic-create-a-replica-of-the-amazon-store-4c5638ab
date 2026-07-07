"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, StarHalf, Filter, ChevronDown, ChevronRight, X, Check, SlidersHorizontal, ArrowUpDown, Heart, ShoppingCart, Zap } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const ACCENT = "#FF9900";

interface SearchProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isPrime: boolean;
  badge?: string;
  description: string;
  inStock: boolean;
  soldBy: string;
  deliveryDate: string;
  sponsored?: boolean;
}

const allProducts: SearchProduct[] = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with MagSafe Case",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 84312,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Best Seller",
    description:
      "AirPods Pro feature up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking for an immersive listening experience.",
    inStock: true,
    soldBy: "Amazon.com",
    deliveryDate: "Tomorrow",
  },
  {
    id: "2",
    title: "Sony WH-1000XM5 Industry Leading Noise Canceling Wireless Headphones",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviewCount: 52104,
    image: "/images/sony-noise-canceling-headphones.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Deal",
    description:
      "Industry-leading noise cancellation with two processors and eight microphones. Up to 30-hour battery life with quick charging.",
    inStock: true,
    soldBy: "Sony Direct",
    deliveryDate: "Tomorrow",
    sponsored: true,
  },
  {
    id: "3",
    title: "Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones",
    price: 229.00,
    originalPrice: 329.00,
    rating: 4.5,
    reviewCount: 38921,
    image: "https://m.media-amazon.com/images/I/51HHABMPoVL._AC_UF894,1000_QL80_.jpg",
    category: "Electronics",
    isPrime: true,
    description:
      "Acclaimed noise cancellation technology blocks out the world so you can focus. Quiet and Aware modes let you choose your environment.",
    inStock: true,
    soldBy: "Bose Official",
    deliveryDate: "Wed, Jan 15",
  },
  {
    id: "4",
    title: "Jabra Evolve2 85 Wireless PC Headset with Active Noise Cancellation",
    price: 349.00,
    originalPrice: 449.00,
    rating: 4.4,
    reviewCount: 12847,
    image: "/images/jabra-wireless-headset.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Amazon's Choice",
    description:
      "Professional-grade headset with advanced ANC, 37-hour battery, and superior call clarity for remote work and collaboration.",
    inStock: true,
    soldBy: "Jabra Store",
    deliveryDate: "Thu, Jan 16",
  },
  {
    id: "5",
    title: "Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Headphones",
    price: 55.99,
    originalPrice: 79.99,
    rating: 4.3,
    reviewCount: 67234,
    image: "/images/anker-soundcore-headphones.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Best Seller",
    description:
      "Hybrid active noise cancellation reduces ambient noise by up to 40dB. Hi-Res Audio certified with 40mm drivers for rich, detailed sound.",
    inStock: true,
    soldBy: "Anker Direct",
    deliveryDate: "Tomorrow",
  },
  {
    id: "6",
    title: "Samsung Galaxy Buds2 Pro True Wireless Bluetooth Earbuds",
    price: 149.99,
    originalPrice: 229.99,
    rating: 4.4,
    reviewCount: 29103,
    image: "/images/samsung-galaxy-buds-earbuds.jpg",
    category: "Electronics",
    isPrime: true,
    description:
      "Intelligent ANC blocks up to 98% of ambient noise. Hi-Fi 24bit audio and 360 Audio for an immersive sound experience.",
    inStock: true,
    soldBy: "Samsung Official",
    deliveryDate: "Tomorrow",
    sponsored: true,
  },
  {
    id: "7",
    title: "Beats Studio Pro Wireless Headphones with Personalized Spatial Audio",
    price: 199.95,
    originalPrice: 349.95,
    rating: 4.5,
    reviewCount: 18432,
    image: "/images/beats-studio-pro-headphones.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Deal",
    description:
      "Up to 40 hours of battery life, USB-C and 3.5mm connectivity, and lossless audio via USB-C for studio-quality sound anywhere.",
    inStock: true,
    soldBy: "Beats by Dre",
    deliveryDate: "Wed, Jan 15",
  },
  {
    id: "8",
    title: "JBL Tune 760NC Wireless Over-Ear Headphones with Active Noise Cancelling",
    price: 79.95,
    originalPrice: 129.95,
    rating: 4.2,
    reviewCount: 23891,
    image: "/images/jbl-tune-wireless-headphones.jpg",
    category: "Electronics",
    isPrime: false,
    description:
      "35-hour battery life with ANC on. Foldable design for easy portability. JBL Pure Bass Sound for powerful, punchy audio.",
    inStock: true,
    soldBy: "JBL Official",
    deliveryDate: "Fri, Jan 17",
  },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Avg. Customer Review" },
  { value: "newest", label: "Newest Arrivals" },
];

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 to $100", min: 50, max: 100 },
  { label: "$100 to $200", min: 100, max: 200 },
  { label: "$200 to $300", min: 200, max: 300 },
  { label: "$300 & Above", min: 300, max: Infinity },
];

const brandFilters = ["Apple", "Sony", "Bose", "Jabra", "Anker", "Samsung", "Beats", "JBL"];

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} size={13} fill={ACCENT} stroke="none" />
        ))}
        {hasHalf && <StarHalf size={13} fill={ACCENT} stroke="none" />}
        {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => (
          <Star key={`e-${i}`} size={13} fill="#DDD" stroke="none" />
        ))}
      </div>
      <span className="text-[#007185] text-[13px] hover:text-[#C7511F] cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

function PrimeBadge() {
  return (
    <span className="inline-flex items-center gap-0.5">
      <span className="text-[#00A8E1] font-bold text-[13px] italic">prime</span>
    </span>
  );
}

function ProductCard({ product, index }: { product: SearchProduct; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#DDD] rounded-lg overflow-hidden flex flex-col md:flex-row gap-0 hover:shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative flex-shrink-0 w-full md:w-[220px] h-[220px] md:h-auto bg-[#F7F8F8] flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/placeholder-product.jpg";
          }}
        />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
        {product.sponsored && (
          <span className="absolute top-2 right-2 bg-white border border-[#DDD] text-[#565959] text-[10px] px-1.5 py-0.5 rounded">
            Sponsored
          </span>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`}>
            <h2 className="text-[#0F1111] text-[15px] font-medium leading-snug hover:text-[#C7511F] transition-colors line-clamp-2">
              {product.title}
            </h2>
          </Link>
          <button
            onClick={() => setWishlisted((w) => !w)}
            className="flex-shrink-0 p-1.5 rounded-full hover:bg-[#F0F2F2] transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              fill={wishlisted ? "#CC0C39" : "none"}
              stroke={wishlisted ? "#CC0C39" : "#565959"}
            />
          </button>
        </div>

        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="text-[#565959] text-[12px]">
          {product.soldBy !== "Amazon.com" ? `by ${product.soldBy}` : ""}
        </div>

        <p className="text-[#565959] text-[13px] leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-[#CC0C39] text-[13px] font-normal">
            {discount > 0 ? `-${discount}%` : ""}
          </span>
          <span className="text-[#0F1111] text-[22px] font-medium">
            <sup className="text-[14px] align-super">$</sup>
            {Math.floor(product.price)}
            <sup className="text-[14px] align-super">
              {String((product.price % 1).toFixed(2)).slice(1)}
            </sup>
          </span>
          {product.originalPrice && (
            <span className="text-[#565959] text-[13px] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Prime + Delivery */}
        <div className="flex items-center gap-2 text-[13px]">
          {product.isPrime && <PrimeBadge />}
          <span className="text-[#007600]">
            FREE delivery <strong>{product.deliveryDate}</strong>
          </span>
        </div>

        {/* Stock */}
        <div className="text-[13px]">
          {product.inStock ? (
            <span className="text-[#007600] font-medium">In Stock</span>
          ) : (
            <span className="text-[#CC0C39]">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-auto pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[13px] font-medium px-5 py-2 rounded-full border border-[#FCD200] transition-colors duration-150 flex items-center gap-2"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SearchResultsPage() {
  const t = useTranslations();

  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("wireless headphones");

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedPriceRange(null);
    setSelectedBrands([]);
    setPrimeOnly(false);
    setMinRating(null);
  };

  const activeFilterCount =
    (selectedPriceRange !== null ? 1 : 0) +
    selectedBrands.length +
    (primeOnly ? 1 : 0) +
    (minRating !== null ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      if (range) {
        result = result.filter(
          (p) => p.price >= range.min && p.price < (range.max === Infinity ? 999999 : range.max)
        );
      }
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.some((b) => p.title.toLowerCase().includes(b.toLowerCase()) || p.soldBy.toLowerCase().includes(b.toLowerCase()))
      );
    }

    if (primeOnly) {
      result = result.filter((p) => p.isPrime);
    }

    if (minRating !== null) {
      result = result.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedPriceRange, selectedBrands, primeOnly, minRating, sortBy]);

  const currentSortLabel =
    sortOptions.find((s) => s.value === sortBy)?.label ?? "Featured";

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Search bar strip */}
      <div className="bg-[#232F3E] py-2 px-4">
        <div className="max-w-[1500px] mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex items-center gap-2 max-w-2xl"
          >
            <div className="flex-1 flex items-center bg-white rounded-lg overflow-hidden border-2 border-[#FF9900]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-[14px] text-[#0F1111] outline-none"
                placeholder="Search Amazon"
              />
              <button
                type="submit"
                className="bg-[#FF9900] hover:bg-[#FA8900] px-4 py-2 transition-colors"
              >
                <Search size={18} className="text-[#0F1111]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-3 py-4 flex gap-4">
        {/* Sidebar Filters — Desktop */}
        <aside className="hidden md:block w-[220px] flex-shrink-0">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg border border-[#DDD] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[#DDD] flex items-center justify-between">
              <h2 className="text-[#0F1111] font-bold text-[15px]">Filters</h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[#007185] text-[12px] hover:text-[#C7511F] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Prime */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#FF9900]"
                />
                <span className="text-[#007185] text-[13px] italic font-bold">prime</span>
              </label>
            </div>

            {/* Price Range */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Price</h3>
              <ul className="space-y-1.5">
                {priceRanges.map((range, i) => (
                  <li key={range.label}>
                    <button
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === i ? null : i)
                      }
                      className={`flex items-center gap-2 text-[13px] w-full text-left transition-colors ${
                        selectedPriceRange === i
                          ? "text-[#C7511F] font-medium"
                          : "text-[#007185] hover:text-[#C7511F]"
                      }`}
                    >
                      {selectedPriceRange === i && (
                        <Check size={12} className="text-[#C7511F]" />
                      )}
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avg Rating */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Avg. Customer Review</h3>
              <ul className="space-y-1.5">
                {[4, 3, 2, 1].map((stars) => (
                  <li key={stars}>
                    <button
                      onClick={() =>
                        setMinRating(minRating === stars ? null : stars)
                      }
                      className={`flex items-center gap-1.5 text-[13px] w-full text-left transition-colors ${
                        minRating === stars ? "font-medium" : "hover:text-[#C7511F]"
                      }`}
                    >
                      <div className="flex">
                        {Array.from({ length: stars }).map((_, i) => (
                          <Star key={i} size={12} fill={ACCENT} stroke="none" />
                        ))}
                        {Array.from({ length: 5 - stars }).map((_, i) => (
                          <Star key={`e-${i}`} size={12} fill="#DDD" stroke="none" />
                        ))}
                      </div>
                      <span className="text-[#007185]">& Up</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="px-4 py-3">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Brand</h3>
              <ul className="space-y-1.5">
                {brandFilters.map((brand) => (
                  <li key={brand}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 accent-[#FF9900]"
                      />
                      <span className="text-[#007185] text-[13px] hover:text-[#C7511F]">
                        {brand}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </aside>

        {/* Main Results */}
        <main className="flex-1 min-w-0">
          {/* Results header */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg border border-[#DDD] px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <h1 className="text-[#0F1111] text-[18px] font-normal">
                <span className="text-[#565959] text-[14px]">
                  1-{filteredProducts.length} of {filteredProducts.length} results for{" "}
                </span>
                <span className="text-[#C7511F] font-medium">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setFilterPanelOpen(true)}
                className="md:hidden flex items-center gap-1.5 border border-[#DDD] rounded px-3 py-1.5 text-[13px] text-[#0F1111] hover:bg-[#F0F2F2] transition-colors"
              >
                <Filter size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-[#CC0C39] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 border border-[#DDD] rounded px-3 py-1.5 text-[13px] text-[#0F1111] hover:bg-[#F0F2F2] transition-colors"
                >
                  <ArrowUpDown size={13} />
                  <span>Sort by: <strong>{currentSortLabel}</strong></span>
                  <ChevronDown size={13} />
                </button>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 bg-white border border-[#DDD] rounded shadow-lg z-20 min-w-[200px]"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F0F2F2] transition-colors flex items-center gap-2 ${
                          sortBy === opt.value ? "font-bold text-[#C7511F]" : "text-[#0F1111]"
                        }`}
                      >
                        {sortBy === opt.value && <Check size={12} />}
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mb-3"
            >
              {primeOnly && (
                <span className="flex items-center gap-1 bg-white border border-[#DDD] rounded-full px-3 py-1 text-[12px] text-[#0F1111]">
                  <span className="text-[#00A8E1] font-bold italic text-[12px]">prime</span>
                  <button onClick={() => setPrimeOnly(false)} className="ml-1 hover:text-[#CC0C39]">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedPriceRange !== null && priceRanges[selectedPriceRange] && (
                <span className="flex items-center gap-1 bg-white border border-[#DDD] rounded-full px-3 py-1 text-[12px] text-[#0F1111]">
                  {priceRanges[selectedPriceRange]?.label}
                  <button onClick={() => setSelectedPriceRange(null)} className="ml-1 hover:text-[#CC0C39]">
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="flex items-center gap-1 bg-white border border-[#DDD] rounded-full px-3 py-1 text-[12px] text-[#0F1111]"
                >
                  {brand}
                  <button onClick={() => toggleBrand(brand)} className="ml-1 hover:text-[#CC0C39]">
                    <X size={11} />
                  </button>
                </span>
              ))}
              {minRating !== null && (
                <span className="flex items-center gap-1 bg-white border border-[#DDD] rounded-full px-3 py-1 text-[12px] text-[#0F1111]">
                  {minRating}+ Stars
                  <button onClick={() => setMinRating(null)} className="ml-1 hover:text-[#CC0C39]">
                    <X size={11} />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-[#007185] text-[12px] hover:underline hover:text-[#C7511F] px-2"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* Sponsored banner */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#DDD] rounded-lg px-4 py-2 mb-3 flex items-center gap-2"
          >
            <Zap size={14} className="text-[#FF9900]" />
            <span className="text-[#565959] text-[12px]">
              Showing results for <strong className="text-[#0F1111]">wireless headphones</strong>. Did you mean{" "}
              <button className="text-[#007185] hover:underline hover:text-[#C7511F]">
                wireless earbuds
              </button>
              ?
            </span>
          </motion.div>

          {/* Product list */}
          {filteredProducts.length === 0 ? (
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="bg-white border border-[#DDD] rounded-lg p-12 text-center"
            >
              <Search size={48} className="text-[#DDD] mx-auto mb-4" />
              <h2 className="text-[#0F1111] text-[20px] font-medium mb-2">
                No results found
              </h2>
              <p className="text-[#565959] text-[14px] mb-4">
                Try adjusting your filters or search for something different.
              </p>
              <button
                onClick={clearFilters}
                className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[13px] font-medium px-6 py-2 rounded-full border border-[#FCD200] transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-6 flex items-center justify-center gap-1"
            >
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-9 h-9 rounded text-[14px] font-medium transition-colors ${
                    page === 1
                      ? "bg-[#FF9900] text-white border border-[#FF9900]"
                      : "bg-white border border-[#DDD] text-[#007185] hover:bg-[#F0F2F2]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="flex items-center gap-1 bg-white border border-[#DDD] text-[#007185] hover:bg-[#F0F2F2] px-3 h-9 rounded text-[14px] transition-colors">
                Next <ChevronRight size={14} />
              </button>
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile filter panel */}
      {filterPanelOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setFilterPanelOpen(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDD] bg-[#232F3E]">
              <h2 className="text-white font-bold text-[16px]">Filters</h2>
              <button
                onClick={() => setFilterPanelOpen(false)}
                className="text-white hover:text-[#FF9900] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prime */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Prime</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primeOnly}
                  onChange={(e) => setPrimeOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#FF9900]"
                />
                <span className="text-[#007185] text-[13px] italic font-bold">prime</span>
              </label>
            </div>

            {/* Price */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Price</h3>
              <ul className="space-y-2">
                {priceRanges.map((range, i) => (
                  <li key={range.label}>
                    <button
                      onClick={() =>
                        setSelectedPriceRange(selectedPriceRange === i ? null : i)
                      }
                      className={`text-[13px] w-full text-left transition-colors ${
                        selectedPriceRange === i
                          ? "text-[#C7511F] font-medium"
                          : "text-[#007185]"
                      }`}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="px-4 py-3 border-b border-[#DDD]">
              <h3 className="text-[#0F1111] font-bold text-[13px] mb-2">Brand</h3>
              <ul className="space-y-2">
                {brandFilters.map((brand) => (
                  <li key={brand}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 accent-[#FF9900]"
                      />
                      <span className="text-[#007185] text-[13px]">{brand}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-4 py-4">
              <button
                onClick={() => {
                  clearFilters();
                  setFilterPanelOpen(false);
                }}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[14px] font-medium py-2.5 rounded-full border border-[#FCD200] transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}