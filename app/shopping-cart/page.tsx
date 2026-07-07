"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingCart, ChevronRight, Shield, Truck, RotateCcw, Star } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

interface CartProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isPrime: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
  soldBy: string;
  inStock: boolean;
  quantity: number;
  selectedOption?: string;
}

const initialCartItems: CartProduct[] = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    originalPrice: 249.99,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    category: "Electronics",
    isPrime: true,
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 84312,
    soldBy: "Amazon.com",
    inStock: true,
    quantity: 1,
    selectedOption: "White",
  },
  {
    id: "3",
    title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display and adjustable warm light",
    price: 139.99,
    originalPrice: 159.99,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    category: "Books",
    isPrime: true,
    badge: "Amazon's Choice",
    rating: 4.8,
    reviewCount: 112045,
    soldBy: "Amazon.com",
    inStock: true,
    quantity: 1,
    selectedOption: "16 GB",
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 79.95,
    originalPrice: 99.95,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    category: "Home & Kitchen",
    isPrime: true,
    badge: "Best Seller",
    rating: 4.7,
    reviewCount: 198432,
    soldBy: "Amazon Warehouse",
    inStock: true,
    quantity: 2,
    selectedOption: "6 Quart",
  },
];

const suggestedProducts = [
  {
    id: "s1",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 279.99,
    originalPrice: 399.99,
    image: "/images/sony-noise-canceling-headphones.jpg",
    rating: 4.6,
    reviewCount: 34210,
    isPrime: true,
  },
  {
    id: "s2",
    title: "Samsung 65-Inch Class QLED 4K Smart TV",
    price: 897.99,
    originalPrice: 1299.99,
    image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65q8faafxza/gallery/us-qled-q8f-qn65q8faafxza-546800050?$product-details-jpg$",
    rating: 4.5,
    reviewCount: 23841,
    isPrime: true,
  },
  {
    id: "s3",
    title: "Ninja AF101 Air Fryer that Crisps, Roasts, Reheats",
    price: 99.99,
    originalPrice: 129.99,
    image: "/images/ninja-air-fryer-kitchen.jpg",
    rating: 4.8,
    reviewCount: 67890,
    isPrime: true,
  },
  {
    id: "s4",
    title: "Echo Dot (5th Gen) Smart Speaker with Alexa",
    price: 49.99,
    originalPrice: 59.99,
    image: "https://crdms.images.consumerreports.org/f_auto,w_1200/prod/products/cr/models/407823-smart-speakers-amazon-echo-dot-5th-gen-w-clock-10033746.png",
    rating: 4.7,
    reviewCount: 45123,
    isPrime: true,
  },
];

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
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
      <span className="text-[#007185] text-xs hover:text-[#C7511F] cursor-pointer">
        {count.toLocaleString("en-US")}
      </span>
    </div>
  );
}

function PrimeBadge() {
  return (
    <span className="inline-flex items-center">
      <span className="text-[#00A8E1] font-bold text-[13px] italic">prime</span>
    </span>
  );
}

