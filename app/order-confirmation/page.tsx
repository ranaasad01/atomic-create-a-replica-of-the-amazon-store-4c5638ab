"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { CheckCircle, Package, Truck, MapPin, CreditCard, Star, ChevronRight, Download, Share2 } from 'lucide-react';
import Link from "next/link";
import { useTranslations } from "next-intl";

const orderData = {
  orderId: "113-4829301-7654321",
  orderDate: "January 15, 2025",
  estimatedDelivery: "January 18–20, 2025",
  status: "confirmed",
  shippingAddress: {
    name: "John Smith",
    line1: "123 Maple Street",
    line2: "Apt 4B",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "United States",
  },
  paymentMethod: {
    type: "Visa",
    last4: "4242",
    billingZip: "98101",
  },
  items: [
    {
      id: "1",
      title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
      price: 189.99,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
      seller: "Amazon.com",
      isPrime: true,
      badge: "Best Seller",
    },
    {
      id: "2",
      title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display",
      price: 139.99,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
      seller: "Amazon.com",
      isPrime: true,
      badge: "Amazon's Choice",
    },
    {
      id: "3",
      title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
      price: 79.95,
      quantity: 2,
      image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
      seller: "Instant Brands",
      isPrime: true,
      badge: "Best Seller",
    },
  ],
  subtotal: 489.88,
  shipping: 0,
  tax: 44.09,
  total: 533.97,
  promoApplied: "SAVE10",
  promoDiscount: 10.0,
};

