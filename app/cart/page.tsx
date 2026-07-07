"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Trash2, ChevronDown, ShoppingCart, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

interface CartProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isPrime: boolean;
  badge?: string;
  soldBy: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  color?: string;
  size?: string;
}

interface CartItem {
  product: CartProduct;
  quantity: number;
}

const mockCartProducts: CartProduct[] = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds with MagSafe Charging Case",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    category: "electronics",
    isPrime: true,
    badge: "Best Seller",
    soldBy: "Amazon.com",
    rating: 4.7,
    reviewCount: 84312,
    inStock: true,
    color: "White",
  },
  {
    id: "3",
    title: 'Kindle Paperwhite (16 GB) — Now with a 6.8" display and adjustable warm light',
    price: 139.99,
    originalPrice: 159.99,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    category: "books",
    isPrime: true,
    badge: "Amazon's Choice",
    soldBy: "Amazon.com",
    rating: 4.8,
    reviewCount: 112045,
    inStock: true,
    color: "Black",
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart, Up to 70% Faster",
    price: 79.95,
    originalPrice: 99.95,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    category: "home-kitchen",
    isPrime: true,
    badge: "Best Seller",
    soldBy: "Instant Brands",
    rating: 4.7,
    reviewCount: 198432,
    inStock: true,
  },
];

const initialCartItems: CartItem[] = mockCartProducts.map((p) => ({
  product: p,
  quantity: 1,
}));

const savedForLaterProducts: CartProduct[] = [
  {
    id: "2",
    title: "Samsung 65-Inch Class QLED 4K Smart TV (2024 Model) with Alexa Built-in",
    price: 897.99,
    originalPrice: 1299.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65q8faafxza/gallery/us-qled-q8f-qn65q8faafxza-546800050?$product-details-jpg$",
    category: "electronics",
    isPrime: true,
    badge: "Deal of the Day",
    soldBy: "Samsung Official",
    rating: 4.5,
    reviewCount: 23841,
    inStock: true,
  },
];

