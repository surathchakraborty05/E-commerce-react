import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  Tag,
  Star,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Cpu,
  Layers,
  Check,
  Globe,
  Award,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sliders,
  Menu,
  X,
  Send,
  Lock,
  Activity,
  Users,
  Box,
  Eye,
  CreditCard,
  Flame,
  CheckCircle2,
  Plus,
  Minus,
  ExternalLink
} from 'lucide-react';

// ==========================================
// DATA DEFINITIONS & STATIC ASSETS
// ==========================================

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  badge: string;
  image: string;
  specs: { label: string; value: string }[];
  accentColor: string;
}

const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-01',
    name: 'Lux Store Chrono-Vision HUD',
    tagline: 'Spatial AR eyewear with quantum neural projection',
    category: 'electronics',
    price: 1899,
    originalPrice: 2299,
    rating: 4.96,
    reviewsCount: 1420,
    badge: 'FLAGSHIP EDITION',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop',
    accentColor: '#00f3ff',
    specs: [
      { label: 'Latency', value: '0.04 ms' },
      { label: 'FOV', value: '140° Retina' },
      { label: 'Battery', value: '48h Active' }
    ]
  },
  {
    id: 'prod-02',
    name: 'Vortex Carbon Strider X',
    tagline: 'Kinetic gravity-defying carbon fiber sprint sneaker',
    category: 'shoes',
    price: 480,
    originalPrice: 620,
    rating: 4.92,
    reviewsCount: 3890,
    badge: 'HYPER-LIGHTWEIGHT',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    accentColor: '#ff00ff',
    specs: [
      { label: 'Weight', value: '185 grams' },
      { label: 'Cushion', value: 'Aero-Gel Foam' },
      { label: 'Grip', value: 'Mag-Traction' }
    ]
  },
  {
    id: 'prod-03',
    name: 'Cyber-Silk Stealth Parka',
    tagline: 'Thermo-adaptive graphene weave with waterproof shielding',
    category: 'clothing',
    price: 790,
    originalPrice: 950,
    rating: 4.89,
    reviewsCount: 940,
    badge: 'BIO-RESPONSIVE',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
    accentColor: '#00f3ff',
    specs: [
      { label: 'Thermal', value: '-30°C to +40°C' },
      { label: 'Weave', value: '100% Graphene' },
      { label: 'Pockets', value: 'RFID Shielded' }
    ]
  },
  {
    id: 'prod-04',
    name: 'Pulse-Wave Spatial Audio Pro',
    tagline: 'Lossless planar magnetic acoustic headphones with ANC',
    category: 'electronics',
    price: 649,
    originalPrice: 799,
    rating: 4.98,
    reviewsCount: 2650,
    badge: 'AUDIOPHILE CERTIFIED',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    accentColor: '#fefe00',
    specs: [
      { label: 'Driver', value: '50mm Planar' },
      { label: 'ANC', value: '-48dB Hybrid' },
      { label: 'Audio', value: '192kHz / 32-bit' }
    ]
  },
  {
    id: 'prod-05',
    name: 'Aura Titanium Chronograph',
    tagline: 'Solar-kinetic timepiece crafted from aerospace Grade-5 titanium',
    category: 'general',
    price: 1250,
    originalPrice: 1500,
    rating: 4.95,
    reviewsCount: 820,
    badge: 'LIMITED TO 500',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    accentColor: '#00f3ff',
    specs: [
      { label: 'Depth', value: '300m / 30ATM' },
      { label: 'Crystal', value: 'Sapphire Glass' },
      { label: 'Chamber', value: 'Helium Escape' }
    ]
  },
  {
    id: 'prod-06',
    name: 'Exo-Grip Cyber Sneaker 02',
    tagline: 'Self-lacing biometric compression running silhouette',
    category: 'shoes',
    price: 520,
    originalPrice: 650,
    rating: 4.91,
    reviewsCount: 1740,
    badge: 'SELF-LACING',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    accentColor: '#ff00ff',
    specs: [
      { label: 'Tension', value: 'Micro-Dial' },
      { label: 'Sensors', value: 'Stride Telemetry' },
      { label: 'Chassis', value: 'Carbon Plate' }
    ]
  }
];

