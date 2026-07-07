"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Star, ChevronRight, ChevronLeft, Truck, Shield, RotateCcw, Headphones, Zap, Gift, Clock, ArrowRight, Check } from 'lucide-react';
import { products, categories, APP_NAME, ACCENT_COLOR } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline mock data ────────────────────────────────────────────────────────

const heroSlides = [
  {
    id: "h1",
    title: "Deals That Deliver",
    subtitle: "Up to 60% off top electronics, home essentials, and more",
    cta: "Shop Now",
    href: "/search?filter=deals",
    bg: "from-[#131921] to-[#232F3E]",
    accent: "#FF9900",
    image: "https://img.cdn4dd.com/p/fit=cover,format=auto,quality=50,width=700,height=330/media/photosV2/7795a519-c64d-48ac-bcef-724693057137-retina-large.png",
    badge: "Limited Time",
  },
  {
    id: "h2",
    title: "Prime Day is Every Day",
    subtitle: "Exclusive member savings on millions of items, delivered fast",
    cta: "Try Prime Free",
    href: "/search",
    bg: "from-[#002244] to-[#003366]",
    accent: "#00A8E1",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/4c5638ab-e318-403f-b517-825f812b4b3a/d40488f7175d46e5929fc8577e5a12c3.png",
    badge: "Prime",
  },
  {
    id: "h3",
    title: "New Arrivals in Tech",
    subtitle: "The latest gadgets, wearables, and smart home devices",
    cta: "Explore Tech",
    href: "/search?category=electronics",
    bg: "from-[#1A0533] to-[#2D0A5C]",
    accent: "#FF9900",
    image: "https://i5.walmartimages.com/dfw/4ff9c6c9-5969/k2-_3ea07beb-a333-4108-9695-a66448879fd0.v1.jpg",
    badge: "New",
  },
];

const flashDeals = [
  {
    id: "fd1",
    title: "Echo Dot (5th Gen) Smart Speaker",
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/4c5638ab-e318-403f-b517-825f812b4b3a/b00a08c3b1664e5b8068cc64e4f515fb.png",
    rating: 4.7,
    reviewCount: 234512,
    timeLeft: "2h 14m",
    claimed: 78,
  },
  {
    id: "fd2",
    title: "Fire TV Stick 4K Max",
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    image: "https://images.thdstatic.com/productImages/9a968a4b-b391-48bf-8c6e-8e9cd60d528e/svn/black-amazon-media-streaming-devices-b0bp9snvh9-66_600.jpg",
    rating: 4.6,
    reviewCount: 98234,
    timeLeft: "4h 52m",
    claimed: 55,
  },
  {
    id: "fd3",
    title: "Ring Video Doorbell (2nd Gen)",
    price: 59.99,
    originalPrice: 99.99,
    discount: 40,
    image: "https://images.ctfassets.net/a3peezndovsu/6kniyNLANJtj2JUWDrpg0c/ce19376bc4a41ef1e21129d37e54bbb2/ring_battery_doorbell_plus_gen2_product_nickel_silver_1500x1500.jpg",
    rating: 4.5,
    reviewCount: 67891,
    timeLeft: "1h 30m",
    claimed: 91,
  },
  {
    id: "fd4",
    title: "Bose QuietComfort 45 Headphones",
    price: 199.99,
    originalPrice: 329.99,
    discount: 39,
    image: "https://m.media-amazon.com/images/I/51HHABMPoVL._AC_UF894,1000_QL80_.jpg",
    rating: 4.8,
    reviewCount: 45123,
    timeLeft: "6h 05m",
    claimed: 34,
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sarah M.",
    location: "New York, NY",
    rating: 5,
    text: "Prime delivery is unbeatable. I ordered a birthday gift at midnight and it arrived the next morning. The selection is incredible and prices are always competitive.",
    product: "Echo Show 10",
    avatar: "https://mormonartist.net/images/interviews/sarah-m-eden/sarah-m-eden-01.jpg",
  },
  {
    id: "t2",
    name: "James K.",
    location: "Austin, TX",
    rating: 5,
    text: "I've been a Prime member for 6 years. The combination of fast shipping, Prime Video, and exclusive deals makes it worth every penny. Customer service is top notch.",
    product: "Samsung 65\" QLED TV",
    avatar: "https://www.cultclassicmag.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fcultclassic%2FZtsdkxoQrfVKlzDS_0025_22.jpg%3Fauto%3Dformat%2Ccompress&w=3840&q=75",
  },
  {
    id: "t3",
    name: "Priya L.",
    location: "San Francisco, CA",
    rating: 5,
    text: "The return process is so easy. I bought the wrong size and had a full refund within 2 days. Shopping here feels completely risk-free.",
    product: "Kindle Paperwhite",
    avatar: "https://media.licdn.com/dms/image/v2/C5103AQERrtj7Jl7_Ng/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516971376224?e=2147483647&v=beta&t=fR8TxIH8oaMAK1kQPRSQkRNLoNiqVUk0VGy7sgpRWBU",
  },
];

