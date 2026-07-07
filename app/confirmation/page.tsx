"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, MapPin, CreditCard, Star, Shield, Truck, Clock } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const ORDER_NUMBER = "113-4829301-7284756";
const ESTIMATED_DELIVERY = "Thursday, January 23";

const orderedItems = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    soldBy: "Amazon.com",
    isPrime: true,
  },
  {
    id: "3",
    title: 'Kindle Paperwhite (16 GB) — Now with a 6.8" display',
    price: 139.99,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    soldBy: "Amazon.com",
    isPrime: true,
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 79.95,
    qty: 2,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    soldBy: "Instant Brands",
    isPrime: true,
  },
];

const subtotal = orderedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
const shipping = 0;
const tax = subtotal * 0.08;
const total = subtotal + shipping + tax;

const shippingAddress = {
  name: "Jane Doe",
  line1: "123 Maple Street",
  line2: "Apt 4B",
  city: "Seattle",
  state: "WA",
  zip: "98101",
  country: "United States",
};

const paymentMethod = {
  type: "Visa",
  last4: "4242",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={star <= Math.round(rating) ? "fill-[#FF9900] text-[#FF9900]" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ConfirmationPage() {
  const t = useTranslations();
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Success Banner */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="bg-white border-b border-[#D5D9D9]"
      >
        <div className="max-w-[1000px] mx-auto px-4 py-8">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="flex items-start gap-4"
          >
            <CheckCircle size={40} className="text-[#067D62] flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-[28px] font-normal text-[#067D62] leading-tight">
                Order placed, thank you!
              </h1>
              <p className="text-[#0F1111] text-[14px] mt-1">
                Confirmation will be sent to{" "}
                <span className="font-semibold">jane.doe@example.com</span>
              </p>
            </div>
          </motion.div>

          {/* Order meta row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: <Package size={18} className="text-[#FF9900]" />,
                label: "Order number",
                value: ORDER_NUMBER,
              },
              {
                icon: <Truck size={18} className="text-[#FF9900]" />,
                label: "Estimated delivery",
                value: ESTIMATED_DELIVERY,
              },
              {
                icon: <CreditCard size={18} className="text-[#FF9900]" />,
                label: "Payment",
                value: `${paymentMethod.type} ending in ${paymentMethod.last4}`,
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="flex items-start gap-3 bg-[#F7F8F8] border border-[#D5D9D9] rounded-lg p-4"
              >
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-[#565959] text-[12px]">{item.label}</p>
                  <p className="text-[#0F1111] text-[13px] font-semibold mt-0.5 break-all">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="max-w-[1000px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Delivery info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#D5D9D9] rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Truck size={20} className="text-[#FF9900]" />
              <h2 className="text-[18px] font-semibold text-[#0F1111]">Delivery details</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={14} className="text-[#565959]" />
                  <span className="text-[13px] font-semibold text-[#0F1111]">Shipping address</span>
                </div>
                <div className="text-[13px] text-[#0F1111] leading-relaxed pl-5">
                  <p className="font-semibold">{shippingAddress.name}</p>
                  <p>{shippingAddress.line1}</p>
                  {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
                  <p>
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                  </p>
                  <p>{shippingAddress.country}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={14} className="text-[#565959]" />
                  <span className="text-[13px] font-semibold text-[#0F1111]">Delivery window</span>
                </div>
                <div className="pl-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[#067D62] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                      Prime
                    </span>
                    <span className="text-[13px] text-[#0F1111] font-semibold">FREE One-Day Delivery</span>
                  </div>
                  <p className="text-[13px] text-[#0F1111]">
                    Arriving by <span className="font-semibold text-[#067D62]">{ESTIMATED_DELIVERY}</span>
                  </p>
                  <p className="text-[12px] text-[#565959]">Order placed before 2:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Items summary */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#D5D9D9] rounded-lg p-5"
          >
            <h2 className="text-[18px] font-semibold text-[#0F1111] mb-4">
              Items in your order ({orderedItems.reduce((s, i) => s + i.qty, 0)})
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-[#E7E7E7]"
            >
              {orderedItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-[#F7F8F8] rounded-lg overflow-hidden border border-[#D5D9D9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F7F8F8'/%3E%3Ctext x='40' y='44' text-anchor='middle' font-size='28' fill='%23AAAAAA'%3E📦%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[#0F1111] font-medium leading-snug line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={4.7} />
                    </div>
                    <p className="text-[12px] text-[#565959] mt-1">
                      Sold by: {item.soldBy}
                    </p>
                    {item.isPrime && (
                      <span className="inline-flex items-center gap-1 bg-[#067D62] text-white text-[10px] font-bold px-1.5 py-0.5 rounded mt-1">
                        Prime
                      </span>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[14px] font-semibold text-[#0F1111]">
                        ${(item.price).toFixed(2)}
                      </span>
                      <span className="text-[13px] text-[#565959]">Qty: {item.qty}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[15px] font-semibold text-[#0F1111]">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Rate your experience */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white border border-[#D5D9D9] rounded-lg p-5"
          >
            <h2 className="text-[18px] font-semibold text-[#0F1111] mb-1">
              How was your shopping experience?
            </h2>
            <p className="text-[13px] text-[#565959] mb-4">
              Your feedback helps us improve for everyone.
            </p>

            {feedbackGiven ? (
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 text-[#067D62]"
              >
                <CheckCircle size={18} />
                <span className="text-[14px] font-medium">Thank you for your feedback!</span>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setRating(star);
                      setFeedbackGiven(true);
                    }}
                    className="transition-transform duration-150 hover:scale-125"
                    aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  >
                    <Star
                      size={28}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-[#FF9900] text-[#FF9900]"
                          : "fill-gray-200 text-gray-200"
                      }
                    />
                  </button>
                ))}
                <span className="text-[13px] text-[#565959] ml-2">
                  {hoverRating > 0
                    ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][hoverRating]
                    : "Select a rating"}
                </span>
              </div>
            )}
          </motion.div>

          {/* Security note */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-start gap-3 bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg p-4"
          >
            <Shield size={18} className="text-[#565959] flex-shrink-0 mt-0.5" />
            <p className="text-[12px] text-[#565959] leading-relaxed">
              Your order is protected by Amazon's A-to-z Guarantee. If you have any issues with your
              purchase, we'll make it right. You can track your package and manage your order from
              your account at any time.
            </p>
          </motion.div>
        </div>

        {/* Right column — Order summary */}
        <div className="space-y-4">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#D5D9D9] rounded-lg p-5 sticky top-[80px]"
          >
            <h2 className="text-[18px] font-semibold text-[#0F1111] mb-4">Order summary</h2>

            <div className="space-y-2 text-[14px]">
              <div className="flex justify-between">
                <span className="text-[#0F1111]">
                  Items ({orderedItems.reduce((s, i) => s + i.qty, 0)}):
                </span>
                <span className="text-[#0F1111]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0F1111]">Shipping &amp; handling:</span>
                <span className="text-[#067D62] font-medium">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0F1111]">Estimated tax:</span>
                <span className="text-[#0F1111]">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#D5D9D9] pt-2 mt-2 flex justify-between">
                <span className="text-[16px] font-semibold text-[#B12704]">Order total:</span>
                <span className="text-[16px] font-semibold text-[#B12704]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#D5D9D9] space-y-2 text-[13px]">
              <div className="flex items-center gap-2">
                <CreditCard size={14} className="text-[#565959]" />
                <span className="text-[#0F1111]">
                  Charged to {paymentMethod.type} ****{paymentMethod.last4}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#565959]" />
                <span className="text-[#0F1111]">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5"
            >
              <Link
                href="/"
                className="block w-full text-center bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-semibold text-[14px] py-2.5 rounded-full border border-[#FCD200] transition-colors duration-150"
              >
                Continue Shopping
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2"
            >
              <Link
                href="/checkout"
                className="block w-full text-center bg-white hover:bg-[#F7F8F8] text-[#0F1111] font-medium text-[13px] py-2 rounded-full border border-[#D5D9D9] transition-colors duration-150"
              >
                View order details
              </Link>
            </motion.div>
          </motion.div>

          {/* What's next */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border border-[#D5D9D9] rounded-lg p-5"
          >
            <h3 className="text-[15px] font-semibold text-[#0F1111] mb-3">What happens next?</h3>
            <ol className="space-y-3">
              {[
                {
                  step: "1",
                  title: "Order confirmed",
                  desc: "We've received your order and are preparing it.",
                  done: true,
                },
                {
                  step: "2",
                  title: "Shipped",
                  desc: "Your package will be handed to the carrier.",
                  done: false,
                },
                {
                  step: "3",
                  title: "Out for delivery",
                  desc: "Your package is on its way to you.",
                  done: false,
                },
                {
                  step: "4",
                  title: "Delivered",
                  desc: `Expected by ${ESTIMATED_DELIVERY}.`,
                  done: false,
                },
              ].map((step) => (
                <li key={step.step} className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5 ${
                      step.done
                        ? "bg-[#067D62] text-white"
                        : "bg-[#E7E7E7] text-[#565959]"
                    }`}
                  >
                    {step.done ? <CheckCircle size={14} /> : step.step}
                  </div>
                  <div>
                    <p className={`text-[13px] font-semibold ${step.done ? "text-[#067D62]" : "text-[#0F1111]"}`}>
                      {step.title}
                    </p>
                    <p className="text-[12px] text-[#565959]">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}