const CATEGORIES_DATA = [
  {
    id: 'electronics',
    title: 'Cybernetics & Audio',
    subtitle: 'Neural interfaces, planar acoustics & spatial computing',
    count: '64 Items',
    accent: 'from-cyan-500/20 to-blue-600/30',
    border: 'border-cyan-500/40',
    glow: 'rgba(0, 243, 255, 0.3)',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop',
    tag: 'ULTRA HIGH TECH'
  },
  {
    id: 'shoes',
    title: 'Kinetic Footwear',
    subtitle: 'Carbon-plated runners, self-adaptive soles & lifestyle kicks',
    count: '48 Items',
    accent: 'from-fuchsia-500/20 to-pink-600/30',
    border: 'border-fuchsia-500/40',
    glow: 'rgba(255, 0, 255, 0.3)',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    tag: 'ZERO GRAVITY'
  },
  {
    id: 'clothing',
    title: 'Bio-Weave Apparel',
    subtitle: 'Graphene thermal outerwear & minimalist cyber streetwear',
    count: '92 Items',
    accent: 'from-indigo-500/20 to-purple-600/30',
    border: 'border-indigo-500/40',
    glow: 'rgba(99, 102, 241, 0.3)',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    tag: 'FUTURE TEXTILES'
  },
  {
    id: 'general',
    title: 'Titanium Goods & EDC',
    subtitle: 'Everyday titanium accessories, optics & precision timepieces',
    count: '37 Items',
    accent: 'from-emerald-500/20 to-teal-600/30',
    border: 'border-emerald-500/40',
    glow: 'rgba(16, 185, 129, 0.3)',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    tag: 'LIFETIME GRADE'
  }
];

const FEATURES_DATA = [
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'Quantum multi-signature cryptography & biometric tokenization guarantee zero fraudulent exposure on every checkout.',
    badge: 'BANK-GRADE 256-BIT'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Autonomous hyper-transit routing & sub-orbital drone couriers deliver straight to your doorstep in record time.',
    badge: 'UNDER 120 MINS'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Engineered from aerospace-grade titanium, real carbon weaves, and sapphire glass built to outlive conventional standards.',
    badge: 'LIFETIME WARRANTY'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Zero hassle, 30-day touchless returns with instant automated refund credits beamed directly back to your account.',
    badge: '100% RISK-FREE'
  },
  {
    icon: Headphones,
    title: '24/7 Concierge Support',
    description: 'Dedicated human specialists paired with instantaneous neural dispatch agents ready to resolve any inquiry 24/7.',
    badge: '12 SEC RESPONSE'
  },
  {
    icon: Tag,
    title: 'Best Deals & Parity',
    description: 'Dynamic price-synchronization algorithm continually scans global indexes to guarantee you hold the lowest price tier.',
    badge: 'AUTOMATIC PARITY'
  }
];

const TIMELINE_STEPS = [
  {
    number: '01',
    title: 'Quantum Order Placement',
    subtitle: 'Zero-friction 1-click biometric checkout',
    description: 'Your neural preferences auto-populate sizes, addresses, and currency. No endless forms or authentication friction.',
    icon: Cpu
  },
  {
    number: '02',
    title: 'Autonomous Precision Assembly',
    subtitle: 'Nanofactory robotic quality validation',
    description: 'Each piece passes a 48-point laser optical scanning and precision calibration sequence before packaging.',
    icon: Layers
  },
  {
    number: '03',
    title: 'Hyperloop & Drone Transit',
    subtitle: 'Sub-orbital trajectory & real-time telemetry',
    description: 'Track your package down to the millimeter with live satellite telemetry and automated climate control.',
    icon: Truck
  },
  {
    number: '04',
    title: 'Unboxing & Device Pairing',
    subtitle: 'Instantaneous NFC & bio-sync activation',
    description: 'Crack open hermetically sealed packaging and tap your smartphone for immediate VIP concierge warranty onboarding.',
    icon: Sparkles
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Principal Industrial Designer, Neo-Zurich',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    text: 'Lux Store is the only platform that feels like it stepped out of the year 2040. The Chrono-Vision HUD arrived in 90 minutes and the build quality blows traditional luxury brands completely out of the water.',
    tag: 'VERIFIED ARCHITECT'
  },
  {
    id: 2,
    name: 'Kaito Tanaka',
    role: 'Aerospace Systems Lead, Orbital Dynamics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    text: 'The carbon fiber sneakers have genuinely transformed my daily ergonomics. The weight distribution is absurdly good. Seamless checkout, zero packaging waste, and unmatched customer care.',
    tag: 'EXECUTIVE VIP'
  },
  {
    id: 3,
    name: 'Dr. Soraya Mir',
    role: 'Neurotech Researcher, Cambridge',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    text: 'Every purchase feels like acquiring museum-grade hardware. The planar magnetic audio clarity is pristine down to 10Hz. The 3D previews were 100% accurate to the real object.',
    tag: 'EARLY ALLOCATOR'
  }
];