const valueProps = [
  {
    id: "v1",
    icon: Truck,
    title: "Free & Fast Delivery",
    description:
      "Prime members get free two-day delivery on millions of items. Same-day delivery available in select cities.",
    color: "#FF9900",
  },
  {
    id: "v2",
    icon: Shield,
    title: "Buyer Protection",
    description:
      "Shop with confidence. Every purchase is protected by Amazon's A-to-Z Guarantee for a safe, secure experience.",
    color: "#00A8E1",
  },
  {
    id: "v3",
    icon: RotateCcw,
    title: "Hassle-Free Returns",
    description:
      "Not satisfied? Return most items within 30 days for a full refund. No questions asked, no hassle.",
    color: "#4CAF50",
  },
  {
    id: "v4",
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available around the clock via chat, phone, or email to help with any issue.",
    color: "#9C27B0",
  },
];

const trendingCategories = [
  {
    id: "tc1",
    name: "Gaming",
    items: "50,000+",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/4c5638ab-e318-403f-b517-825f812b4b3a/54f30530b23b4d9faa244e4042a3c756.png",
    href: "/search?category=gaming",
    color: "#1A1A2E",
  },
  {
    id: "tc2",
    name: "Fashion",
    items: "2M+",
    image: "https://i0.wp.com/newdigitalage.co/wp-content/uploads/2022/06/iStock-1334436084-jpg.webp?fit=1024%2C683&ssl=1",
    href: "/search?category=clothing",
    color: "#2D1B33",
  },
  {
    id: "tc3",
    name: "Smart Home",
    items: "120,000+",
    image: "https://static01.nyt.com/images/2024/02/06/multimedia/FASHION-PREVIEW-gmkt/FASHION-PREVIEW-gmkt-mobileMasterAt3x.jpg?auto=webp&quality=90",
    href: "/search?category=smart-home",
    color: "#0D2137",
  },
  {
    id: "tc4",
    name: "Beauty",
    items: "800,000+",
    image: "https://www.investopedia.com/thmb/ObBgOq9_WGDF6fk7LrRbA9yZUdw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/smart-home.asp-final-5de0da3d6d8a474f9028d26c957255fe.png",
    href: "/search?category=beauty",
    color: "#2D1A1A",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1" data-atomic-id="a1akylij">
      <div className="flex items-center" data-atomic-id="a1l3t2ha">
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
      <span
        className="text-[#007185] text-[12px] hover:text-[#C7511F] cursor-pointer"
        data-atomic-id="a12zn5z3">
        {(count ?? 0).toLocaleString("en-US")}
      </span>
    </div>
  );
}

