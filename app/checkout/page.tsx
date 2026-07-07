"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, Lock, Package, Truck, CreditCard, MapPin, Star } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

const MOCK_ITEMS = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    originalPrice: 249.99,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    isPrime: true,
    soldBy: "Amazon.com",
  },
  {
    id: "3",
    title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display",
    price: 139.99,
    originalPrice: 159.99,
    qty: 2,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    isPrime: true,
    soldBy: "Amazon.com",
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 79.95,
    originalPrice: 99.95,
    qty: 1,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    isPrime: false,
    soldBy: "Instant Brands",
  },
];

const DELIVERY_OPTIONS = [
  {
    id: "free",
    label: "FREE Delivery",
    detail: "Arrives in 5-7 business days",
    price: 0,
    badge: "",
  },
  {
    id: "standard",
    label: "Standard Shipping",
    detail: "Arrives in 3-5 business days",
    price: 5.99,
    badge: "",
  },
  {
    id: "express",
    label: "Express Delivery",
    detail: "Arrives in 1-2 business days",
    price: 12.99,
    badge: "Fastest",
  },
  {
    id: "prime",
    label: "Prime FREE One-Day",
    detail: "Arrives tomorrow by 8 PM",
    price: 0,
    badge: "Prime",
  },
];

const STEPS = ["Shipping", "Delivery", "Payment", "Review"];

const subtotal = MOCK_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

