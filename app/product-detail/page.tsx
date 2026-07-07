"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, ChevronDown, ChevronRight, Check, Plus, Minus, AlertCircle } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const product = {
  id: "1",
  title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with MagSafe Charging Case",
  brand: "Apple",
  asin: "B0BDHWDR12",
  price: 189.99,
  originalPrice: 249.99,
  rating: 4.7,
  reviewCount: 84312,
  images: [
    "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    "/images/airpods-pro-case-open.jpg",
    "/images/airpods-pro-side-view.jpg",
    "/images/airpods-pro-in-ear.jpg",
    "/images/airpods-pro-charging.jpg",
  ],
  category: "Electronics",
  isPrime: true,
  badge: "Best Seller",
  inStock: true,
  stockCount: 12,
  soldBy: "Amazon.com",
  description:
    "AirPods Pro feature up to 2x more Active Noise Cancellation than the previous generation, plus Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking. The MagSafe Charging Case delivers over 30 hours of total listening time and is compatible with MagSafe, Qi, and Apple Watch chargers.",
  features: [
    "Active Noise Cancellation reduces unwanted background noise",
    "Adaptive Transparency lets outside sounds in while reducing loud environmental noise",
    "Personalized Spatial Audio with dynamic head tracking places sound all around you",
    "Up to 6 hours of listening time with a single charge (up to 30 hours total with case)",
    "Touch control for volume, media, calls, and Siri",
    "Sweat and water resistant (IPX4 rated)",
    "MagSafe Charging Case with built-in speaker and lanyard loop",
    "Precision Finding for AirPods Pro in the Find My app",
  ],
  specs: [
    { label: "Brand", value: "Apple" },
    { label: "Model", value: "AirPods Pro (2nd Gen)" },
    { label: "Connectivity", value: "Bluetooth 5.3" },
    { label: "Battery Life", value: "Up to 30 hours (with case)" },
    { label: "Water Resistance", value: "IPX4" },
    { label: "Chip", value: "Apple H2" },
    { label: "Weight", value: "5.3g per earbud" },
    { label: "Color", value: "White" },
  ],
  variants: [
    { label: "AirPods (3rd Gen)", price: 149.99 },
    { label: "AirPods Pro (2nd Gen)", price: 189.99, selected: true },
    { label: "AirPods Max", price: 449.99 },
  ],
};

const reviews = [
  {
    id: "r1",
    author: "Sarah M.",
    rating: 5,
    title: "Best earbuds I've ever owned",
    date: "December 12, 2024",
    verified: true,
    body: "The noise cancellation on these is absolutely incredible. I use them on my daily commute and they block out everything. The sound quality is crystal clear and the fit is comfortable even after hours of use. Battery life is excellent too.",
    helpful: 342,
  },
  {
    id: "r2",
    author: "James T.",
    rating: 4,
    title: "Great upgrade from the previous gen",
    date: "November 28, 2024",
    verified: true,
    body: "Significant improvement over the first generation AirPods Pro. The adaptive transparency mode is a game changer for walking around the city. My only minor complaint is the case feels a bit slippery, but that's a small issue.",
    helpful: 218,
  },
  {
    id: "r3",
    author: "Linda K.",
    rating: 5,
    title: "Worth every penny",
    date: "November 15, 2024",
    verified: true,
    body: "I was hesitant about the price but these are absolutely worth it. The personalized spatial audio is mind-blowing for movies and music. They pair instantly with all my Apple devices and the call quality is superb.",
    helpful: 189,
  },
  {
    id: "r4",
    author: "Marcus R.",
    rating: 3,
    title: "Good but not perfect",
    date: "October 30, 2024",
    verified: false,
    body: "Sound quality is great and ANC works well. However, I find the ear tips don't fit my ears perfectly and they fall out occasionally during workouts. The case is nice and compact. Overall a solid product but not flawless.",
    helpful: 97,
  },
];

