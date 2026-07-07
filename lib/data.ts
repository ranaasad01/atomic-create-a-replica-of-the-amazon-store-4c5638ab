export const APP_NAME = "Amazon";
export const APP_TAGLINE = "Earth's Biggest Selection";
export const ACCENT_COLOR = "#FF9900";

export interface NavLink {
  label: string;
  href: string;
  type: "route" | "anchor";
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", type: "route" },
  { label: "Today's Deals", href: "/search?filter=deals", type: "route" },
  { label: "Cart", href: "/cart", type: "route" },
];

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "💻" },
  { id: "2", name: "Books", slug: "books", icon: "📚" },
  { id: "3", name: "Clothing", slug: "clothing", icon: "👕" },
  { id: "4", name: "Home & Kitchen", slug: "home-kitchen", icon: "🏠" },
  { id: "5", name: "Sports", slug: "sports", icon: "⚽" },
  { id: "6", name: "Toys", slug: "toys", icon: "🧸" },
  { id: "7", name: "Beauty", slug: "beauty", icon: "💄" },
  { id: "8", name: "Automotive", slug: "automotive", icon: "🚗" },
];

export interface Product {
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
  features: string[];
  inStock: boolean;
  soldBy: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation) Wireless Earbuds",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 84312,
    image: "https://m.media-amazon.com/images/I/51NRGHU2NoL._AC_UF894,1000_QL80_.jpg",
    category: "electronics",
    isPrime: true,
    badge: "Best Seller",
    description:
      "AirPods Pro feature up to 2x more Active Noise Cancellation than the previous generation, plus Adaptive Transparency, and Personalized Spatial Audio with dynamic head tracking.",
    features: [
      "Active Noise Cancellation",
      "Adaptive Transparency mode",
      "Personalized Spatial Audio",
      "Up to 30 hours total listening time",
      "MagSafe Charging Case",
    ],
    inStock: true,
    soldBy: "Amazon.com",
  },
  {
    id: "2",
    title: "Samsung 65-Inch Class QLED 4K Smart TV",
    price: 897.99,
    originalPrice: 1299.99,
    rating: 4.5,
    reviewCount: 23841,
    image: "https://images.samsung.com/is/image/samsung/p6pim/us/qn65q8faafxza/gallery/us-qled-q8f-qn65q8faafxza-546800050?$product-details-jpg$",
    category: "electronics",
    isPrime: true,
    badge: "Deal of the Day",
    description:
      "Experience stunning 4K resolution with Quantum Dot technology. The QLED display delivers vibrant colors and deep contrast for an immersive viewing experience.",
    features: [
      "4K QLED Display",
      "Quantum Processor 4K",
      "Object Tracking Sound",
      "Smart TV with Alexa built-in",
      "Motion Xcelerator 120Hz",
    ],
    inStock: true,
    soldBy: "Samsung Official",
  },
  {
    id: "3",
    title: "Kindle Paperwhite (16 GB) — Now with a 6.8\" display",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 112045,
    image: "https://m.media-amazon.com/images/I/71IcVl9xbYL._AC_UF1000,1000_QL80_.jpg",
    category: "books",
    isPrime: true,
    badge: "Amazon's Choice",
    description:
      "The thinnest, lightest Kindle Paperwhite ever. With a flush-front design and 300 ppi glare-free display, reading is comfortable in any light.",
    features: [
      "6.8\" 300 ppi display",
      "Adjustable warm light",
      "Up to 10 weeks battery life",
      "IPX8 waterproof",
      "16 GB storage",
    ],
    inStock: true,
    soldBy: "Amazon.com",
  },
  {
    id: "4",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    price: 79.95,
    originalPrice: 99.95,
    rating: 4.7,
    reviewCount: 198432,
    image: "https://m.media-amazon.com/images/I/71Z401LjFFL._AC_UF894,1000_QL80_.jpg",
    category: "home-kitchen",
    isPrime: true,
    badge: "Best Seller",
    description:
      "The Instant Pot Duo is the #1 selling multi-cooker. It replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    features: [
      "7-in-1 functionality",
      "6 Quart capacity",
      "14 one-touch programs",
      "Stainless steel inner pot",
      "Safety tested and certified",
    ],
    inStock: true,
    soldBy: "Instant Brands",
  },
  {
    id: "5",
    title: "Nike Air Max 270 Men's Running Shoes",
    price: 109.97,
    originalPrice: 150.0,
    rating: 4.4,
    reviewCount: 45231,
    image: "/images/nike-air-max-running-shoes.jpg",
    category: "clothing",
    isPrime: true,
    description:
      "The Nike Air Max 270 delivers a bold look with a large Air unit for all-day comfort. The mesh upper provides breathability while the foam midsole adds cushioning.",
    features: [
      "Max Air 270 unit",
      "Breathable mesh upper",
      "Foam midsole",
      "Rubber outsole",
      "Available in multiple colors",
    ],
    inStock: true,
    soldBy: "Nike",
  },
  {
    id: "6",
    title: "LEGO Star Wars The Mandalorian's N-1 Starfighter Building Set",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewCount: 8923,
    image: "/images/lego-star-wars-mandalorian-starfighter.jpg",
    category: "toys",
    isPrime: true,
    badge: "New Release",
    description:
      "Build and display the iconic N-1 Starfighter from The Mandalorian. This detailed LEGO set includes Mando and Grogu minifigures.",
    features: [
      "1,413 pieces",
      "Includes Mando and Grogu minifigures",
      "Detailed cockpit",
      "Display stand included",
      "Ages 10+",
    ],
    inStock: true,
    soldBy: "LEGO",
  },
  {
    id: "7",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    price: 649.99,
    originalPrice: 749.99,
    rating: 4.6,
    reviewCount: 12847,
    image: "/images/dyson-v15-cordless-vacuum.jpg",
    category: "home-kitchen",
    isPrime: true,
    badge: "Premium Pick",
    description:
      "The Dyson V15 Detect uses laser technology to reveal microscopic dust. The piezo sensor counts and sizes dust particles, automatically adapting suction power.",
    features: [
      "Laser dust detection",
      "Up to 60 min runtime",
      "HEPA filtration",
      "LCD screen",
      "5 cleaning modes",
    ],
    inStock: true,
    soldBy: "Dyson",
  },
  {
    id: "8",
    title: "The Alchemist — Paulo Coelho (Paperback)",
    price: 12.29,
    originalPrice: 17.99,
    rating: 4.7,
    reviewCount: 321089,
    image: "/images/the-alchemist-paulo-coelho-book.jpg",
    category: "books",
    isPrime: true,
    badge: "Classic",
    description:
      "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",
    features: [
      "208 pages",
      "Paperback edition",
      "International bestseller",
      "Available in 80+ languages",
      "25th Anniversary Edition",
    ],
    inStock: true,
    soldBy: "HarperOne",
  },
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export const sampleReviews: Review[] = [
  {
    id: "r1",
    author: "TechEnthusiast42",
    rating: 5,
    title: "Absolutely worth every penny",
    body: "I've been using these for three months now and the noise cancellation is incredible. Perfect for commuting and working from home. Battery life is excellent.",
    date: "2024-11-15",
    verified: true,
  },
  {
    id: "r2",
    author: "MusicLover_Sarah",
    rating: 4,
    title: "Great sound quality, minor fit issues",
    body: "The sound quality is top-notch and the ANC works really well. My only complaint is that the ear tips don't fit perfectly — I had to use the medium size instead of the default.",
    date: "2024-10-28",
    verified: true,
  },
  {
    id: "r3",
    author: "DailyCommuter",
    rating: 5,
    title: "Game changer for public transit",
    body: "These have completely transformed my daily commute. The transparency mode is so natural it's almost scary. Highly recommend to anyone who travels frequently.",
    date: "2024-12-01",
    verified: true,
  },
];