const FAQ_ITEMS = [
  {
    q: 'How long does delivery take?',
    a: 'Metropolitan orders arrive within 90 to 180 minutes via our autonomous regional drone and rapid transit fulfillment nodes. For international destinations, our express air freight guarantees arrival within 24 to 48 hours worldwide with real-time GPS telemetry.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major global credit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, Digital Wallet Credits, and multi-chain crypto assets (BTC, ETH, USDC, SOL) with zero gas or conversion fees.'
  },
  {
    q: 'Can I return products?',
    a: 'Yes! We offer an unconditional 30-day "Zero-Friction" return policy. Simply initiate the return in your profile matrix or tap the NFC tag on the product box. A courier will collect it from your location at no cost, and your refund processes instantly.'
  },
  {
    q: 'Do you offer international shipping?',
    a: 'We ship to over 140 countries worldwide. All taxes, duties, customs clearances, and insurance are computed and settled during checkout with zero hidden arrival charges.'
  },
  {
    q: 'Is my payment secure?',
    a: 'Every transaction is protected by quantum-resistant 256-bit AES encryption, biometric tokenization, and multi-layer fraud prevention. We never store raw payment credentials on our servers.'
  },
  {
    q: 'How can I track my order?',
    a: 'Once an order is confirmed, you receive an interactive satellite tracking link providing live telemetry, vehicle coordinates, temperature control metrics, and estimated time of arrival accurate down to the minute.'
  },
  {
    q: 'Do you provide customer support?',
    a: 'Yes! Our dedicated concierge squad is available 24/7/365 with an average human response time under 15 seconds via live chat, audio hotline, or high-priority neural messaging.'
  },
  {
    q: 'Are there any membership benefits?',
    a: 'Members of our Lux Store Syndicate receive early access to limited edition drops, zero delivery fees on all orders, bespoke concierge unboxing, and up to 10% cash back in Digital Wallet credits.'
  }
];

// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================