const TAX_RATE = 0.0875;
const FREE_SHIPPING_THRESHOLD = 35;

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < fullStars
                ? "fill-[#FF9900] text-[#FF9900]"
                : i === fullStars && hasHalf
                ? "fill-[#FF9900]/50 text-[#FF9900]"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-[#007185] text-[12px] hover:text-[#C7511F] cursor-pointer">
        {(count ?? 0).toLocaleString("en-US")}
      </span>
    </div>
  );
}

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function CartPage() {
  const t = useTranslations();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [savedItems, setSavedItems] = useState<CartProduct[]>(savedForLaterProducts);
  const [removedId, setRemovedId] = useState<string | null>(null);

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setRemovedId(id);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((item) => item.product.id !== id));
      setRemovedId(null);
    }, 280);
  };

  const saveForLater = (id: string) => {
    const found = cartItems.find((item) => item.product.id === id);
    if (!found) return;
    setSavedItems((prev) => [...prev, found.product]);
    removeItem(id);
  };

  const moveToCart = (product: CartProduct) => {
    setSavedItems((prev) => prev.filter((p) => p.id !== product.id));
    setCartItems((prev) => [...prev, { product, quantity: 1 }]);
  };

  const removeSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
    0
  );
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const allPrime = cartItems.every((item) => item.product.isPrime);

  return (
    <main className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1500px] mx-auto px-3 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0">
            {/* Cart Header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg p-5 mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-end justify-between border-b border-[#DDD] pb-3 mb-1">
                <h1 className="text-[28px] font-normal text-[#0F1111]">
                  {t("cart.title")}
                </h1>
                <span className="text-[13px] text-[#565959] hidden sm:block">
                  {t("cart.price")}
                </span>
              </div>

              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="py-12 flex flex-col items-center gap-4 text-center"
                >
                  <ShoppingCart size={64} className="text-[#CDCDCD]" />
                  <div>
                    <p className="text-[18px] font-medium text-[#0F1111] mb-1">
                      {t("cart.empty")}
                    </p>
                    <p className="text-[14px] text-[#565959]">
                      {t("cart.emptySubtext")}
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="mt-2 inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[14px] font-medium px-6 py-2 rounded-full border border-[#FCD200] transition-colors duration-150"
                  >
                    {t("cart.continueShopping")}
                  </Link>
                </motion.div>
              ) : (
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="divide-y divide-[#DDD]"
                >
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.li
                        key={item.product.id}
                        variants={rowVariant}
                        initial="hidden"
                        animate={removedId === item.product.id ? "exit" : "visible"}
                        exit="exit"
                        layout
                        className="py-5 flex gap-4"
                      >
                        {/* Product Image */}
                        <Link
                          href={`/product/${item.product.id}`}
                          className="flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-lg overflow-hidden bg-[#F7F8F8] border border-[#DDD] flex items-center justify-center"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/images/placeholder-product.jpg";
                            }}
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-2">
                          <div className="flex-1 min-w-0">
                            {/* Title */}
                            <Link
                              href={`/product/${item.product.id}`}
                              className="text-[15px] text-[#0F1111] hover:text-[#C7511F] line-clamp-2 leading-snug font-medium transition-colors"
                            >
                              {item.product.title}
                            </Link>

                            {/* Rating */}
                            <div className="mt-1">
                              <StarRating
                                rating={item.product.rating}
                                count={item.product.reviewCount}
                              />
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              {item.product.inStock ? (
                                <span className="text-[#007600] text-[13px] font-medium">
                                  {t("cart.inStock")}
                                </span>
                              ) : (
                                <span className="text-[#B12704] text-[13px] font-medium">
                                  {t("cart.outOfStock")}
                                </span>
                              )}
                              {item.product.isPrime && (
                                <span className="flex items-center gap-0.5">
                                  <span className="text-[#00A8E0] font-bold text-[13px] italic">
                                    prime
                                  </span>
                                </span>
                              )}
                              {item.product.badge && (
                                <span className="bg-[#CC0C39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                                  {item.product.badge}
                                </span>
                              )}
                            </div>

                            {/* Sold by */}
                            <p className="text-[12px] text-[#565959] mt-1">
                              {t("cart.soldBy")}{" "}
                              <span className="text-[#007185] hover:text-[#C7511F] cursor-pointer">
                                {item.product.soldBy}
                              </span>
                            </p>

                            {/* Color / Size */}
                            {item.product.color && (
                              <p className="text-[12px] text-[#565959] mt-0.5">
                                {t("cart.color")}: <span className="font-medium text-[#0F1111]">{item.product.color}</span>
                              </p>
                            )}
                            {item.product.size && (
                              <p className="text-[12px] text-[#565959]">
                                {t("cart.size")}: <span className="font-medium text-[#0F1111]">{item.product.size}</span>
                              </p>
                            )}

                            {/* Controls */}
                            <div className="flex flex-wrap items-center gap-3 mt-3">
                              {/* Quantity stepper */}
                              <div className="flex items-center border border-[#888C8C] rounded-lg overflow-hidden bg-[#F0F2F2]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center text-[#0F1111] hover:bg-[#E3E6E6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-medium"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-8 h-8 flex items-center justify-center text-[13px] font-bold text-[#0F1111] border-x border-[#888C8C] bg-white">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-[#0F1111] hover:bg-[#E3E6E6] transition-colors text-lg font-medium"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              {/* Qty dropdown */}
                              <div className="relative">
                                <select
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.product.id,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="appearance-none bg-[#F0F2F2] border border-[#888C8C] rounded-lg text-[13px] text-[#0F1111] pl-3 pr-7 h-8 cursor-pointer hover:bg-[#E3E6E6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9900]"
                                  aria-label="Select quantity"
                                >
                                  {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                    (n) => (
                                      <option key={n} value={n}>
                                        {t("cart.qty")}: {n}
                                      </option>
                                    )
                                  )}
                                </select>
                                <ChevronDown
                                  size={12}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#565959]"
                                />
                              </div>

                              <span className="text-[#888C8C] text-[13px]">|</span>

                              <button
                                type="button"
                                onClick={() => saveForLater(item.product.id)}
                                className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline transition-colors"
                              >
                                {t("cart.saveForLater")}
                              </button>

                              <span className="text-[#888C8C] text-[13px]">|</span>

                              <button
                                type="button"
                                onClick={() => removeItem(item.product.id)}
                                className="flex items-center gap-1 text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline transition-colors"
                              >
                                <Trash2 size={13} />
                                {t("cart.delete")}
                              </button>
                            </div>
                          </div>

                          {/* Price (right side on sm+) */}
                          <div className="sm:text-right flex-shrink-0">
                            <p className="text-[18px] font-bold text-[#0F1111]">
                              ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                            </p>
                            {item.product.originalPrice && (
                              <p className="text-[12px] text-[#565959] line-through">
                                ${((item.product.originalPrice ?? 0) * item.quantity).toFixed(2)}
                              </p>
                            )}
                            {item.product.originalPrice && (
                              <p className="text-[12px] text-[#B12704] font-medium">
                                Save $
                                {(
                                  ((item.product.originalPrice ?? 0) -
                                    (item.product.price ?? 0)) *
                                  item.quantity
                                ).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              )}

              {/* Subtotal row */}
              {cartItems.length > 0 && (
                <div className="text-right pt-3 border-t border-[#DDD] mt-1">
                  <p className="text-[18px] text-[#0F1111]">
                    {t("cart.subtotal")} ({totalItems}{" "}
                    {totalItems === 1 ? t("cart.item") : t("cart.items")}
                    ):{" "}
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </p>
                </div>
              )}
            </motion.div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="bg-white rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
              >
                <h2 className="text-[21px] font-normal text-[#0F1111] border-b border-[#DDD] pb-3 mb-4">
                  {t("cart.savedForLater")} ({savedItems.length}{" "}
                  {savedItems.length === 1 ? t("cart.item") : t("cart.items")})
                </h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {savedItems.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={scaleIn}
                      whileHover={{ y: -2 }}
                      className="border border-[#DDD] rounded-lg p-3 flex gap-3 hover:shadow-md transition-shadow duration-200"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        className="flex-shrink-0 w-[80px] h-[80px] bg-[#F7F8F8] rounded-md overflow-hidden border border-[#DDD] flex items-center justify-center"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              "/images/placeholder-product.jpg";
                          }}
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${product.id}`}
                          className="text-[13px] text-[#0F1111] hover:text-[#C7511F] line-clamp-2 font-medium transition-colors"
                        >
                          {product.title}
                        </Link>
                        <p className="text-[15px] font-bold text-[#0F1111] mt-1">
                          ${(product.price ?? 0).toFixed(2)}
                        </p>
                        {product.isPrime && (
                          <span className="text-[#00A8E0] font-bold text-[12px] italic">
                            prime
                          </span>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="button"
                            onClick={() => moveToCart(product)}
                            className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                          >
                            {t("cart.moveToCart")}
                          </button>
                          <span className="text-[#888C8C] text-[12px]">|</span>
                          <button
                            type="button"
                            onClick={() => removeSaved(product.id)}
                            className="text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                          >
                            {t("cart.delete")}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[320px] flex-shrink-0"
          >
            <div className="bg-white rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)] lg:sticky lg:top-[80px]">
              {/* Prime free delivery banner */}
              {allPrime && cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className="bg-[#F0F9FF] border border-[#B0D8EE] rounded-lg p-3 mb-4 flex items-start gap-2"
                >
                  <Truck size={16} className="text-[#00A8E0] flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-[#0F1111]">
                    <span className="text-[#007600] font-bold">
                      {t("cart.freeDelivery")}
                    </span>{" "}
                    {t("cart.primeDeliveryNote")}
                  </p>
                </motion.div>
              )}

              <h2 className="text-[18px] font-normal text-[#0F1111] mb-4">
                {t("cart.orderSummary")}
              </h2>

              {/* Line items */}
              <div className="space-y-2 text-[14px] text-[#0F1111]">
                <div className="flex justify-between">
                  <span>
                    {t("cart.subtotal")} ({totalItems}{" "}
                    {totalItems === 1 ? t("cart.item") : t("cart.items")}):
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t("cart.shipping")}:</span>
                  {shipping === 0 ? (
                    <span className="text-[#007600] font-medium">
                      {t("cart.free")}
                    </span>
                  ) : (
                    <span>${shipping.toFixed(2)}</span>
                  )}
                </div>

                {shipping > 0 && (
                  <p className="text-[12px] text-[#565959]">
                    {t("cart.freeShippingNote", {
                      amount: (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2),
                    })}
                  </p>
                )}

                <div className="flex justify-between">
                  <span>
                    {t("cart.estimatedTax")} ({(TAX_RATE * 100).toFixed(2)}%):
                  </span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-[#DDD] pt-3 mt-2 flex justify-between text-[18px] font-bold">
                  <span>{t("cart.orderTotal")}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Savings callout */}
              {cartItems.some((i) => i.product.originalPrice) && (
                <div className="mt-3 bg-[#F7F8F8] rounded-lg p-3 text-[13px] text-[#007600] font-medium text-center border border-[#DDD]">
                  {t("cart.youSave")} $
                  {cartItems
                    .reduce(
                      (sum, item) =>
                        sum +
                        ((item.product.originalPrice ?? item.product.price) -
                          item.product.price) *
                          item.quantity,
                      0
                    )
                    .toFixed(2)}{" "}
                  {t("cart.onThisOrder")}
                </div>
              )}

              {/* CTA */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={cartItems.length === 0}
                className="mt-5 w-full bg-[#FFD814] hover:bg-[#F7CA00] disabled:bg-[#F0F2F2] disabled:text-[#888C8C] disabled:cursor-not-allowed text-[#0F1111] font-medium text-[15px] py-2.5 rounded-full border border-[#FCD200] disabled:border-[#DDD] transition-all duration-150 shadow-sm"
              >
                {t("cart.proceedToCheckout")}
              </motion.button>

              {/* Security note */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Shield size={13} className="text-[#565959]" />
                <p className="text-[12px] text-[#565959] text-center">
                  {t("cart.secureCheckout")}
                </p>
              </div>

              {/* Accepted payments */}
              <div className="mt-4 pt-4 border-t border-[#DDD]">
                <p className="text-[12px] text-[#565959] text-center mb-2">
                  {t("cart.acceptedPayments")}
                </p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {["Visa", "MC", "Amex", "Discover", "PayPal"].map((card) => (
                    <span
                      key={card}
                      className="text-[10px] font-bold text-[#565959] border border-[#DDD] rounded px-1.5 py-0.5 bg-[#F7F8F8]"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>

              {/* Return policy */}
              <div className="mt-4 pt-4 border-t border-[#DDD] flex items-start gap-2">
                <RotateCcw size={14} className="text-[#565959] flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-[#565959]">
                  {t("cart.returnPolicy")}
                </p>
              </div>
            </div>

            {/* Continue shopping */}
            <div className="mt-3 text-center">
              <Link
                href="/"
                className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
              >
                {t("cart.continueShopping")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}