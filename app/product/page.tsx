"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Zap, Shield, RotateCcw, Truck, ChevronRight, Heart, Share2, Check, Minus, Plus, ThumbsUp } from 'lucide-react';
import { products, sampleReviews } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

const product = products[0];

const galleryImages = [
  product.image,
  "/images/airpods-pro-case-open.jpg",
  "/images/airpods-pro-ear-tip.jpg",
  "/images/airpods-pro-charging.jpg",
  "/images/airpods-pro-box-contents.jpg",
];

const colorOptions = ["White", "Midnight", "Starlight"];

const technicalDetails = [
  { label: "Brand", value: "Apple" },
  { label: "Model", value: "AirPods Pro (2nd Gen)" },
  { label: "Connectivity", value: "Bluetooth 5.3" },
  { label: "Battery Life", value: "Up to 30 hours total" },
  { label: "Water Resistance", value: "IPX4" },
  { label: "Chip", value: "Apple H2" },
  { label: "Weight", value: "5.3 g (each earbud)" },
  { label: "Warranty", value: "1 Year Limited" },
];

function StarRating({
  rating,
  size = 16,
  showNumber = false,
}: {
  rating: number;
  size?: number;
  showNumber?: boolean;
}) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        return (
          <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="text-[#DDDDDD]"
              fill="#DDDDDD"
              strokeWidth={0}
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating - Math.floor(rating)) * 100}%` }}
              >
                <Star
                  size={size}
                  className="text-[#FF9900]"
                  fill="#FF9900"
                  strokeWidth={0}
                />
              </span>
            )}
          </span>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm text-[#FF9900] font-medium">{rating.toFixed(1)}</span>
      )}
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
  const [selectedColor, setSelectedColor] = useState("White");
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <motion.nav
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-[#EDEDED] px-4 py-2"
      >
        <div className="max-w-[1500px] mx-auto flex items-center gap-1 text-[12px] text-[#007185] flex-wrap">
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
        </div>
      </motion.nav>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        {/* Top section: gallery + info + buy box */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-8">
          {/* Image Gallery */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="flex gap-3"
          >
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedImage(i)}
                  className={`w-[54px] h-[54px] rounded border-2 overflow-hidden flex-shrink-0 transition-all duration-150 ${
                    selectedImage === i
                      ? "border-[#FF9900]"
                      : "border-[#DDDDDD] hover:border-[#FF9900]"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = product.image;
                    }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Main image */}
            <motion.div
              key={selectedImage}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative w-[340px] h-[400px] md:w-[420px] md:h-[480px] rounded-lg overflow-hidden border border-[#EDEDED] bg-[#FAFAFA] flex items-center justify-center"
            >
              <img
                src={galleryImages[selectedImage] ?? product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = product.image;
                }}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {product.badge}
                </span>
              )}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-[#DDDDDD] flex items-center justify-center shadow-sm hover:bg-[#FFF3E0] transition-colors"
              >
                <Heart
                  size={16}
                  className={wishlisted ? "text-[#CC0C39] fill-[#CC0C39]" : "text-[#555]"}
                />
              </button>
            </motion.div>
          </motion.div>

          {/* Product Info Panel */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3 min-w-0"
          >
            {/* Title */}
            <h1 className="text-[20px] md:text-[22px] font-medium text-[#0F1111] leading-snug text-pretty">
              {product.title}
            </h1>

            {/* Brand */}
            <p className="text-[13px] text-[#555]">
              {t("product.by")}{" "}
              <Link href="/search?brand=apple" className="text-[#007185] hover:text-[#C7511F] hover:underline">
                Apple
              </Link>
            </p>

            {/* Rating row */}
            <div className="flex items-center gap-2 flex-wrap">
              <StarRating rating={product.rating} size={18} />
              <Link
                href="#reviews"
                className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline"
              >
                {product.reviewCount.toLocaleString("en-US")} {t("product.ratings")}
              </Link>
              <span className="text-[#DDDDDD]">|</span>
              <Link href="#reviews" className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline">
                {t("product.answeredQuestions")}
              </Link>
            </div>

            <div className="border-t border-[#EDEDED] pt-3" />

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {discount > 0 && (
                <span className="text-[#CC0C39] text-[14px] font-medium">
                  -{discount}%
                </span>
              )}
              <span className="text-[28px] font-medium text-[#0F1111]">
                <sup className="text-[16px] align-super">$</sup>
                {Math.floor(product.price)}
                <sup className="text-[16px] align-super">
                  {String(Math.round((product.price % 1) * 100)).padStart(2, "0")}
                </sup>
              </span>
            </div>
            {product.originalPrice && (
              <p className="text-[13px] text-[#555] -mt-2">
                {t("product.listPrice")}{" "}
                <span className="line-through">${product.originalPrice.toFixed(2)}</span>
              </p>
            )}

            {/* Prime badge */}
            {product.isPrime && (
              <div className="flex items-center gap-2">
                <span className="bg-[#00A8E0] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
                  prime
                </span>
                <span className="text-[13px] text-[#007185]">
                  {t("product.freeDelivery")}
                </span>
              </div>
            )}

            {/* Color selector */}
            <div>
              <p className="text-[13px] font-bold text-[#0F1111] mb-2">
                {t("product.color")}:{" "}
                <span className="font-normal">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-[13px] rounded border-2 transition-all duration-150 ${
                      selectedColor === color
                        ? "border-[#FF9900] bg-[#FFF3E0] text-[#0F1111] font-medium"
                        : "border-[#DDDDDD] text-[#555] hover:border-[#FF9900]"
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* About this item */}
            <div className="border-t border-[#EDEDED] pt-3">
              <h2 className="text-[15px] font-bold text-[#0F1111] mb-2">
                {t("product.aboutThisItem")}
              </h2>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-1.5"
              >
                {(product.features ?? []).map((feature, i) => (
                  <motion.li
                    key={i}
                    variants={fadeInUp}
                    className="flex items-start gap-2 text-[13px] text-[#0F1111]"
                  >
                    <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#FF9900]/10 flex items-center justify-center">
                      <Check size={10} className="text-[#FF9900]" strokeWidth={3} />
                    </span>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2 pt-1">
              <button className="flex items-center gap-1.5 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors">
                <Share2 size={14} />
                {t("product.share")}
              </button>
            </div>
          </motion.div>

          {/* Buy Box */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0"
          >
            <div className="border border-[#DDDDDD] rounded-lg p-4 flex flex-col gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-[22px] font-medium text-[#0F1111]">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Prime delivery */}
              {product.isPrime && (
                <div className="flex items-start gap-1.5">
                  <Truck size={14} className="text-[#007185] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#007185] font-medium">
                      {t("buyBox.freeDelivery")}
                    </p>
                    <p className="text-[12px] text-[#555]">{t("buyBox.deliveryDate")}</p>
                  </div>
                </div>
              )}

              {/* In stock */}
              <p className="text-[16px] text-[#007600] font-medium">
                {product.inStock ? t("buyBox.inStock") : t("buyBox.outOfStock")}
              </p>

              {/* Quantity */}
              <div>
                <p className="text-[12px] text-[#555] mb-1">{t("buyBox.quantity")}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F3F3F3] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-[15px] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-8 h-8 rounded border border-[#DDDDDD] flex items-center justify-center hover:bg-[#F3F3F3] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`w-full py-2 rounded-full text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  addedToCart
                    ? "bg-[#5cb85c] text-white"
                    : "bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111]"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={16} />
                    {t("buyBox.added")}
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    {t("buyBox.addToCart")}
                  </>
                )}
              </motion.button>

              {/* Buy Now */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 rounded-full bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] text-[14px] font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap size={16} />
                {t("buyBox.buyNow")}
              </motion.button>

              {/* Sold by */}
              <div className="text-[12px] text-[#555] space-y-0.5">
                <p>
                  {t("buyBox.soldBy")}{" "}
                  <Link href="/" className="text-[#007185] hover:underline">
                    {product.soldBy}
                  </Link>
                </p>
                <p>
                  {t("buyBox.shipsFrom")}{" "}
                  <span className="text-[#0F1111]">Amazon</span>
                </p>
              </div>

              {/* Trust badges */}
              <div className="border-t border-[#EDEDED] pt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[12px] text-[#555]">
                  <Shield size={14} className="text-[#007185] flex-shrink-0" />
                  {t("buyBox.secureTransaction")}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#555]">
                  <RotateCcw size={14} className="text-[#007185] flex-shrink-0" />
                  {t("buyBox.freeReturns")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Details */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#EDEDED] pt-8"
        >
          <h2 className="text-[20px] font-bold text-[#0F1111] mb-4">
            {t("product.technicalDetails")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-[700px] text-[13px]">
              <tbody>
                {technicalDetails.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-[#F7F7F7]" : "bg-white"}
                  >
                    <td className="py-2.5 px-4 font-medium text-[#0F1111] w-[200px]">
                      {row.label}
                    </td>
                    <td className="py-2.5 px-4 text-[#555]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Full About This Item */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 border-t border-[#EDEDED] pt-8"
        >
          <h2 className="text-[20px] font-bold text-[#0F1111] mb-4">
            {t("product.productDescription")}
          </h2>
          <div className="max-w-[700px]">
            <p className="text-[14px] text-[#0F1111] leading-relaxed mb-4">
              {product.description}
            </p>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {(product.features ?? []).map((feature, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-2 text-[14px] text-[#0F1111]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF9900] flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        {/* Customer Reviews */}
        <motion.section
          id="reviews"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#EDEDED] pt-8"
        >
          <h2 className="text-[20px] font-bold text-[#0F1111] mb-6">
            {t("product.customerReviews")}
          </h2>

          {/* Rating summary */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
              <span className="text-[48px] font-medium text-[#0F1111] leading-none">
                {product.rating.toFixed(1)}
              </span>
              <StarRating rating={product.rating} size={20} />
              <span className="text-[13px] text-[#555]">
                {t("product.outOf5")}
              </span>
            </div>
            <div className="flex-1 max-w-[400px] space-y-1.5">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-2">
                  <Link
                    href="#reviews"
                    className="text-[#007185] text-[13px] hover:underline whitespace-nowrap"
                  >
                    {row.stars} {t("product.star")}
                  </Link>
                  <div className="flex-1 h-3 bg-[#EDEDED] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                      className="h-full bg-[#FF9900] rounded-full"
                    />
                  </div>
                  <span className="text-[#007185] text-[13px] w-8 text-right">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {(sampleReviews ?? []).map((review) => (
              <motion.div
                key={review.id}
                variants={scaleIn}
                whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
                className="border border-[#EDEDED] rounded-lg p-4 flex flex-col gap-3 bg-white transition-all duration-200"
              >
                {/* Reviewer */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-[#FF9900]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[15px] font-bold text-[#FF9900]">
                      {(review.author ?? "A").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0F1111]">{review.author ?? "Anonymous"}</p>
                    {review.verified && (
                      <p className="text-[11px] text-[#C7511F]">
                        {t("review.verifiedPurchase")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stars + title */}
                <div>
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-[14px] font-bold text-[#0F1111] mt-1">
                    {review.title}
                  </p>
                </div>

                {/* Date */}
                <p className="text-[12px] text-[#555]">
                  {t("review.reviewedIn")} {review.date}
                </p>

                {/* Body */}
                <p className="text-[13px] text-[#0F1111] leading-relaxed flex-1">
                  {review.body}
                </p>

                {/* Helpful */}
                <div className="flex items-center gap-2 pt-1 border-t border-[#EDEDED]">
                  <span className="text-[12px] text-[#555]">
                    {(review as unknown as Record<string, unknown>)['helpful'] as number | undefined ?? 0} {t("review.foundHelpful")}
                  </span>
                  <button className="flex items-center gap-1 text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors ml-auto">
                    <ThumbsUp size={12} />
                    {t("review.helpful")}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* See all reviews CTA */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6"
          >
            <Link
              href="/search?filter=reviews"
              className="inline-flex items-center gap-1.5 text-[14px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
            >
              {t("review.seeAllReviews")}
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </motion.section>

        {/* Related products teaser */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 border-t border-[#EDEDED] pt-8 pb-8"
        >
          <h2 className="text-[20px] font-bold text-[#0F1111] mb-5">
            {t("product.customersAlsoBought")}
          </h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {(products ?? []).slice(1, 6).map((p) => (
              <motion.div
                key={p.id}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                className="flex flex-col gap-2 cursor-pointer group"
              >
                <div className="aspect-square rounded-lg border border-[#EDEDED] overflow-hidden bg-[#FAFAFA] flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/product-placeholder.jpg";
                    }}
                  />
                </div>
                <p className="text-[13px] text-[#0F1111] line-clamp-2 leading-snug group-hover:text-[#C7511F] transition-colors">
                  {p.title}
                </p>
                <div className="flex items-center gap-1">
                  <StarRating rating={p.rating} size={12} />
                  <span className="text-[11px] text-[#555]">
                    ({(p.reviewCount ?? 0).toLocaleString("en-US")})
                  </span>
                </div>
                <p className="text-[14px] font-medium text-[#0F1111]">
                  ${(p.price ?? 0).toFixed(2)}
                </p>
                {p.isPrime && (
                  <span className="text-[10px] font-bold text-[#00A8E0] tracking-wide">
                    prime
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