const relatedProducts = [
  {
    id: "rp1",
    title: "Apple AirPods (3rd Generation)",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.5,
    reviewCount: 52341,
    image: "/images/apple-airpods-3rd-gen.jpg",
    isPrime: true,
  },
  {
    id: "rp2",
    title: "Sony WF-1000XM5 Wireless Earbuds",
    price: 248.00,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 18920,
    image: "/images/sony-wf1000xm5-earbuds.jpg",
    isPrime: true,
  },
  {
    id: "rp3",
    title: "Bose QuietComfort Earbuds II",
    price: 199.00,
    originalPrice: 279.00,
    rating: 4.4,
    reviewCount: 14230,
    image: "/images/bose-quietcomfort-earbuds.jpg",
    isPrime: true,
  },
  {
    id: "rp4",
    title: "Samsung Galaxy Buds2 Pro",
    price: 149.99,
    originalPrice: 229.99,
    rating: 4.3,
    reviewCount: 22100,
    image: "/images/samsung-galaxy-buds2-pro.jpg",
    isPrime: false,
  },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-[#CDCDCD] fill-[#CDCDCD]"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star size={size} className="text-[#FF9900] fill-[#FF9900]" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}

const ratingBreakdown = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 3 },
];

export default function ProductDetailPage() {
  const t = useTranslations();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("features");
  const [reviewFilter, setReviewFilter] = useState("all");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E7E7E7]">
        <div className="max-w-[1500px] mx-auto px-4 py-2">
          <nav className="flex items-center gap-1 text-[13px] text-[#007185] flex-wrap">
            <Link href="/" className="hover:text-[#C7511F] hover:underline">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight size={12} className="text-[#555]" />
            <Link href="/search?category=electronics" className="hover:text-[#C7511F] hover:underline">
              {t("breadcrumb.electronics")}
            </Link>
            <ChevronRight size={12} className="text-[#555]" />
            <Link href="/search?category=headphones" className="hover:text-[#C7511F] hover:underline">
              {t("breadcrumb.headphones")}
            </Link>
            <ChevronRight size={12} className="text-[#555]" />
            <span className="text-[#555] truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Main product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-8">
          {/* Image gallery */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex flex-col-reverse md:flex-row gap-3 lg:w-[500px]"
          >
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
              {product.images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded border-2 overflow-hidden transition-colors ${
                    selectedImage === i
                      ? "border-[#FF9900]"
                      : "border-[#CDCDCD] hover:border-[#FF9900]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg";
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex-1 relative bg-white rounded-xl overflow-hidden border border-[#E7E7E7] flex items-center justify-center"
              style={{ minHeight: 380 }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain max-h-[420px] p-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg";
                }}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {product.badge}
                </span>
              )}
            </motion.div>
          </motion.div>

          {/* Product info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {/* Title */}
            <h1 className="text-[21px] font-medium text-[#0F1111] leading-snug">
              {product.title}
            </h1>

            {/* Brand */}
            <p className="text-[13px] text-[#555]">
              {t("product.by")}{" "}
              <Link href="#" className="text-[#007185] hover:text-[#C7511F] hover:underline">
                {product.brand}
              </Link>
            </p>

            {/* Rating row */}
            <div className="flex items-center gap-2 flex-wrap">
              <StarRating rating={product.rating} size={18} />
              <Link
                href="#reviews"
                className="text-[#007185] text-[14px] hover:text-[#C7511F] hover:underline"
              >
                {(product.reviewCount ?? 0).toLocaleString("en-US")} {t("product.ratings")}
              </Link>
              <span className="text-[#555] text-[13px]">|</span>
              <Link href="#" className="text-[#007185] text-[13px] hover:underline">
                {t("product.answeredQuestions")}
              </Link>
            </div>

            {/* Amazon's Choice badge */}
            <div className="flex items-center gap-2">
              <span className="bg-[#232F3E] text-white text-[11px] px-2 py-0.5 rounded">
                Amazon&apos;s Choice
              </span>
              <span className="text-[13px] text-[#555]">
                {t("product.inCategory")} <Link href="#" className="text-[#007185] hover:underline">Wireless Earbuds</Link>
              </span>
            </div>

            <div className="border-t border-[#E7E7E7] my-1" />

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-[13px] text-[#555]">{t("product.price")}</span>
              <span className="text-[28px] font-medium text-[#0F1111]">
                <sup className="text-[16px] align-super">$</sup>
                {Math.floor(product.price)}
                <sup className="text-[16px] align-super">
                  {String((product.price % 1).toFixed(2)).slice(1)}
                </sup>
              </span>
              {product.originalPrice && (
                <span className="text-[14px] text-[#555]">
                  {t("product.listPrice")}{" "}
                  <span className="line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </span>
              )}
              {discount > 0 && (
                <span className="text-[14px] text-[#CC0C39] font-medium">
                  ({discount}% {t("product.off")})
                </span>
              )}
            </div>

            {/* Prime */}
            {product.isPrime && (
              <div className="flex items-center gap-2">
                <span className="text-[#00A8E1] font-bold text-[16px] italic">prime</span>
                <span className="text-[13px] text-[#555]">
                  {t("product.freeDelivery")}{" "}
                  <Link href="#" className="text-[#007185] font-bold hover:underline">
                    {t("product.tomorrow")}
                  </Link>
                </span>
              </div>
            )}

            {/* Variants */}
            <div>
              <p className="text-[13px] font-bold text-[#0F1111] mb-2">{t("product.style")}</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    className={`border rounded px-3 py-2 text-[13px] transition-colors ${
                      v.selected
                        ? "border-[#FF9900] bg-[#FFF8EE] text-[#0F1111] font-medium"
                        : "border-[#CDCDCD] text-[#555] hover:border-[#FF9900]"
                    }`}
                  >
                    <span className="block font-medium">{v.label}</span>
                    <span className="block text-[12px]">${v.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-[13px] font-bold text-[#0F1111] mb-2">{t("product.aboutItem")}</p>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#0F1111]">
                    <span className="mt-1 text-[#555]">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sold by */}
            <p className="text-[13px] text-[#555]">
              {t("product.soldBy")}{" "}
              <Link href="#" className="text-[#007185] hover:underline">
                {product.soldBy}
              </Link>
            </p>
          </motion.div>

          {/* Buy box */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:w-[280px] w-full"
          >
            <div className="border border-[#D5D9D9] rounded-xl p-5 shadow-[0_2px_5px_rgba(15,17,17,0.15)] sticky top-[80px]">
              {/* Price */}
              <div className="text-[24px] font-medium text-[#0F1111] mb-1">
                ${product.price.toFixed(2)}
              </div>

              {/* Prime delivery */}
              {product.isPrime && (
                <div className="text-[13px] text-[#555] mb-3">
                  <span className="text-[#00A8E1] font-bold italic">prime</span>{" "}
                  {t("product.freeDelivery")}{" "}
                  <span className="font-bold text-[#0F1111]">{t("product.tomorrow")}</span>
                </div>
              )}

              {/* Delivery info */}
              <div className="flex items-start gap-2 mb-3">
                <Truck size={16} className="text-[#555] mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-[#555]">
                  {t("product.deliverTo")}{" "}
                  <Link href="#" className="text-[#007185] hover:underline font-medium">
                    {t("product.updateLocation")}
                  </Link>
                </p>
              </div>

              {/* Stock */}
              <div className="mb-3">
                {product.inStock ? (
                  <span className="text-[#007600] text-[16px] font-medium">
                    {t("product.inStock")}
                  </span>
                ) : (
                  <span className="text-[#CC0C39] text-[16px] font-medium">
                    {t("product.outOfStock")}
                  </span>
                )}
                {product.inStock && product.stockCount <= 15 && (
                  <p className="text-[#CC0C39] text-[13px] mt-0.5">
                    {t("product.onlyLeft", { count: product.stockCount })}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[13px] text-[#555]">{t("product.qty")}</span>
                <div className="flex items-center border border-[#D5D9D9] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 bg-[#F0F2F2] hover:bg-[#E3E6E6] transition-colors text-[#0F1111]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-1.5 text-[14px] font-medium text-[#0F1111] bg-white min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3 py-1.5 bg-[#F0F2F2] hover:bg-[#E3E6E6] transition-colors text-[#0F1111]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-medium text-[14px] py-2.5 rounded-full transition-colors mb-2 shadow-[0_2px_5px_rgba(213,217,217,0.5)]"
              >
                {t("product.addToCart")}
              </motion.button>

              {/* Buy now */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] font-medium text-[14px] py-2.5 rounded-full transition-colors mb-4 shadow-[0_2px_5px_rgba(213,217,217,0.5)]"
              >
                {t("product.buyNow")}
              </motion.button>

              {/* Secure transaction */}
              <div className="flex items-center gap-1.5 text-[12px] text-[#555] mb-3">
                <Shield size={13} />
                <span>{t("product.secureTransaction")}</span>
              </div>

              <div className="space-y-1 text-[13px] text-[#555]">
                <div className="flex gap-2">
                  <span className="font-medium text-[#0F1111] w-20 flex-shrink-0">{t("product.ships")}</span>
                  <Link href="#" className="text-[#007185] hover:underline">Amazon.com</Link>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-[#0F1111] w-20 flex-shrink-0">{t("product.soldByLabel")}</span>
                  <Link href="#" className="text-[#007185] hover:underline">{product.soldBy}</Link>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-[#0F1111] w-20 flex-shrink-0">{t("product.returns")}</span>
                  <Link href="#" className="text-[#007185] hover:underline">{t("product.returnsPolicy")}</Link>
                </div>
              </div>

              <div className="border-t border-[#E7E7E7] mt-4 pt-3 flex gap-4">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className="flex items-center gap-1.5 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                >
                  <Heart
                    size={14}
                    className={wishlisted ? "fill-[#CC0C39] text-[#CC0C39]" : ""}
                  />
                  {t("product.addToList")}
                </button>
                <button className="flex items-center gap-1.5 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors">
                  <Share2 size={14} />
                  {t("product.share")}
                </button>
              </div>
            </div>

            {/* Return policy card */}
            <div className="border border-[#D5D9D9] rounded-xl p-4 mt-3 text-[13px] text-[#555]">
              <div className="flex items-start gap-2 mb-2">
                <RotateCcw size={15} className="text-[#555] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#0F1111]">{t("product.freeReturns")}</p>
                  <p>{t("product.freeReturnsDesc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield size={15} className="text-[#555] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-[#0F1111]">{t("product.paymentSecurity")}</p>
                  <p>{t("product.paymentSecurityDesc")}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product details accordion */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 border-t border-[#E7E7E7] pt-6"
        >
          <h2 className="text-[21px] font-medium text-[#0F1111] mb-4">
            {t("product.productDetails")}
          </h2>

          {/* Specs table */}
          <div className="max-w-[700px]">
            {product.specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex py-2 text-[14px] ${
                  i % 2 === 0 ? "bg-[#F7F8F8]" : "bg-white"
                }`}
              >
                <span className="w-[200px] flex-shrink-0 font-medium text-[#0F1111] px-3">
                  {spec.label}
                </span>
                <span className="text-[#555] px-3">{spec.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Expandable sections */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 space-y-2 max-w-[900px]"
        >
          {[
            {
              id: "features",
              title: t("product.aboutItem"),
              content: (
                <ul className="space-y-2 py-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-[#0F1111]">
                      <Check size={16} className="text-[#007600] mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "description",
              title: t("product.productDescription"),
              content: (
                <p className="text-[14px] text-[#555] leading-relaxed py-3">
                  {product.description}
                </p>
              ),
            },
          ].map((section) => (
            <motion.div
              key={section.id}
              variants={fadeInUp}
              className="border border-[#E7E7E7] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-4 bg-[#F7F8F8] hover:bg-[#EAEDED] transition-colors text-left"
              >
                <span className="font-medium text-[16px] text-[#0F1111]">
                  {section.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-[#555] transition-transform duration-200 ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSection === section.id && (
                <div className="px-5 border-t border-[#E7E7E7]">{section.content}</div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews section */}
        <motion.section
          id="reviews"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#E7E7E7] pt-8"
        >
          <h2 className="text-[21px] font-medium text-[#0F1111] mb-6">
            {t("product.customerReviews")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Rating summary */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[48px] font-medium text-[#0F1111]">
                  {product.rating.toFixed(1)}
                </span>
                <div>
                  <StarRating rating={product.rating} size={20} />
                  <p className="text-[13px] text-[#555] mt-1">
                    {t("product.outOf5Stars")}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 mb-6">
                {ratingBreakdown.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2">
                    <Link
                      href="#"
                      className="text-[#007185] text-[13px] hover:underline whitespace-nowrap"
                    >
                      {row.stars} {t("product.star")}
                    </Link>
                    <div className="flex-1 h-3 bg-[#E7E7E7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF9900] rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-[#007185] text-[13px] w-8 text-right">
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E7E7E7] pt-4">
                <p className="text-[14px] font-medium text-[#0F1111] mb-1">
                  {t("product.reviewThisProduct")}
                </p>
                <p className="text-[13px] text-[#555] mb-3">
                  {t("product.shareThoughts")}
                </p>
                <button className="w-full border border-[#D5D9D9] rounded-lg py-2 text-[13px] text-[#0F1111] hover:bg-[#F7F8F8] transition-colors">
                  {t("product.writeReview")}
                </button>
              </div>
            </div>

            {/* Review list */}
            <div>
              {/* Filter */}
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-[14px] text-[#555]">{t("product.filterBy")}</span>
                {["all", "5", "4", "3", "2", "1"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`text-[13px] px-3 py-1 rounded-full border transition-colors ${
                      reviewFilter === f
                        ? "border-[#FF9900] bg-[#FFF8EE] text-[#0F1111] font-medium"
                        : "border-[#D5D9D9] text-[#007185] hover:border-[#FF9900]"
                    }`}
                  >
                    {f === "all" ? t("product.allStars") : `${f} ${t("product.star")}`}
                  </button>
                ))}
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {reviews
                  .filter(
                    (r) =>
                      reviewFilter === "all" ||
                      r.rating === parseInt(reviewFilter)
                  )
                  .map((review) => (
                    <motion.div
                      key={review.id}
                      variants={fadeInUp}
                      className="border-b border-[#E7E7E7] pb-6 last:border-0"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#E7E7E7] flex items-center justify-center text-[14px] font-medium text-[#555]">
                          {review.author.charAt(0)}
                        </div>
                        <span className="text-[14px] font-medium text-[#0F1111]">
                          {review.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} size={15} />
                        <span className="text-[14px] font-medium text-[#0F1111]">
                          {review.title}
                        </span>
                      </div>

                      <p className="text-[13px] text-[#555] mb-2">
                        {t("product.reviewedOn")} {review.date}
                        {review.verified && (
                          <span className="ml-2 text-[#C45500]">
                            {t("product.verifiedPurchase")}
                          </span>
                        )}
                      </p>

                      <p className="text-[14px] text-[#0F1111] leading-relaxed mb-3">
                        {review.body}
                      </p>

                      <div className="flex items-center gap-3 text-[13px] text-[#555]">
                        <span>{t("product.helpfulQuestion")}</span>
                        <button className="border border-[#D5D9D9] rounded px-3 py-0.5 hover:bg-[#F7F8F8] transition-colors text-[#0F1111]">
                          {t("product.yes")} ({review.helpful})
                        </button>
                        <button className="border border-[#D5D9D9] rounded px-3 py-0.5 hover:bg-[#F7F8F8] transition-colors text-[#0F1111]">
                          {t("product.no")}
                        </button>
                        <button className="text-[#007185] hover:underline">
                          {t("product.report")}
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Related products */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#E7E7E7] pt-8"
        >
          <h2 className="text-[21px] font-medium text-[#0F1111] mb-5">
            {t("product.customersAlsoBought")}
          </h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {relatedProducts.map((rp) => (
              <motion.div
                key={rp.id}
                variants={scaleIn}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="border border-[#E7E7E7] rounded-xl p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer bg-white"
              >
                <div className="aspect-square bg-[#F7F8F8] rounded-lg overflow-hidden mb-3">
                  <img
                    src={rp.image}
                    alt={rp.title}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg";
                    }}
                  />
                </div>
                <p className="text-[13px] text-[#0F1111] line-clamp-2 mb-1 leading-snug">
                  {rp.title}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  <StarRating rating={rp.rating} size={13} />
                  <span className="text-[12px] text-[#007185]">
                    {(rp.reviewCount ?? 0).toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[16px] font-medium text-[#0F1111]">
                    ${rp.price.toFixed(2)}
                  </span>
                  {rp.originalPrice && (
                    <span className="text-[12px] text-[#555] line-through">
                      ${rp.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {rp.isPrime && (
                  <span className="text-[#00A8E1] font-bold text-[12px] italic">
                    prime
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Frequently bought together */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#E7E7E7] pt-8 mb-12"
        >
          <h2 className="text-[21px] font-medium text-[#0F1111] mb-5">
            {t("product.frequentlyBoughtTogether")}
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              {[
                {
                  img: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
                  title: "AirPods Pro (2nd Gen)",
                  price: 189.99,
                },
                {
                  img: "/images/apple-magsafe-charger.jpg",
                  title: "Apple MagSafe Charger",
                  price: 38.99,
                },
                {
                  img: "/images/airpods-pro-case-cover.jpg",
                  title: "AirPods Pro Case Cover",
                  price: 12.99,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-24 h-24 bg-[#F7F8F8] rounded-lg overflow-hidden border border-[#E7E7E7] flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg";
                      }}
                    />
                  </div>
                  {i < 2 && (
                    <Plus size={20} className="text-[#555] flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F7F8F8] rounded-xl p-5 min-w-[220px]">
              <p className="text-[14px] text-[#555] mb-1">{t("product.totalPrice")}</p>
              <p className="text-[24px] font-medium text-[#0F1111] mb-3">
                ${(189.99 + 38.99 + 12.99).toFixed(2)}
              </p>
              <div className="space-y-1.5 mb-4">
                {[
                  "AirPods Pro (2nd Gen)",
                  "Apple MagSafe Charger",
                  "AirPods Pro Case Cover",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-[13px] text-[#0F1111] cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-[#FF9900]"
                      readOnly
                    />
                    {item}
                  </label>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-medium text-[14px] py-2.5 rounded-full transition-colors"
              >
                {t("product.addAllToCart")}
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Alert banner */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="fixed bottom-6 right-6 bg-[#232F3E] text-white rounded-xl px-5 py-3 shadow-xl flex items-center gap-3 z-40 max-w-[320px]"
        >
          <AlertCircle size={18} className="text-[#FF9900] flex-shrink-0" />
          <p className="text-[13px]">
            {t("product.limitedTimeOffer")}
          </p>
          <button
            onClick={() => {}}
            className="text-[#FF9900] text-[13px] font-medium hover:underline flex-shrink-0"
          >
            {t("product.shopNow")}
          </button>
        </motion.div>
      </div>
    </main>
  );
}