const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({
  value,
  suffix = '',
  prefix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// ==========================================
// 3D TILT PRODUCT CARD COMPONENT
// ==========================================

interface TiltCardProps {
  product: ProductItem;
  onAddToCart: (p: ProductItem) => void;
  onExplore: (category: string) => void;
}

const TiltProductCard: React.FC<TiltCardProps> = ({ product, onAddToCart, onExplore }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d'
      }}
      className="relative w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={{ scale: 1.02 }}
        className="relative group rounded-3xl p-6 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-colors duration-500 shadow-2xl overflow-hidden"
      >
        {/* Dynamic Inner Glow */}
        <div
          className="absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: product.accentColor }}
        />

        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
          <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase font-bold rounded-full bg-white/5 border border-white/10 text-cyan-400">
            {product.badge}
          </span>
          <div className="flex items-center gap-1 text-xs font-mono text-yellow-400 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-white/40">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Image Showcase with 3D Depth */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="relative w-full h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-black/80 to-black/30 border border-white/5 mb-6 flex items-center justify-center group-hover:shadow-[0_15px_35px_rgba(0,243,255,0.15)] transition-shadow duration-500"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <button
            onClick={() => onExplore(product.category)}
            className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black border border-white/20 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100"
            title="Inspect 3D Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Details */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
                {product.tagline}
              </p>
            </div>
          </div>

          {/* Specs Micro-Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-white/5 text-[11px] font-mono">
            {product.specs.map((spec, i) => (
              <div key={i} className="text-center p-1.5 rounded-lg bg-white/[0.03]">
                <div className="text-white/40 text-[9px] uppercase tracking-wider">{spec.label}</div>
                <div className="text-white font-semibold truncate mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Price & CTA Action */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-white tracking-tight">
                  Rs{product.price}
                </span>
                <span className="text-xs font-mono line-through text-white/30">
                  Rs{product.originalPrice}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> In Stock • Instant Beam
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-semibold text-xs tracking-wider uppercase font-mono flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] active:scale-95 transition-all duration-300"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Acquire</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// FAQ ACCORDION ITEM COMPONENT
// ==========================================

const FAQAccordionItem: React.FC<{
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, isOpen, onToggle, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-2xl transition-all duration-300 border ${isOpen
          ? 'bg-white/[0.06] border-cyan-400/40 shadow-[0_4px_30px_rgba(0,243,255,0.1)]'
          : 'bg-white/[0.02] border-white/5 hover:border-white/20'
        } overflow-hidden backdrop-blur-md`}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-cyan-400/70 font-bold">
            0{index + 1}
          </span>
          <span className="font-display font-medium text-base text-white hover:text-cyan-300 transition-colors">
            {item.q}
          </span>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${isOpen ? 'bg-cyan-400 text-black border-cyan-400 rotate-180' : 'bg-white/5 text-white/60 border-white/10'
          }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 pt-1 text-sm text-white/60 leading-relaxed font-sans border-t border-white/5 mt-1">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ==========================================
// MAIN LANDING PAGE COMPONENT
// ==========================================

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Simulator Configurator State
  const [configAura, setConfigAura] = useState<'cyan' | 'magenta' | 'yellow' | 'emerald'>('cyan');
  const [configPerformance, setConfigPerformance] = useState(94);
  const [configTelemetryMode, setConfigTelemetryMode] = useState(true);

  // Mouse Coordinates for Hero Glow Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };
  //stop unauthenticated user
  
const handleShopNow = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
    return;
  }

  navigate("/shop");
};
const handleProfile = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
    return;
  }

  navigate("/profile");
};
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Testimonials Auto-scroll interval
  useEffect(() => {
    if (isTestimonialPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isTestimonialPaused]);

  // Quick Cart Action
  const handleAddToCart = (product: ProductItem) => {
    setCartCount(prev => prev + 1);
    setShowNotification(`Acquired: ${product.name}`);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const handleNavigateCategory = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  // Color mappings for simulator
  const auraGradients = {
    cyan: {
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      glow: 'rgba(0, 243, 255, 0.4)',
      text: 'text-cyan-400',
      border: 'border-cyan-400/50'
    },
    magenta: {
      gradient: 'from-pink-500 via-fuchsia-600 to-purple-600',
      glow: 'rgba(255, 0, 255, 0.4)',
      text: 'text-fuchsia-400',
      border: 'border-fuchsia-400/50'
    },
    yellow: {
      gradient: 'from-yellow-400 via-amber-500 to-orange-500',
      glow: 'rgba(254, 254, 0, 0.4)',
      text: 'text-yellow-400',
      border: 'border-yellow-400/50'
    },
    emerald: {
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      glow: 'rgba(16, 185, 129, 0.4)',
      text: 'text-emerald-400',
      border: 'border-emerald-400/50'
    }
  };

  return (
    <div
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden"
    >
      {/* ============================================================ */}
      {/* TOAST NOTIFICATION */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/90 border border-cyan-400/50 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,243,255,0.3)]"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-white">{showNotification}</p>
              <p className="text-[10px] text-white/50">Item synched to your quantum cart.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* BACKGROUND AMBIENT PARTICLES & GRID */}
      {/* ============================================================ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Cybernetic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-2/3 -right-48 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/3 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      {/* ============================================================ */}
      {/* NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {/* Logo */}
          <div
            onClick={() => navigate('/shop')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-fuchsia-500 p-[1.5px] shadow-[0_0_20px_rgba(0,243,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition-shadow">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400 fill-current group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tighter text-white">
                LUX STORE
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[9px] font-mono tracking-widest text-cyan-400 border border-cyan-400/30 rounded bg-cyan-400/5">
                v4.0
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-white/60">
            <a href="#showcase" className="hover:text-cyan-400 transition-colors">Showcase</a>
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#categories" className="hover:text-cyan-400 transition-colors">Categories</a>
            <a href="#timeline" className="hover:text-cyan-400 transition-colors">Process</a>
            <a href="#highlights" className="hover:text-cyan-400 transition-colors">Highlights</a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">Neural Lab</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 text-white/80 hover:text-white transition-all group"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black text-[10px] font-bold font-mono flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.6)]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={handleShopNow}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono tracking-wider uppercase hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all duration-300 flex items-center gap-2"
            >
              <span>Enter Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl bg-black/90 border border-white/10 backdrop-blur-2xl p-6 shadow-2xl flex flex-col gap-4 font-mono text-xs uppercase tracking-wider"
            >
              <a onClick={() => setMobileMenuOpen(false)} href="#showcase" className="py-2 text-white/70 hover:text-cyan-400">Showcase</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#features" className="py-2 text-white/70 hover:text-cyan-400">Features</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#categories" className="py-2 text-white/70 hover:text-cyan-400">Categories</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#timeline" className="py-2 text-white/70 hover:text-cyan-400">Process</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#highlights" className="py-2 text-white/70 hover:text-cyan-400">Highlights</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#simulator" className="py-2 text-white/70 hover:text-cyan-400">Neural Lab</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#faq" className="py-2 text-white/70 hover:text-cyan-400">FAQ</a>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/'); }}
                className="w-full mt-2 py-3 rounded-xl bg-cyan-400 text-black font-bold text-center"
              >
                Launch Storefront
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 1. HERO SECTION */}
      {/* ============================================================ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-6 overflow-hidden"
      >
        {/* Mouse Follow Glow Spot */}
        <motion.div
          className="pointer-events-none absolute w-[40rem] h-[40rem] rounded-full blur-[160px] opacity-25"
          style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(0,243,255,0.4) 0%, rgba(255,0,255,0.2) 50%, transparent 80%)'
          }}
        />

        {/* Floating Geometric Wireframes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ rotate: 360, y: [0, -25, 0] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute top-1/4 left-8 md:left-24 w-32 h-32 rounded-3xl border bg-gradient-to-r from-violet-500 to-cyan-500 backdrop-blur-md rotate-12"
          />
          <motion.div
            animate={{ rotate: 360, y: [0, -25, 0] }}
            transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute top-1/4 right-8 md:right-24 w-32 h-32 rounded-3xl border shadow-cyan-500/20 backdrop-blur-md rotate-12"
          />
          <motion.div
            animate={{ rotate: -360, y: [0, 30, 0] }}
            transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, y: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-1/4 right-8 md:right-28 w-44 h-44 rounded-full border bg-gradient-to-r from-violet-500 to-cyan-500 backdrop-blur-md"
          />
          <motion.div
            animate={{ rotate: -360, y: [0, 30, 0] }}
            transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, y: { duration: 8, repeat: Infinity, ease: 'easeInOut' } }}
            className="absolute bottom-1/4 left-8 md:left-28 w-44 h-44 rounded-full border border-fuchsia-400/20 backdrop-blur-md"
          />
          
          <motion.div
            animate={{
              rotate: [0, 120, 240, 360],
              y: [0, 25, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              rotate: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
              y: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute top-60 left-16
    md:left-18 w-44 h-44
    border border-cyan-400/25
    bg-black-400/30
    backdrop-blur-md
    shadow-[0_50px_50px_rgba(217,70,239,0.06)]"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
          <motion.div
            animate={{
              rotate: [0, 120, 240, 360],
              y: [0, 25, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              rotate: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
              y: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute top-60 right-16
    md:right-18 w-44 h-44
    border border-[#00F5D4]/30
    bg-[#00F5D4]/[0.03]
    backdrop-blur-md
    shadow-[0_50px_50px_rgba(217,70,239,0.06)]"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          />
        

        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-cyan-400/30 backdrop-blur-xl mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
              NEXT-GEN COMMERCE 4.0 • POWERED BY NEURAL SYNC
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.05] max-w-5xl"
          >
            Discover The Future Of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 drop-shadow-[0_0_35px_rgba(0,243,255,0.4)]">
              Online Shopping
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/60 max-w-2xl font-sans font-light leading-relaxed"
          >
            Experience sub-orbital drone fulfillment, tactile 3D interactive hardware previews,
            and aerospace-grade titanium artifacts built for the next century.
          </motion.p>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={handleShopNow}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 hover:from-cyan-300 hover:to-blue-400 text-black font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(0,243,255,0.4)] hover:shadow-[0_0_60px_rgba(0,243,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Explore Flagship Store</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#showcase"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-400/40 text-white font-display font-semibold text-sm tracking-wider uppercase backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
              <span>Experience 3D Showcase</span>
            </a>
          </motion.div>

          {/* Hero 3D Card Stack Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-16 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          >
            {/* Left Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden md:block p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Activity className="w-4 h-4 top-0" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">Latency Standard</div>
                  <div className="text-sm font-mono font-bold text-white">0.02ms Sync</div>
                  <img
                    src="https://images.unsplash.com/photo-1456574808786-d2ba7a6aa654?q=80&w=1344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Chrono-Vision"
                    className="w-40 h-40 mx-auto object-cover rounded-2xl mb-4 border border-white/10 shadow-lg"
                  />
                </div>
              </div>
              <p className="text-xs text-white/50">Decentralized neural caching nodes across 28 global regions.</p>
            </motion.div>

            {/* Center Hero Spotlight Card */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-cyan-400/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,243,255,0.15)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <img
                src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop"
                alt="Chrono-Vision"
                className="w-40 h-40 mx-auto object-cover rounded-2xl mb-4 border border-white/10 shadow-lg"
              />
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[10px] font-bold mb-1">
                FEATURED HARDWARE
              </div>
              <h4 className="font-display font-bold text-base text-white">Chrono-Vision Spatial HUD</h4>
              <p className="text-xs font-mono text-white/50 mt-1">Rs 1,899 • Instant Beam Dispatch</p>
            </motion.div>

            {/* Right Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden md:block p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-fuchsia-400/10 text-fuchsia-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">Hardware Grade</div>
                  <div className="text-sm font-mono font-bold text-white">Aerospace-5 Titanium</div>
                  <img
                    src="https://plus.unsplash.com/premium_photo-1722111091429-dd3dc55979d3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Chrono-Vision"
                    className="w-40 h-40 mx-auto object-cover rounded-2xl mb-4 border border-white/10 shadow-lg"
                  />
                </div>
              </div>
              <p className="text-xs text-white/50">Zero plastic degradation with ultra-dense tactile unibody construction.</p>
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-14 flex flex-col items-center gap-2 text-white/40 font-mono text-[10px] tracking-widest uppercase"
          >
            <span>Scroll To Inspect</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ============================================================ */}
      {/* 2. 3D PRODUCT SHOWCASE SECTION */}
      {/* ============================================================ */}
      <section id="showcase" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
              <Box className="w-4 h-4" />
              <span>PSEUDO-3D REPERTOIRE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Crafted Beyond Physical Limits
            </h2>
          </div>
          <p className="text-sm text-white/50 max-w-md font-sans">
            Hover and rotate each artifact in real-time. Designed with sub-millimeter precision,
            aerospace materials, and tactile kinetic response.
          </p>
        </div>

        {/* Product Cards Grid with Tilt & 3D Perspective */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.slice(0, 3).map((product) => (
            <TiltProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onExplore={handleNavigateCategory}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURES SECTION (GLASSMORPHISM CARDS) */}
      {/* ============================================================ */}
      <section id="features" className="py-24 px-6 relative z-10 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              SUPERIOR ENGINEERING
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4">
              Engineered For The Elite
            </h2>
            <p className="text-sm sm:text-base text-white/50 mt-4 font-sans">
              Every detail from quantum cryptography checkout to autonomous drone touchdown is engineered for zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES_DATA.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group p-8 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1">
                    {feature.badge}
                  </span>

                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. STATISTICS COUNTER SECTION */}
      {/* ============================================================ */}
      <section className="py-20 px-6 relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-2 text-cyan-400">
              <AnimatedCounter value={148900} suffix="+" />
            </div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Products Sold</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">↑ 28% MoM Acceleration</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-2 text-fuchsia-400">
              <AnimatedCounter value={84200} suffix="+" />
            </div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Happy Customers</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">99.4% Verified Satisfaction</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-2 text-yellow-400">
              <AnimatedCounter value={520000} suffix="+" />
            </div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Orders Delivered</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">Average 88 Min Touchdown</div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-3xl sm:text-5xl font-display font-extrabold text-white mb-2 text-cyan-300">
              <AnimatedCounter value={142} suffix="+" />
            </div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Countries Served</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">Full Duty-Prepaid Customs</div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CATEGORIES SHOWCASE SECTION */}
      {/* ============================================================ */}
      <section id="categories" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            SECTORS & TIERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4">
            Curated Category Vaults
          </h2>
          <p className="text-sm text-white/50 mt-3 font-sans">
            Explore dedicated thematic vaults engineered for audiophiles, runners, fashion visionaries, and EDC collectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleNavigateCategory(cat.id)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl shadow-xl transition-all duration-500 relative flex flex-col h-96"
            >
              {/* Image Container with Zoom */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-cyan-400 font-mono text-[9px] font-bold tracking-widest uppercase backdrop-blur-md">
                  {cat.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  {cat.count}
                </span>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 mt-1">
                  {cat.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-white transition-colors">
                  <span>Enter Sector</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. WHY CHOOSE US (INTERACTIVE TIMELINE) */}
      {/* ============================================================ */}
      <section id="timeline" className="py-24 px-6 relative z-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              END-TO-END FULFILLMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4">
              How The Neural Network Operates
            </h2>
            <p className="text-sm text-white/50 mt-3 font-sans">
              From the instant your biometric finger taps check out to sub-orbital touchdown at your physical coordinates.
            </p>
          </div>

          <div className="relative">
            {/* Center Connecting Glowing Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 -translate-y-1/2 opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {TIMELINE_STEPS.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex flex-col items-center text-center p-6 rounded-3xl bg-black/60 border border-white/10 hover:border-cyan-400/50 backdrop-blur-xl group transition-all"
                  >
                    {/* Number Badge with Pulse */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg mb-6 shadow-xl relative group-hover:scale-110 transition-transform">
                      <StepIcon className="w-6 h-6" />
                      <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[9px] font-mono bg-cyan-400 text-black rounded-full font-bold">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-[11px] font-mono text-cyan-400/80 mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PRODUCT HIGHLIGHTS SECTION (MARQUEE / CAROUSEL) */}
      {/* ============================================================ */}
      <section id="highlights" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
              HARDWARE SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4">
              Trending In Orbit
            </h2>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-2 group tracking-wider uppercase"
          >
            <span>View All 240+ Artifacts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.slice(3, 6).map((product) => (
            <TiltProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onExplore={handleNavigateCategory}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. CUSTOMER TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            AUTHENTIC COMMENDATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4 mb-16">
            Tested In Real Atmospheres
          </h2>

          {/* Testimonial Stage */}
          <div
            onMouseEnter={() => setIsTestimonialPaused(true)}
            onMouseLeave={() => setIsTestimonialPaused(false)}
            className="relative p-8 sm:p-12 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden min-h-[300px] flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-br-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* 5 Animated Glowing Stars */}
                <div className="flex items-center gap-1.5 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(254,254,0,0.6)]" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl text-white/90 font-sans font-light italic leading-relaxed max-w-3xl">
                  "{TESTIMONIALS[activeTestimonial].text}"
                </blockquote>

                <div className="mt-8 flex flex-col items-center">
                  <img
                    src={TESTIMONIALS[activeTestimonial].avatar}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 mb-3 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                  />
                  <div className="font-display font-bold text-lg text-white">
                    {TESTIMONIALS[activeTestimonial].name}
                  </div>
                  <div className="text-xs font-mono text-white/50">
                    {TESTIMONIALS[activeTestimonial].role}
                  </div>
                  <span className="mt-2 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-[9px] uppercase tracking-wider font-bold">
                    {TESTIMONIALS[activeTestimonial].tag}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Nav Dots & Arrows */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. INTERACTIVE EXPERIENCE SECTION (NEURAL SIMULATOR) */}
      {/* ============================================================ */}
      <section id="simulator" className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
                <Sliders className="w-4 h-4" />
                <span>NEURAL BENCHMARK CONFIGURATOR</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                Simulate Your Hardware Profile
              </h2>
              <p className="text-sm text-white/60 mt-3 font-sans leading-relaxed">
                Adjust quantum clock speed, aura resonance wavelength, and bio-telemetry streaming
                to watch your target gear re-tune instantaneously in virtual space.
              </p>

              {/* Aura Resonance Selector */}
              <div className="mt-8">
                <label className="text-xs font-mono text-white/60 uppercase tracking-wider block mb-3">
                  Resonance Aura Spectrum
                </label>
                <div className="flex items-center gap-3">
                  {(['cyan', 'magenta', 'yellow', 'emerald'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setConfigAura(color)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center gap-2 border ${configAura === color
                          ? `${auraGradients[color].border} bg-white/10 text-white shadow-[0_0_20px_${auraGradients[color].glow}]`
                          : 'border-white/10 bg-white/5 text-white/40 hover:text-white'
                        }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full bg-${color === 'cyan' ? 'cyan-400' : color === 'magenta' ? 'fuchsia-400' : color === 'yellow' ? 'yellow-400' : 'emerald-400'}`} />
                      <span>{color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="mt-8">
                <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                  <span>Throughput Overdrive</span>
                  <span className="text-cyan-400 font-bold">{configPerformance}% Speed</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={configPerformance}
                  onChange={(e) => setConfigPerformance(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Toggle */}
              <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div>
                  <div className="text-xs font-mono font-bold text-white">Quantum Telemetry Node</div>
                  <div className="text-[11px] text-white/40">Encrypt biometric bio-sync data</div>
                </div>
                <button
                  onClick={() => setConfigTelemetryMode(!configTelemetryMode)}
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${configTelemetryMode ? 'bg-cyan-400 justify-end' : 'bg-white/20 justify-start'
                    }`}
                >
                  <div className="w-4 h-4 rounded-full bg-black shadow-md" />
                </button>
              </div>
            </div>

            {/* Right Live Visual Sandbox */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                animate={{
                  rotate: [0, 4, -4, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-80 sm:w-96 p-8 rounded-3xl bg-black/80 border border-white/20 backdrop-blur-2xl text-center shadow-2xl overflow-hidden"
              >
                {/* Dynamically Styled Ambient Glow */}
                <div
                  className="absolute inset-0 opacity-30 blur-3xl transition-colors duration-700 pointer-events-none"
                  style={{ background: auraGradients[configAura].glow }}
                />

                <div className="relative z-10">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-2xl relative">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                      alt="Planar Spatial Audio"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white">
                    Spatial Planar Pro
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    Telemetry: {configTelemetryMode ? 'BIOMETRIC ENCRYPTED' : 'STANDARD SYNC'}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-white/40">Processing Rate</span>
                    <span className="font-bold text-white">{(configPerformance * 1.84).toFixed(1)} TFLOPS</span>
                  </div>

                  <button
                    onClick={() => navigate('/')}
                    className="w-full mt-6 py-3 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors shadow-lg"
                  >
                    Deploy This Configuration
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FAQ SECTION (ANIMATED ACCORDION) */}
      {/* ============================================================ */}
      <section id="faq" className="py-24 px-6 relative z-10 max-w-4xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest">
            INQUIRIES RESOLVED
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/50 mt-3 font-sans">
            Clear, transparent details regarding deliveries, quantum payments, warranties, and global concierge policies.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={activeFAQIndex === index}
              onToggle={() => setActiveFAQIndex(activeFAQIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. STRONG CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="py-24 px-6 relative z-10 max-w-6xl mx-auto">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-cyan-400/40 backdrop-blur-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,243,255,0.15)] text-center">
          {/* Ambient Corner Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-fuchsia-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              LIMITED FOUNDING ALLOCATION
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
              Step Into The Era Of <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400">
                Intelligent Commerce
              </span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-white/60 font-sans leading-relaxed">
              Join over 84,000 discerning collectors, architects, and founders enjoying instantaneous
              neural checkout, 30-day zero-friction returns, and aerospace grade guarantees.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleShopNow}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-display font-bold text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(0,243,255,0.5)] hover:shadow-[0_0_55px_rgba(0,243,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Launch Entire Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleProfile}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-semibold text-sm tracking-wider uppercase backdrop-blur-xl transition-all duration-300"
              >
                Access Profile Matrix
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Zero Membership Fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Sub-120 Min Global Touchdown
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                256-Bit Quantum Cryptography
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. MODERN FOOTER */}
      {/* ============================================================ */}
      <footer className="border-t border-white/10 bg-black/80 pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand Manifesto Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 p-[1px]">
                  <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-cyan-400 fill-current" />
                  </div>
                </div>
                <span className="font-display font-extrabold text-xl tracking-tighter text-white">
                  Lux Store
                </span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm mb-6">
                Pioneering hyper-curated, tactile e-commerce hardware, bio-responsive garments,
                and acoustic instruments forged for life beyond physical orbit.
              </p>

              {/* Newsletter Form */}
              <div className="max-w-sm">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold">
                  Subscribe To Drop Telemetry
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter neural email..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 text-xs font-mono text-white placeholder:text-white/30 outline-none transition-colors"
                  />
                  <button
                    onClick={() => {
                      setShowNotification("Subscribed to Drop Telemetry!");
                      setTimeout(() => setShowNotification(null), 3000);
                    }}
                    className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black transition-colors"
                    title="Transmit"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold mb-4">
                Sectors
              </h4>
              <ul className="space-y-2.5 text-xs text-white/50 font-sans">
                <li><button onClick={() => handleNavigateCategory('electronics')} className="hover:text-cyan-400 transition-colors">Cybernetics & HUDs</button></li>
                <li><button onClick={() => handleNavigateCategory('shoes')} className="hover:text-cyan-400 transition-colors">Kinetic Footwear</button></li>
                <li><button onClick={() => handleNavigateCategory('clothing')} className="hover:text-cyan-400 transition-colors">Bio-Weave Apparel</button></li>
                <li><button onClick={() => handleNavigateCategory('general')} className="hover:text-cyan-400 transition-colors">Titanium Timepieces</button></li>
                <li><button onClick={() => navigate('/orders')} className="hover:text-cyan-400 transition-colors">Order Telemetry</button></li>
              </ul>
            </div>

            {/* Architecture & Engineering */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold mb-4">
                Governance
              </h4>
              <ul className="space-y-2.5 text-xs text-white/50 font-sans">
                <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Quantum Security</a></li>
                <li><a href="#timeline" className="hover:text-cyan-400 transition-colors">Autonomous Routing</a></li>
                <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Privacy Shield</a></li>
                <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Terms Of Orbit</a></li>
                <li><button onClick={() => navigate('/settings')} className="hover:text-cyan-400 transition-colors">Neural Settings</button></li>
              </ul>
            </div>

            {/* Connect / Network */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold mb-4">
                Frequency
              </h4>
              <ul className="space-y-2.5 text-xs text-white/50 font-sans">
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><span>X (Twitter)</span><ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><span>Discord Syndicate</span><ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><span>Open Hardware</span><ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="mailto:support@Lux Store.network" className="hover:text-cyan-400 transition-colors">support@Lux Store.network</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Status */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
            <div>
              © 2026 Lux Store CORP. ALL QUANTUM RIGHTS RESERVED.
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400">All Neural Nodes Operational (99.99%)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