export default function CheckoutPage() {
  const t = useTranslations();

  const [step, setStep] = useState(0);

  // Shipping form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("US");
  const [phone, setPhone] = useState("");

  // Delivery state
  const [deliveryOption, setDeliveryOption] = useState("free");

  // Payment state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const selectedDelivery = DELIVERY_OPTIONS.find((o) => o.id === deliveryOption) ?? DELIVERY_OPTIONS[0];
  const deliveryCost = selectedDelivery?.price ?? 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryCost + tax;

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const canProceedShipping =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    address1.trim() !== "" &&
    city.trim() !== "" &&
    state.trim() !== "" &&
    zip.trim() !== "";

  const canProceedPayment =
    paymentMethod !== "card" ||
    (cardName.trim() !== "" &&
      cardNumber.replace(/\s/g, "").length === 16 &&
      cardExpiry.length === 5 &&
      cardCvc.length >= 3);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Page header */}
      <div className="bg-[#131921] py-4 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-xl tracking-tight">amazon</span>
            <span className="text-[#FF9900] font-bold text-xl">.com</span>
          </div>
          <div className="flex items-center gap-2 text-[#FF9900] text-sm font-medium">
            <Lock size={14} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Step indicator */}
      <div className="bg-white border-b border-[#D5D9D9]">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => { if (i < step) setStep(i); }}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors ${
                    i === step
                      ? "text-[#FF9900] font-bold"
                      : i < step
                      ? "text-[#007185] hover:underline cursor-pointer"
                      : "text-[#767676] cursor-default"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      i < step
                        ? "bg-[#FF9900] border-[#FF9900] text-white"
                        : i === step
                        ? "border-[#FF9900] text-[#FF9900]"
                        : "border-[#D5D9D9] text-[#767676]"
                    }`}
                  >
                    {i < step ? <Check size={12} /> : i + 1}
                  </span>
                  {s}
                </button>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={16} className="text-[#D5D9D9] mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: form area */}
          <div className="flex-1 min-w-0">

            {/* STEP 0: Shipping Address */}
            {step === 0 && (
              <motion.div
                key="shipping"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg border border-[#D5D9D9] p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin size={20} className="text-[#FF9900]" />
                  <h1 className="text-xl font-bold text-[#0F1111]">Shipping Address</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      Address line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      placeholder="123 Main Street"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      Address line 2 <span className="text-[#767676]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      placeholder="Apt, suite, unit, building, floor, etc."
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Seattle"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all bg-white"
                    >
                      <option value="">Select state</option>
                      {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      ZIP code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                      placeholder="98101"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all bg-white"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">
                      Phone number <span className="text-[#767676]">(for delivery updates)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (canProceedShipping) setStep(1); }}
                    disabled={!canProceedShipping}
                    className={`px-8 py-2.5 rounded text-sm font-medium transition-all ${
                      canProceedShipping
                        ? "bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] shadow-sm"
                        : "bg-[#F3F3F3] text-[#767676] cursor-not-allowed"
                    }`}
                  >
                    Continue to Delivery
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 1: Delivery Options */}
            {step === 1 && (
              <motion.div
                key="delivery"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg border border-[#D5D9D9] p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={20} className="text-[#FF9900]" />
                  <h2 className="text-xl font-bold text-[#0F1111]">Choose a Delivery Option</h2>
                </div>

                <div className="mb-4 p-3 bg-[#F0F2F2] rounded text-sm text-[#0F1111]">
                  <span className="font-medium">Delivering to:</span>{" "}
                  {firstName} {lastName}, {address1}{address2 ? `, ${address2}` : ""}, {city}, {state} {zip}
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {DELIVERY_OPTIONS.map((opt) => (
                    <motion.label
                      key={opt.id}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.005 }}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        deliveryOption === opt.id
                          ? "border-[#FF9900] bg-[#FFFBF2]"
                          : "border-[#D5D9D9] hover:border-[#888C8C]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.id}
                        checked={deliveryOption === opt.id}
                        onChange={() => setDeliveryOption(opt.id)}
                        className="mt-0.5 accent-[#FF9900]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-[#0F1111]">{opt.label}</span>
                          {opt.badge === "Prime" && (
                            <span className="bg-[#00A8E0] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                              prime
                            </span>
                          )}
                          {opt.badge === "Fastest" && (
                            <span className="bg-[#CC0C39] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              Fastest
                            </span>
                          )}
                        </div>
                        <p className="text-[#565959] text-xs mt-0.5">{opt.detail}</p>
                      </div>
                      <span className={`text-sm font-medium ${opt.price === 0 ? "text-[#007600]" : "text-[#0F1111]"}`}>
                        {opt.price === 0 ? "FREE" : `$${opt.price.toFixed(2)}`}
                      </span>
                    </motion.label>
                  ))}
                </motion.div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(0)}
                    className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                  >
                    Back to Shipping
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="px-8 py-2.5 rounded text-sm font-medium bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] shadow-sm transition-all"
                  >
                    Continue to Payment
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <motion.div
                key="payment"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg border border-[#D5D9D9] p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={20} className="text-[#FF9900]" />
                  <h2 className="text-xl font-bold text-[#0F1111]">Payment Method</h2>
                </div>

                {/* Payment method selector */}
                <div className="flex gap-3 mb-6 flex-wrap">
                  {[
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "amazon-pay", label: "Amazon Pay" },
                    { id: "gift", label: "Gift Card" },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`px-4 py-2 rounded border-2 text-sm font-medium transition-all ${
                        paymentMethod === pm.id
                          ? "border-[#FF9900] bg-[#FFFBF2] text-[#0F1111]"
                          : "border-[#D5D9D9] text-[#565959] hover:border-[#888C8C]"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-[#0F1111] mb-1">
                        Name on card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Smith"
                        className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F1111] mb-1">
                        Card number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all pr-24"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <span className="text-[10px] font-bold text-[#1A1F71] bg-[#F0F2F2] px-1.5 py-0.5 rounded">VISA</span>
                          <span className="text-[10px] font-bold text-white bg-[#EB001B] px-1.5 py-0.5 rounded">MC</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0F1111] mb-1">
                          Expiry date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0F1111] mb-1">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          maxLength={4}
                          className="w-full border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="accent-[#FF9900] w-4 h-4"
                      />
                      <span className="text-sm text-[#0F1111]">Save this card for future purchases</span>
                    </label>
                    <div className="flex items-center gap-2 text-[#565959] text-xs mt-2">
                      <Lock size={12} />
                      <span>Your payment information is encrypted and secure.</span>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === "amazon-pay" && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="p-6 bg-[#F0F2F2] rounded-lg text-center"
                  >
                    <div className="text-4xl mb-3">🔒</div>
                    <p className="text-sm text-[#0F1111] font-medium mb-1">Amazon Pay</p>
                    <p className="text-xs text-[#565959]">You will be redirected to complete payment securely via Amazon Pay.</p>
                  </motion.div>
                )}

                {paymentMethod === "gift" && (
                  <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3"
                  >
                    <label className="block text-sm font-medium text-[#0F1111] mb-1">Gift card or promotional code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        defaultValue=""
                        onChange={() => {}}
                        className="flex-1 border border-[#888C8C] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF9900] focus:ring-2 focus:ring-[#FF9900]/20 transition-all"
                      />
                      <button className="px-4 py-2 bg-[#F0F2F2] border border-[#888C8C] rounded text-sm font-medium hover:bg-[#E3E6E6] transition-colors">
                        Apply
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline transition-colors"
                  >
                    Back to Delivery
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (canProceedPayment) setStep(3); }}
                    disabled={!canProceedPayment}
                    className={`px-8 py-2.5 rounded text-sm font-medium transition-all ${
                      canProceedPayment
                        ? "bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] shadow-sm"
                        : "bg-[#F3F3F3] text-[#767676] cursor-not-allowed"
                    }`}
                  >
                    Review Order
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review */}
            {step === 3 && (
              <motion.div
                key="review"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <div className="bg-white rounded-lg border border-[#D5D9D9] p-6">
                  <h2 className="text-xl font-bold text-[#0F1111] mb-4">Review Your Order</h2>

                  {/* Shipping summary */}
                  <div className="flex items-start justify-between py-3 border-b border-[#E7E7E7]">
                    <div>
                      <p className="text-sm font-medium text-[#0F1111]">Shipping address</p>
                      <p className="text-sm text-[#565959] mt-0.5">
                        {firstName} {lastName}, {address1}{address2 ? `, ${address2}` : ""}, {city}, {state} {zip}
                      </p>
                    </div>
                    <button onClick={() => setStep(0)} className="text-xs text-[#007185] hover:underline ml-4 flex-shrink-0">Change</button>
                  </div>

                  {/* Delivery summary */}
                  <div className="flex items-start justify-between py-3 border-b border-[#E7E7E7]">
                    <div>
                      <p className="text-sm font-medium text-[#0F1111]">Delivery</p>
                      <p className="text-sm text-[#565959] mt-0.5">{selectedDelivery?.label} — {selectedDelivery?.detail}</p>
                    </div>
                    <button onClick={() => setStep(1)} className="text-xs text-[#007185] hover:underline ml-4 flex-shrink-0">Change</button>
                  </div>

                  {/* Payment summary */}
                  <div className="flex items-start justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-[#0F1111]">Payment</p>
                      <p className="text-sm text-[#565959] mt-0.5">
                        {paymentMethod === "card"
                          ? `Card ending in ${cardNumber.replace(/\s/g, "").slice(-4) || "****"}`
                          : paymentMethod === "amazon-pay"
                          ? "Amazon Pay"
                          : "Gift Card"}
                      </p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-xs text-[#007185] hover:underline ml-4 flex-shrink-0">Change</button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="bg-white rounded-lg border border-[#D5D9D9] p-6">
                  <h3 className="text-base font-bold text-[#0F1111] mb-4">Items in Your Order ({MOCK_ITEMS.length})</h3>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {MOCK_ITEMS.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={fadeInUp}
                        className="flex gap-4 pb-4 border-b border-[#E7E7E7] last:border-0 last:pb-0"
                      >
                        <div className="w-16 h-16 flex-shrink-0 rounded border border-[#D5D9D9] overflow-hidden bg-white">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#0F1111] line-clamp-2 font-medium">{item.title}</p>
                          <p className="text-xs text-[#565959] mt-0.5">Qty: {item.qty}</p>
                          {item.isPrime && (
                            <span className="inline-block text-[10px] font-bold text-[#00A8E0] mt-0.5">prime</span>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-[#0F1111]">${(item.price * item.qty).toFixed(2)}</p>
                          {item.originalPrice && (
                            <p className="text-xs text-[#565959] line-through">${(item.originalPrice * item.qty).toFixed(2)}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <Link href="/confirmation">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] font-bold text-base rounded-lg shadow-sm transition-all"
                  >
                    Place Your Order — ${total.toFixed(2)}
                  </motion.button>
                </Link>
                <p className="text-xs text-[#565959] text-center">
                  By placing your order, you agree to Amazon's{" "}
                  <span className="text-[#007185] hover:underline cursor-pointer">Privacy Notice</span> and{" "}
                  <span className="text-[#007185] hover:underline cursor-pointer">Conditions of Use</span>.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-lg border border-[#D5D9D9] p-5 sticky top-[80px]"
            >
              {step === 3 ? (
                <Link href="/confirmation">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2.5 bg-[#FF9900] hover:bg-[#FA8900] text-[#0F1111] font-bold text-sm rounded-lg shadow-sm transition-all mb-4"
                  >
                    Place Your Order
                  </motion.button>
                </Link>
              ) : null}

              <h2 className="text-lg font-bold text-[#0F1111] mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#565959]">
                    Items ({MOCK_ITEMS.reduce((s, i) => s + i.qty, 0)}):
                  </span>
                  <span className="text-[#0F1111]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#565959]">Shipping:</span>
                  <span className={deliveryCost === 0 ? "text-[#007600]" : "text-[#0F1111]"}>
                    {deliveryCost === 0 ? "FREE" : `$${deliveryCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#565959]">Estimated tax:</span>
                  <span className="text-[#0F1111]">${tax.toFixed(2)}</span>
                </div>
                {subtotal > 200 && (
                  <div className="flex justify-between text-[#CC0C39]">
                    <span>Savings:</span>
                    <span>
                      -${MOCK_ITEMS.reduce((s, i) => s + ((i.originalPrice ?? i.price) - i.price) * i.qty, 0).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#E7E7E7] mt-3 pt-3 flex justify-between font-bold text-base">
                <span className="text-[#CC0C39]">Order total:</span>
                <span className="text-[#CC0C39]">${total.toFixed(2)}</span>
              </div>

              {/* Items preview */}
              <div className="mt-4 space-y-3">
                {MOCK_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-12 h-12 flex-shrink-0 rounded border border-[#D5D9D9] overflow-hidden bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#0F1111] line-clamp-2">{item.title}</p>
                      <p className="text-xs text-[#565959]">Qty: {item.qty}</p>
                      <p className="text-xs font-medium text-[#0F1111]">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[#565959] text-xs">
                <Lock size={12} />
                <span>Secure checkout — 256-bit SSL encryption</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}