export const footerLinks = {
  getToKnowUs: [
    { label: "Careers", href: "/" },
    { label: "Blog", href: "/" },
    { label: "About Amazon", href: "/" },
    { label: "Investor Relations", href: "/" },
    { label: "Amazon Devices", href: "/" },
    { label: "Amazon Science", href: "/" },
  ],
  makeMoneyWithUs: [
    { label: "Sell products on Amazon", href: "/" },
    { label: "Sell on Amazon Business", href: "/" },
    { label: "Sell apps on Amazon", href: "/" },
    { label: "Become an Affiliate", href: "/" },
    { label: "Advertise Your Products", href: "/" },
    { label: "Self-Publish with Us", href: "/" },
  ],
  amazonPaymentProducts: [
    { label: "Amazon Business Card", href: "/" },
    { label: "Shop with Points", href: "/" },
    { label: "Reload Your Balance", href: "/" },
    { label: "Amazon Currency Converter", href: "/" },
  ],
  letUsHelpYou: [
    { label: "Amazon and COVID-19", href: "/" },
    { label: "Your Account", href: "/" },
    { label: "Your Orders", href: "/" },
    { label: "Shipping Rates & Policies", href: "/" },
    { label: "Returns & Replacements", href: "/" },
    { label: "Manage Your Content", href: "/" },
    { label: "Amazon Assistant", href: "/" },
    { label: "Help", href: "/" },
  ],
};