const cardHover: Variants = {
  rest: { scale: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="bg-white rounded-lg overflow-hidden border border-black/5 flex flex-col cursor-pointer"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div
          className="relative bg-[#F7F8F8] aspect-square overflow-hidden"
          data-atomic-id="a10onl8x">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://target.scene7.com/is/image/Target/GUEST_3d817f79-35b7-4485-a0bc-0637a334b241?wid=300&hei=300&fmt=pjpeg";
            }}
            data-atomic-id="aqrhodq" />
          {product.badge && (
            <span
              className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide"
              data-atomic-id="a1hcu7xt">
              {product.badge}
            </span>
          )}
          {product.isPrime && (
            <span
              className="absolute bottom-2 left-2 bg-[#00A8E1] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm"
              data-atomic-id="ameabzn">
              prime
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col gap-1.5 flex-1" data-atomic-id="a10q2fdf">
          <p
            className="text-[#0F1111] text-[13px] leading-snug line-clamp-2 font-medium"
            data-atomic-id="a1pep4w3">
            {product.title}
          </p>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <div
            className="flex items-baseline gap-1.5 mt-auto pt-1"
            data-atomic-id="axm6soq">
            <span
              className="text-[#CC0C39] text-[11px] font-medium"
              data-atomic-id="a1rlyglo">
              {product.originalPrice ? "-" + Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) + "%" : ""}
            </span>
            <span
              className="text-[#0F1111] text-[18px] font-bold"
              data-atomic-id="a1swk2q6">
              ${(product.price ?? 0).toFixed(2)}
            </span>
          </div>
          {product.originalPrice && (
            <p className="text-[#565959] text-[11px]" data-atomic-id="acropzp">
              List:{" "}
              <span className="line-through" data-atomic-id="a1bnzbh8">
                ${product.originalPrice.toFixed(2)}
              </span>
            </p>
          )}
          {product.isPrime && (
            <p
              className="text-[#00A8E1] text-[11px] font-medium"
              data-atomic-id="a1j112s7">
              FREE delivery tomorrow
            </p>
          )}
        </div>
      </Link>
      <div
        className="px-3 pb-3"
        data-atomic-id="a1n261u8"
        style={{
          color: "#eff1f1",
          backgroundColor: "#ffd814"
        }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] text-[13px] font-medium py-1.5 rounded-full transition-colors duration-150 border border-[#FCD200]"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

function FlashDealCard({ deal }: { deal: (typeof flashDeals)[0] }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg overflow-hidden border border-black/5 flex flex-col"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
    >
      <Link href="/search?filter=deals" className="block">
        <div
          className="relative bg-[#F7F8F8] aspect-square overflow-hidden"
          data-atomic-id="ansnwoi">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://speedtalkmobile.com/wp-content/uploads/2022/06/speedtalk-mobile-15-dollar-6gb-unlimited-talk-text-plan-300x300.png";
            }}
            data-atomic-id="axrmewf" />
          <div
            className="absolute top-2 left-2 bg-[#CC0C39] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm"
            data-atomic-id="axt14qf">
            -{deal.discount}%
          </div>
          <div
            className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded-sm"
            data-atomic-id="axufyux">
            <Clock size={9} />
            {deal.timeLeft}
          </div>
        </div>
        <div className="p-3" data-atomic-id="anu2qt0">
          <p
            className="text-[#0F1111] text-[12px] leading-snug line-clamp-2 font-medium mb-1.5"
            data-atomic-id="a47mc5g">
            {deal.title}
          </p>
          <StarRating rating={deal.rating} count={deal.reviewCount} />
          <div className="flex items-baseline gap-1.5 mt-1.5" data-atomic-id="a14mbj7f">
            <span className="text-[#CC0C39] text-[16px] font-bold" data-atomic-id="af1x6x9">
              ${(deal.price ?? 0).toFixed(2)}
            </span>
            <span
              className="text-[#565959] text-[11px] line-through"
              data-atomic-id="agcit1r">
              ${(deal.originalPrice ?? 0).toFixed(2)}
            </span>
          </div>
          {/* Claimed bar */}
          <div className="mt-2" data-atomic-id="a14p57gf">
            <div
              className="h-1.5 bg-gray-200 rounded-full overflow-hidden"
              data-atomic-id="a5e7nj6">
              <div
                className="h-full bg-[#CC0C39] rounded-full"
                style={{ width: `${deal.claimed}%` }}
                data-atomic-id="a5d3js5" />
            </div>
            <p
              className="text-[#CC0C39] text-[10px] font-bold mt-0.5"
              data-atomic-id="aypdu41">
              {deal.claimed}% claimed
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const [heroIndex, setHeroIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[heroIndex] ?? heroSlides[0];

  return (
    <main className="bg-[#EAEDED] min-h-screen" data-atomic-id="a1blot3e">
      {/* ── Hero Carousel ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: 420 }}
        data-atomic-id="a1wke2kf">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative bg-gradient-to-r ${currentSlide.bg} flex items-center`}
            style={{ minHeight: 420 }}
          >
            {/* Background image */}
            <div className="absolute inset-0" data-atomic-id="a1himvy0">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover opacity-20"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                data-atomic-id="a12htelx" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
                data-atomic-id="a12j84fx" />
            </div>

            <div
              className="relative max-w-[1500px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-8 w-full"
              data-atomic-id="a1hk1q2i"
              style={{
                color: "#ededed",
                backgroundColor: "#00a8e1"
              }}>
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="flex-1 max-w-xl"
              >
                <span
                  className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                  style={{
                    backgroundColor: currentSlide.accent + "33",
                    color: currentSlide.accent,
                    border: `1px solid ${currentSlide.accent}55`,
                  }}
                  data-atomic-id="ablvpfz">
                  {currentSlide.badge}
                </span>
                <h1
                  className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight text-balance mb-4"
                  data-atomic-id="a1gueshk"
                  style={{
                    fontSize: "24px"
                  }}>
                  {currentSlide.title}
                </h1>
                <p
                  className="text-white/80 text-lg leading-relaxed mb-8 text-pretty"
                  data-atomic-id="avqhhkh">The latest gadgets, wearables, and smart home devices and many other things</p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href={currentSlide.href}
                    className="inline-flex items-center gap-2 font-bold text-[#0F1111] px-8 py-3 rounded-full text-[15px] transition-all duration-200"
                    style={{ backgroundColor: currentSlide.accent }}
                  >
                    {currentSlide.cta}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Slide indicators */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
                data-atomic-id="a19ciiwx">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === heroIndex ? 24 : 8,
                      height: 8,
                      backgroundColor:
                        i === heroIndex ? ACCENT_COLOR : "rgba(255,255,255,0.4)",
                    }}
                    data-atomic-id="apllp48"
                    data-atomic-instance={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next */}
        <button
          onClick={() =>
            setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
          data-atomic-id="a11h99hp">
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() =>
            setHeroIndex((prev) => (prev + 1) % heroSlides.length)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors z-10"
          data-atomic-id="aqiug3z">
          <ChevronRight size={20} />
        </button>
      </section>
      {/* ── Category Quick Links ───────────────────────────────────────── */}
      <section
        id="categories"
        className="bg-white border-b border-black/5"
        data-atomic-id="a1jscr5v">
        <div className="max-w-[1500px] mx-auto px-4 py-4" data-atomic-id="aco7yms">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
          >
            {categories.map((cat, __atomicIdx) => (<motion.div key={cat.id} variants={fadeIn}>
              <Link
                href={`/search?category=${cat.slug}`}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#F7F8F8] hover:bg-[#FF9900]/10 border border-black/5 hover:border-[#FF9900]/40 text-[#0F1111] text-[13px] font-medium transition-all duration-200 whitespace-nowrap"
              >
                <span data-atomic-id="a1hyof2y" data-atomic-instance={__atomicIdx}>{cat.icon}</span>
                <span data-atomic-id="a1j9a17g" data-atomic-instance={__atomicIdx}>{cat.name}</span>
              </Link>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── Flash Deals ────────────────────────────────────────────────── */}
      <section id="deals" className="py-8" data-atomic-id="a15oeiby">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="a17fq7pb">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex items-center justify-between mb-5"
          >
            <div className="flex items-center gap-3" data-atomic-id="a3r4vad">
              <Zap size={22} className="text-[#CC0C39]" />
              <h2
                className="text-[#0F1111] text-[22px] font-bold"
                data-atomic-id="a1oakctd">
                Today's Lightning Deals
              </h2>
              {mounted && (
                <span
                  className="flex items-center gap-1 text-[#CC0C39] text-[13px] font-medium bg-[#CC0C39]/10 px-2 py-0.5 rounded-full"
                  data-atomic-id="aesifuv">
                  <Clock size={12} />
                  Ends soon
                </span>
              )}
            </div>
            <Link
              href="/search?filter=deals"
              className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline flex items-center gap-1"
            >
              See all deals <ChevronRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {flashDeals.map((deal) => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── Featured Products ──────────────────────────────────────────── */}
      <section id="featured" className="py-8" data-atomic-id="aswd6xe">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="a1kzhceb">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex items-center justify-between mb-5"
          >
            <h2 className="text-[#0F1111] text-[22px] font-bold" data-atomic-id="aklh9b4">
              Best Sellers
            </h2>
            <Link
              href="/search"
              className="text-[#007185] text-[13px] hover:text-[#C7511F] hover:underline flex items-center gap-1"
            >
              See all <ChevronRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {(products ?? []).slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── Trending Categories ────────────────────────────────────────── */}
      <section id="trending" className="py-8" data-atomic-id="ag4bviu">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="a1yj8h3b">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-[#0F1111] text-[22px] font-bold mb-5"
          >
            Shop by Trending Category
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {trendingCategories.map((cat, __atomicIdx) => (<motion.div key={cat.id} variants={scaleIn}>
              <Link href={cat.href} className="block group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="relative rounded-xl overflow-hidden aspect-[4/3]"
                  style={{ backgroundColor: cat.color }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    data-atomic-id="a1wp7hx9"
                    data-atomic-instance={__atomicIdx} />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    data-atomic-id="a1wqm7r9"
                    data-atomic-instance={__atomicIdx} />
                  <div
                    className="absolute bottom-0 left-0 p-4"
                    data-atomic-id="a1ws11vr"
                    data-atomic-instance={__atomicIdx}>
                    <p
                      className="text-white font-bold text-[18px] leading-tight"
                      data-atomic-id="a1dpxtkn"
                      data-atomic-instance={__atomicIdx}>
                      {cat.name}
                    </p>
                    <p
                      className="text-white/70 text-[12px]"
                      data-atomic-id="a1dpxv95"
                      data-atomic-instance={__atomicIdx}>
                      {cat.items} items
                    </p>
                  </div>
                  <div
                    className="absolute top-3 right-3 bg-[#FF9900] text-[#0F1111] text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    data-atomic-id="a1wtfw09"
                    data-atomic-instance={__atomicIdx}>
                    Shop Now
                  </div>
                </motion.div>
              </Link>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── Value Props ────────────────────────────────────────────────── */}
      <section id="about" className="py-12 bg-white" data-atomic-id="a10er2i9">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="ajxchtu">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-10"
          >
            <h2
              className="text-[#0F1111] text-[28px] font-bold mb-2"
              data-atomic-id="a12w3ke7">
              Why Millions Choose {APP_NAME}
            </h2>
            <p
              className="text-[#565959] text-[15px] max-w-xl mx-auto leading-relaxed"
              data-atomic-id="a1vwkbsn">From fast delivery to easy returns, we make shopping simple and safe.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueProps.map((vp, __atomicIdx) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center p-6 rounded-xl border border-black/5 bg-[#FAFAFA]"
                  style={{
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: vp.color + "18" }}
                    data-atomic-id="a1fossdu"
                    data-atomic-instance={__atomicIdx}>
                    <Icon size={26} style={{ color: vp.color }} />
                  </div>
                  <h3
                    className="text-[#0F1111] font-bold text-[15px] mb-2"
                    data-atomic-id="aa6dtcc"
                    data-atomic-instance={__atomicIdx}>
                    {vp.title}
                  </h3>
                  <p
                    className="text-[#565959] text-[13px] leading-relaxed"
                    data-atomic-id="a131w4qr"
                    data-atomic-instance={__atomicIdx}>
                    {vp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── Prime Banner ───────────────────────────────────────────────── */}
      <section className="py-10" data-atomic-id="anmpr3p">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="axh3miu">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#002244] to-[#003D7A] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.07), 0 20px 60px -12px rgba(0,0,0,0.25)",
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-[#00A8E1]/10 rounded-full blur-3xl pointer-events-none"
              data-atomic-id="a15kblym" />

            <motion.div variants={slideInLeft} className="flex-1">
              <div className="flex items-center gap-2 mb-3" data-atomic-id="a1bvk0mr">
                <span
                  className="bg-[#00A8E1] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                  data-atomic-id="a14mqxdx">
                  Prime
                </span>
                <span className="text-white/60 text-[13px]" data-atomic-id="a15xcjif">
                  30-day free trial
                </span>
              </div>
              <h2
                className="text-white text-[28px] md:text-[36px] font-bold leading-tight mb-3 text-balance"
                data-atomic-id="amz5k4s">
                Get More with Amazon Prime
              </h2>
              <p
                className="text-white/70 text-[15px] leading-relaxed mb-6 max-w-lg"
                data-atomic-id="afrhft0">
                Free two-day delivery, exclusive deals, Prime Video, Prime
                Music, unlimited photo storage, and so much more.
              </p>
              <ul className="grid grid-cols-2 gap-2 mb-8" data-atomic-id="amz8nfb">
                {[
                  "Free 2-day delivery",
                  "Prime Video streaming",
                  "Prime Music",
                  "Exclusive member deals",
                  "Unlimited photo storage",
                  "Prime Reading",
                ].map((benefit, __atomicIdx) => (<li
                  key={benefit}
                  className="flex items-center gap-2 text-white/80 text-[13px]"
                  data-atomic-id="ao73hmh"
                  data-atomic-instance={__atomicIdx}>
                  <Check size={14} className="text-[#00A8E1] flex-shrink-0" />
                  {benefit}
                </li>))}
              </ul>
              <div className="flex flex-wrap gap-3" data-atomic-id="a1c17d4r">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#F7CA00] text-[#0F1111] font-bold px-6 py-3 rounded-full text-[14px] transition-colors duration-200"
                  >
                    Try Prime Free
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full text-[14px] border border-white/20 transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              className="hidden md:flex flex-col items-center gap-4"
            >
              <div
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center min-w-[200px]"
                data-atomic-id="a1infkz9">
                <p
                  className="text-white/60 text-[12px] uppercase tracking-wide mb-1"
                  data-atomic-id="adnxtr9">
                  Starting at
                </p>
                <p
                  className="text-white text-[40px] font-bold leading-none"
                  data-atomic-id="adnxvfr">
                  $14
                  <span className="text-[20px] font-medium" data-atomic-id="ae8pqek">.99</span>
                </p>
                <p className="text-white/60 text-[12px] mt-1" data-atomic-id="adnxx49">per month</p>
                <div className="mt-4 pt-4 border-t border-white/10" data-atomic-id="aztxzj2">
                  <p
                    className="text-[#00A8E1] text-[13px] font-medium"
                    data-atomic-id="avta59q">
                    or $139/year
                  </p>
                  <p className="text-white/50 text-[11px]" data-atomic-id="avta6y8">Save 2 months</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Customer Reviews ───────────────────────────────────────────── */}
      <section id="reviews" className="py-12 bg-white" data-atomic-id="a17x4y34">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="a1hwbp8h">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-center mb-10"
          >
            <h2
              className="text-[#0F1111] text-[28px] font-bold mb-2"
              data-atomic-id="a1l6pvha">
              What Our Customers Say
            </h2>
            <p className="text-[#565959] text-[15px]" data-atomic-id="a16mnw52">
              Trusted by hundreds of millions of shoppers worldwide
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((review, __atomicIdx) => (<motion.div
              key={review.id}
              variants={fadeInUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-[#FAFAFA] rounded-xl p-6 border border-black/5"
              style={{
                boxShadow:
                  "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.10)",
              }}
            >
              <div
                className="flex items-center gap-1 mb-3"
                data-atomic-id="apwuv13"
                data-atomic-instance={__atomicIdx}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#FF9900] text-[#FF9900]"
                  />
                ))}
              </div>
              <p
                className="text-[#0F1111] text-[14px] leading-relaxed mb-4 italic"
                data-atomic-id="a21neau"
                data-atomic-instance={__atomicIdx}
                style={__atomicIdx === 2 ? {
                  fontSize: "20px"
                } : __atomicIdx === 1 ? {
                  color: "#0f1111",
                  backgroundColor: "#f41515"
                } : __atomicIdx === 0 ? {
                  color: "#f02424"
                } : undefined}>{__atomicIdx === 0 ? "\"Prime delivery is unbeatable. I ordered a birthday gift at midnight and it arrived the next morning." : review.text}</p>
              <div
                className="flex items-center gap-3 pt-4 border-t border-black/5"
                data-atomic-id="apzoja3"
                data-atomic-instance={__atomicIdx}>
                <div
                  className="w-9 h-9 rounded-full bg-[#FF9900]/20 flex items-center justify-center text-[#FF9900] font-bold text-[14px] flex-shrink-0"
                  data-atomic-id="a146r8xq"
                  data-atomic-instance={__atomicIdx}>
                  {review.name?.charAt(0) ?? "?"}
                </div>
                <div data-atomic-id="a1486328" data-atomic-instance={__atomicIdx}>
                  <p
                    className="text-[#0F1111] text-[13px] font-bold"
                    data-atomic-id="adzirf4"
                    data-atomic-instance={__atomicIdx}>
                    {review.name}
                  </p>
                  <p
                    className="text-[#565959] text-[11px]"
                    data-atomic-id="adzit3m"
                    data-atomic-instance={__atomicIdx}>
                    {review.location} · Verified Purchase
                  </p>
                </div>
                <div
                  className="ml-auto"
                  data-atomic-id="a149kx6q"
                  data-atomic-instance={__atomicIdx}>
                  <span
                    className="text-[#007185] text-[11px] bg-[#007185]/10 px-2 py-0.5 rounded-full"
                    data-atomic-id="azrjzro"
                    data-atomic-instance={__atomicIdx}>
                    {review.product}
                  </span>
                </div>
              </div>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── Gift Cards & Special Offers ────────────────────────────────── */}
      <section id="gifts" className="py-10" data-atomic-id="av53mok">
        <div className="max-w-[1500px] mx-auto px-4" data-atomic-id="a1vg2txh">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Gift Cards */}
            <motion.div
              variants={slideInLeft}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1A1A2E] to-[#16213E] p-8 flex items-center gap-6"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.07), 0 20px 60px -12px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none"
                data-atomic-id="a1vrnjio" />
              <div
                className="w-16 h-16 rounded-2xl bg-[#FF9900]/20 flex items-center justify-center flex-shrink-0"
                data-atomic-id="a1vt2dn6">
                <Gift size={32} className="text-[#FF9900]" />
              </div>
              <div data-atomic-id="a1vuh7ro">
                <h3
                  className="text-white text-[20px] font-bold mb-1"
                  data-atomic-id="afmcgzz">
                  Amazon Gift Cards
                </h3>
                <p
                  className="text-white/60 text-[13px] leading-relaxed mb-4"
                  data-atomic-id="a1bts7vq">
                  The perfect gift for everyone. Available in any amount from
                  $1 to $2,000. Delivered instantly by email.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1.5 text-[#FF9900] text-[13px] font-bold hover:underline"
                >
                  Shop Gift Cards <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Referral / Rewards */}
            <motion.div
              variants={slideInRight}
              whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0D2137] to-[#1A3A5C] p-8 flex items-center gap-6"
              style={{
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.07), 0 20px 60px -12px rgba(0,0,0,0.2)",
              }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#00A8E1]/10 rounded-full blur-3xl pointer-events-none"
                data-atomic-id="aaaam8k" />
              <div
                className="w-16 h-16 rounded-2xl bg-[#00A8E1]/20 flex items-center justify-center flex-shrink-0"
                data-atomic-id="aabpgd2">
                <Zap size={32} className="text-[#00A8E1]" />
              </div>
              <div data-atomic-id="aad4ahk">
                <h3
                  className="text-white text-[20px] font-bold mb-1"
                  data-atomic-id="a1vxn3pv">
                  Amazon Rewards Visa
                </h3>
                <p
                  className="text-white/60 text-[13px] leading-relaxed mb-4"
                  data-atomic-id="apqhdd6">
                  Earn 5% back at Amazon and Whole Foods Market. 2% at
                  restaurants, gas stations, and drugstores.
                </p>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-1.5 text-[#00A8E1] text-[13px] font-bold hover:underline"
                >
                  Learn More <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 bg-[#131921]" data-atomic-id="aid2ba0">
        <div
          className="max-w-[1500px] mx-auto px-4 text-center"
          data-atomic-id="a9ypwnd">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h2
              className="text-white text-[32px] md:text-[40px] font-bold mb-4 text-balance"
              data-atomic-id="aknwrdy">
              Earth's Biggest Selection. Delivered.
            </h2>
            <p
              className="text-white/60 text-[16px] leading-relaxed mb-8 max-w-xl mx-auto text-pretty"
              data-atomic-id="a1ifr0qm">
              Millions of products. Competitive prices. Fast, reliable delivery
              right to your door. Start shopping today.
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-4"
              data-atomic-id="a16pu8dv">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 bg-[#FF9900] hover:bg-[#F7CA00] text-[#0F1111] font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors duration-200"
                >
                  Start Shopping
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/search?filter=deals"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3.5 rounded-full text-[15px] border border-white/20 transition-colors duration-200"
                >
                  View Today's Deals
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}