const recommendedProducts = [
  {
    id: "r1",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 279.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 34210,
    image: "/images/sony-noise-canceling-headphones.jpg",
    isPrime: true,
  },
  {
    id: "r2",
    title: "Anker 65W USB-C Charger, Compact Fast Charger",
    price: 35.99,
    originalPrice: 45.99,
    rating: 4.7,
    reviewCount: 18920,
    image: "/images/anker-usb-c-fast-charger.jpg",
    isPrime: true,
  },
  {
    id: "r3",
    title: "Echo Dot (5th Gen) Smart Speaker with Alexa",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 52341,
    image: "https://crdms.images.consumerreports.org/f_auto,w_1200/prod/products/cr/models/407823-smart-speakers-amazon-echo-dot-5th-gen-w-clock-10033746.png",
    isPrime: true,
  },
  {
    id: "r4",
    title: "Apple MagSafe Charger — 1 Meter Cable",
    price: 38.00,
    originalPrice: 39.00,
    rating: 4.5,
    reviewCount: 9812,
    image: "/images/apple-magsafe-charger-cable.jpg",
    isPrime: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={
            star <= Math.round(rating)
              ? "fill-[#FF9900] text-[#FF9900]"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

const steps = [
  { label: "Order Placed", icon: CheckCircle, done: true },
  { label: "Processing", icon: Package, done: true },
  { label: "Shipped", icon: Truck, done: false },
  { label: "Delivered", icon: MapPin, done: false },
];

export default function OrderConfirmationPage() {
  const t = useTranslations();

  const itemTotal = (orderData.items ?? []).reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      {/* Success Banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-[#D5D9D9]"
      >
        <div className="max-w-[1000px] mx-auto px-4 py-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <CheckCircle size={48} className="text-[#067D62]" />
            </motion.div>
            <div>
              <h1 className="text-[28px] font-normal text-[#067D62] leading-tight">
                {t("orderConfirmation.title")}
              </h1>
              <p className="text-[14px] text-[#565959] mt-1">
                {t("orderConfirmation.subtitle")}{" "}
                <span className="font-bold text-[#0F1111]">
                  {orderData.orderId}
                </span>
              </p>
              <p className="text-[13px] text-[#565959] mt-0.5">
                {t("orderConfirmation.emailSent")}
              </p>
            </div>
            <div className="sm:ml-auto flex gap-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-[13px] text-[#0066C0] hover:text-[#C45500] hover:underline transition-colors"
              >
                <Download size={14} />
                {t("orderConfirmation.downloadReceipt")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-1.5 text-[13px] text-[#0066C0] hover:text-[#C45500] hover:underline transition-colors"
              >
                <Share2 size={14} />
                {t("orderConfirmation.share")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-[1000px] mx-auto px-4 py-6 space-y-4">
        {/* Order Progress */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="bg-white border border-[#D5D9D9] rounded-[4px] p-6"
        >
          <h2 className="text-[18px] font-bold text-[#0F1111] mb-1">
            {t("orderConfirmation.trackOrder")}
          </h2>
          <p className="text-[13px] text-[#565959] mb-6">
            {t("orderConfirmation.estimatedDelivery")}{" "}
            <span className="font-bold text-[#0F1111]">
              {orderData.estimatedDelivery}
            </span>
          </p>

          <div className="relative flex items-center justify-between">
            {/* Progress line */}
            <div className="absolute left-0 right-0 top-5 h-[2px] bg-[#D5D9D9] z-0" />
            <div
              className="absolute left-0 top-5 h-[2px] bg-[#067D62] z-0 transition-all duration-700"
              style={{ width: "40%" }}
            />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative z-10 flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      step.done
                        ? "bg-[#067D62] border-[#067D62]"
                        : "bg-white border-[#D5D9D9]"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={step.done ? "text-white" : "text-[#AAAAAA]"}
                    />
                  </div>
                  <span
                    className={`text-[12px] font-medium text-center leading-tight ${
                      step.done ? "text-[#067D62]" : "text-[#565959]"
                    }`}
                  >
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main content: items + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Items */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
            className="lg:col-span-2 bg-white border border-[#D5D9D9] rounded-[4px] p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px] font-bold text-[#0F1111]">
                {t("orderConfirmation.orderItems")}
              </h2>
              <span className="text-[13px] text-[#565959]">
                {t("orderConfirmation.orderedOn")} {orderData.orderDate}
              </span>
            </div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="divide-y divide-[#E7E7E7]"
            >
              {(orderData.items ?? []).map((item) => (
                <motion.li
                  key={item.id}
                  variants={fadeInUp}
                  className="py-4 flex gap-4"
                >
                  <div className="flex-shrink-0 w-[80px] h-[80px] bg-[#F7F8F8] rounded border border-[#E7E7E7] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23F7F8F8'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-[14px] text-[#0066C0] hover:text-[#C45500] hover:underline line-clamp-2 leading-snug"
                    >
                      {item.title}
                    </Link>
                    {item.badge && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-[#C45500] bg-[#FFF3E0] px-1.5 py-0.5 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      {item.isPrime && (
                        <span className="text-[11px] font-bold text-[#00A8E1]">
                          prime
                        </span>
                      )}
                      <span className="text-[12px] text-[#565959]">
                        {t("orderConfirmation.soldBy")} {item.seller}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[13px] text-[#565959]">
                        {t("orderConfirmation.qty")} {item.quantity}
                      </span>
                      <span className="text-[15px] font-bold text-[#0F1111]">
                        ${((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-4 pt-4 border-t border-[#E7E7E7] flex flex-wrap gap-3">
              <Link href="/search">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-[13px] bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-medium px-4 py-2 rounded-full border border-[#FCD200] transition-colors"
                >
                  {t("orderConfirmation.continueShopping")}
                </motion.button>
              </Link>
              <Link href="/orders">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-[13px] bg-white hover:bg-[#F7F8F8] text-[#0F1111] font-medium px-4 py-2 rounded-full border border-[#D5D9D9] transition-colors"
                >
                  {t("orderConfirmation.viewOrders")}
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Summary card */}
            <div className="bg-white border border-[#D5D9D9] rounded-[4px] p-5">
              <h2 className="text-[18px] font-bold text-[#0F1111] mb-4">
                {t("orderConfirmation.orderSummary")}
              </h2>
              <div className="space-y-2 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-[#565959]">
                    {t("orderConfirmation.items")} ({orderData.items.length})
                  </span>
                  <span className="text-[#0F1111]">
                    ${itemTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#565959]">
                    {t("orderConfirmation.shipping")}
                  </span>
                  <span className="text-[#067D62] font-medium">
                    {t("orderConfirmation.free")}
                  </span>
                </div>
                {orderData.promoDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#565959]">
                      {t("orderConfirmation.promo")} ({orderData.promoApplied})
                    </span>
                    <span className="text-[#B12704]">
                      -${orderData.promoDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#565959]">
                    {t("orderConfirmation.tax")}
                  </span>
                  <span className="text-[#0F1111]">
                    ${orderData.tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-[#E7E7E7] pt-2 mt-2 flex justify-between">
                  <span className="text-[16px] font-bold text-[#B12704]">
                    {t("orderConfirmation.orderTotal")}
                  </span>
                  <span className="text-[16px] font-bold text-[#B12704]">
                    ${orderData.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-white border border-[#D5D9D9] rounded-[4px] p-5">
              <h3 className="text-[15px] font-bold text-[#0F1111] mb-3 flex items-center gap-2">
                <MapPin size={15} className="text-[#565959]" />
                {t("orderConfirmation.shippingTo")}
              </h3>
              <div className="text-[13px] text-[#565959] space-y-0.5">
                <p className="font-medium text-[#0F1111]">
                  {orderData.shippingAddress.name}
                </p>
                <p>{orderData.shippingAddress.line1}</p>
                {orderData.shippingAddress.line2 && (
                  <p>{orderData.shippingAddress.line2}</p>
                )}
                <p>
                  {orderData.shippingAddress.city},{" "}
                  {orderData.shippingAddress.state}{" "}
                  {orderData.shippingAddress.zip}
                </p>
                <p>{orderData.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white border border-[#D5D9D9] rounded-[4px] p-5">
              <h3 className="text-[15px] font-bold text-[#0F1111] mb-3 flex items-center gap-2">
                <CreditCard size={15} className="text-[#565959]" />
                {t("orderConfirmation.paymentMethod")}
              </h3>
              <div className="text-[13px] text-[#565959]">
                <p className="font-medium text-[#0F1111]">
                  {orderData.paymentMethod.type} ending in{" "}
                  {orderData.paymentMethod.last4}
                </p>
                <p>
                  {t("orderConfirmation.billingZip")}{" "}
                  {orderData.paymentMethod.billingZip}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Products */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white border border-[#D5D9D9] rounded-[4px] p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[18px] font-bold text-[#0F1111]">
              {t("orderConfirmation.recommended")}
            </h2>
            <Link
              href="/search"
              className="text-[13px] text-[#0066C0] hover:text-[#C45500] hover:underline flex items-center gap-1"
            >
              {t("orderConfirmation.seeMore")}
              <ChevronRight size={14} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {(recommendedProducts ?? []).map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group cursor-pointer"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="bg-[#F7F8F8] rounded border border-[#E7E7E7] overflow-hidden aspect-square mb-2 flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23F7F8F8'/%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <p className="text-[13px] text-[#0066C0] group-hover:text-[#C45500] group-hover:underline line-clamp-2 leading-snug mb-1">
                    {product.title}
                  </p>
                  <StarRating rating={product.rating} />
                  <p className="text-[11px] text-[#565959] mt-0.5">
                    ({(product.reviewCount ?? 0).toLocaleString("en-US")})
                  </p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[15px] font-bold text-[#0F1111]">
                      ${(product.price ?? 0).toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[12px] text-[#565959] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.isPrime && (
                    <span className="text-[11px] font-bold text-[#00A8E1]">
                      prime
                    </span>
                  )}
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 w-full text-[12px] bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-medium py-1.5 rounded-full border border-[#FCD200] transition-colors"
                >
                  {t("orderConfirmation.addToCart")}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Help section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white border border-[#D5D9D9] rounded-[4px] p-6"
        >
          <h2 className="text-[18px] font-bold text-[#0F1111] mb-4">
            {t("orderConfirmation.needHelp")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Package,
                title: t("orderConfirmation.trackPackage"),
                desc: t("orderConfirmation.trackPackageDesc"),
                href: "/orders",
              },
              {
                icon: ChevronRight,
                title: t("orderConfirmation.returnItem"),
                desc: t("orderConfirmation.returnItemDesc"),
                href: "/returns",
              },
              {
                icon: Star,
                title: t("orderConfirmation.writeReview"),
                desc: t("orderConfirmation.writeReviewDesc"),
                href: "/reviews",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} href={item.href}>
                  <motion.div
                    whileHover={{ backgroundColor: "#F7F8F8" }}
                    className="flex items-start gap-3 p-3 rounded border border-[#E7E7E7] cursor-pointer transition-colors"
                  >
                    <Icon size={20} className="text-[#565959] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-medium text-[#0066C0] hover:text-[#C45500] hover:underline">
                        {item.title}
                      </p>
                      <p className="text-[12px] text-[#565959] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}