export default function ShoppingCartPage() {
  const t = useTranslations();
  const [cartItems, setCartItems] = useState<CartProduct[]>(initialCartItems);
  const [savedItems, setSavedItems] = useState<CartProduct[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      setRemovingId(null);
    }, 300);
  };

  const saveForLater = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      setSavedItems((prev) => [...prev, item]);
      removeItem(id);
    }
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find((i) => i.id === id);
    if (item) {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
      setSavedItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalSavings = cartItems.reduce(
    (sum, item) =>
      sum + ((item.originalPrice ?? item.price) - item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <div className="max-w-[1500px] mx-auto px-3 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Cart Items */}
          <div className="flex-1 min-w-0">
            {/* Cart Header */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg p-6 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-end justify-between border-b border-[#DDD] pb-4 mb-2">
                <h1 className="text-[28px] font-normal text-[#0F1111]">
                  Shopping Cart
                </h1>
                <span className="text-[13px] text-[#565959]">Price</span>
              </div>

              {cartItems.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="py-12 text-center"
                >
                  <ShoppingCart size={64} className="mx-auto text-[#CDCDCD] mb-4" />
                  <h2 className="text-[21px] font-normal text-[#0F1111] mb-2">
                    Your Amazon Cart is empty
                  </h2>
                  <p className="text-[#565959] text-[14px] mb-6">
                    Your shopping cart is waiting. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                  </p>
                  <Link
                    href="/"
                    className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[14px] font-normal px-6 py-2 rounded-full border border-[#FCD200] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                        animate={removingId === item.id ? { opacity: 0, x: -40 } : { opacity: 1, x: 0 }}
                        className="py-5 border-b border-[#DDD] last:border-b-0"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <Link href={`/product/${item.id}`} className="flex-shrink-0">
                            <motion.div
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.2 }}
                              className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white rounded border border-[#DDD] overflow-hidden flex items-center justify-center"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain p-2"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f3f3f3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </motion.div>
                          </Link>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                {item.badge && (
                                  <span className="inline-block bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded mb-1">
                                    {item.badge}
                                  </span>
                                )}
                                <Link
                                  href={`/product/${item.id}`}
                                  className="block text-[15px] text-[#0F1111] hover:text-[#C7511F] hover:underline leading-snug mb-1 line-clamp-2"
                                >
                                  {item.title}
                                </Link>
                                <StarRating rating={item.rating} count={item.reviewCount} />
                                <div className="mt-1 text-[13px] text-[#007600]">In Stock</div>
                                {item.isPrime && (
                                  <div className="mt-1">
                                    <PrimeBadge />
                                    <span className="text-[12px] text-[#565959] ml-1">
                                      FREE delivery
                                    </span>
                                  </div>
                                )}
                                {item.selectedOption && (
                                  <div className="mt-1 text-[13px] text-[#565959]">
                                    Option: <span className="font-medium">{item.selectedOption}</span>
                                  </div>
                                )}
                                <div className="mt-1 text-[12px] text-[#565959]">
                                  Sold by: {item.soldBy}
                                </div>

                                {/* Quantity + Actions */}
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                  <div className="flex items-center border border-[#D5D9D9] rounded-lg overflow-hidden bg-[#F0F2F2]">
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, -1)}
                                      disabled={item.quantity <= 1}
                                      className="px-3 py-1.5 text-[#0F1111] hover:bg-[#E3E6E6] disabled:opacity-40 transition-colors"
                                    >
                                      <Minus size={14} />
                                    </motion.button>
                                    <span className="px-4 py-1.5 text-[14px] font-medium text-[#0F1111] bg-white border-x border-[#D5D9D9] min-w-[40px] text-center">
                                      {item.quantity}
                                    </span>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="px-3 py-1.5 text-[#0F1111] hover:bg-[#E3E6E6] transition-colors"
                                    >
                                      <Plus size={14} />
                                    </motion.button>
                                  </div>

                                  <span className="text-[#CDCDCD]">|</span>

                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => removeItem(item.id)}
                                    className="flex items-center gap-1 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                                  >
                                    <Trash2 size={13} />
                                    Delete
                                  </motion.button>

                                  <span className="text-[#CDCDCD]">|</span>

                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => saveForLater(item.id)}
                                    className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                                  >
                                    Save for later
                                  </motion.button>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right flex-shrink-0">
                                <div className="text-[18px] font-bold text-[#0F1111]">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                {item.originalPrice && (
                                  <div className="text-[13px] text-[#565959] line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                  </div>
                                )}
                                {item.originalPrice && (
                                  <div className="text-[13px] text-[#CC0C39] font-medium">
                                    Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Subtotal */}
                  <div className="pt-4 text-right">
                    {totalSavings > 0 && (
                      <div className="text-[14px] text-[#CC0C39] mb-1">
                        Your order qualifies for FREE Shipping. You save{" "}
                        <span className="font-bold">${totalSavings.toFixed(2)}</span> in this order.
                      </div>
                    )}
                    <div className="text-[18px] text-[#0F1111]">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="bg-white rounded-lg p-6 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
              >
                <h2 className="text-[21px] font-normal text-[#0F1111] border-b border-[#DDD] pb-3 mb-4">
                  Saved for later ({savedItems.length} {savedItems.length === 1 ? "item" : "items"})
                </h2>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  {savedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="flex gap-4 py-4 border-b border-[#DDD] last:border-b-0"
                    >
                      <div className="w-[100px] h-[100px] bg-white rounded border border-[#DDD] overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f3f3'/%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-[#0F1111] hover:text-[#C7511F] hover:underline cursor-pointer line-clamp-2 mb-1">
                          {item.title}
                        </p>
                        <div className="text-[16px] font-bold text-[#0F1111] mb-2">
                          ${item.price.toFixed(2)}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => moveToCart(item.id)}
                          className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                        >
                          Move to Cart
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Suggested Products */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white rounded-lg p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <h2 className="text-[21px] font-normal text-[#0F1111] border-b border-[#DDD] pb-3 mb-4">
                Customers who bought items in your cart also bought
              </h2>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {suggestedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square bg-[#F7F8F8] rounded-lg overflow-hidden mb-2 border border-[#DDD]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f3f3'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <p className="text-[13px] text-[#0F1111] group-hover:text-[#C7511F] line-clamp-2 mb-1 leading-snug">
                      {product.title}
                    </p>
                    <StarRating rating={product.rating} count={product.reviewCount} />
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-[15px] font-bold text-[#0F1111]">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[12px] text-[#565959] line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.isPrime && (
                      <div className="mt-0.5">
                        <PrimeBadge />
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[12px] font-normal py-1.5 rounded-full border border-[#FCD200] transition-colors"
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[300px] flex-shrink-0">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)] sticky top-[80px]"
            >
              {/* Free shipping notice */}
              {cartItems.length > 0 && (
                <div className="text-[14px] text-[#007600] mb-3 pb-3 border-b border-[#DDD]">
                  <Truck size={14} className="inline mr-1" />
                  Your order qualifies for{" "}
                  <span className="font-bold">FREE Shipping</span>.
                </div>
              )}

              <div className="text-[18px] text-[#0F1111] mb-4">
                Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):{" "}
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>

              {/* Gift option */}
              <label className="flex items-start gap-2 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-[#FF9900]"
                  onChange={() => {}}
                />
                <span className="text-[13px] text-[#0F1111]">
                  This order contains a gift
                </span>
              </label>

              {cartItems.length > 0 ? (
                <>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/checkout"
                      className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[14px] font-normal text-center py-2.5 rounded-full border border-[#FCD200] transition-colors mb-2"
                    >
                      Proceed to Checkout
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <button className="block w-full bg-[#FF9900] hover:bg-[#FA8900] text-white text-[14px] font-normal text-center py-2.5 rounded-full border border-[#E47911] transition-colors">
                      Buy Now
                    </button>
                  </motion.div>
                </>
              ) : (
                <Link
                  href="/"
                  className="block w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[14px] font-normal text-center py-2.5 rounded-full border border-[#FCD200] transition-colors"
                >
                  Continue Shopping
                </Link>
              )}

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t border-[#DDD] space-y-2">
                <div className="flex items-center gap-2 text-[12px] text-[#565959]">
                  <Shield size={14} className="text-[#007600] flex-shrink-0" />
                  Safe and Secure Payments
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#565959]">
                  <RotateCcw size={14} className="text-[#007600] flex-shrink-0" />
                  Easy Returns and Refunds
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#565959]">
                  <Truck size={14} className="text-[#007600] flex-shrink-0" />
                  Free Delivery on Eligible Orders
                </div>
              </div>

              {/* Savings summary */}
              {totalSavings > 0 && (
                <div className="mt-4 pt-4 border-t border-[#DDD]">
                  <div className="text-[13px] text-[#CC0C39] font-medium">
                    Total savings: ${totalSavings.toFixed(2)}
                  </div>
                </div>
              )}
            </motion.div>

            {/* EMI / Pay Later */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg p-4 mt-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-4px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-[14px] font-bold text-[#0F1111] mb-2">
                No Cost EMI available
              </h3>
              <p className="text-[13px] text-[#565959] mb-2">
                Pay in easy monthly installments with select credit cards. No extra charges.
              </p>
              <Link
                href="/"
                className="text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline flex items-center gap-1"
              >
                Learn more <ChevronRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}