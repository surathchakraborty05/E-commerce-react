import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom'; 

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Banner {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  gradient: string;
  cta: string;
  category:string;
}

const BANNERS: Banner[] = [
  {
    id: 1,
    badge: "TRENDING",
    title: "Neural Footwear From A$ 219",
    description: "Experience zero-gravity comfort with our latest bio-sync sneakers.",
    image: "https://i.pinimg.com/736x/f6/6d/4c/f66d4cad658cce795b94a34b33325204.jpg",
    gradient: "from-cyan-500/20 to-blue-500/20",
    cta: "Shop Now",
    category:"shoes"
  },
  {
    id: 2,
    badge: "NEW ARRIVAL",
    title: "Smartwatch Pro Series",
    description: "Track fitness, calls, and notifications with a sleek modern design.",
    image: "https://i.pinimg.com/736x/de/9e/dc/de9edce8ef06b5eeb61e84fef42654a5.jpg",
    gradient: "from-purple-500/20 to-pink-500/20",
    cta: "Explore",
    category:"electronics"
  },
  {
    id: 3,
    badge: "LIMITED EDITION",
    title: "Aetheris Chrono Watch",
    description: "Time is relative. Control it with the new Chrono series.",
    image: "https://picsum.photos/seed/watch/800/600",
    gradient: "from-amber-500/20 to-orange-500/20",
    cta: "View Collection",
    category:"electronics"
  },
  {
    id: 4,
    badge: "HOT DEAL",
    title: "CyberSound Headphones",
    description: "Immersive 360° audio with adaptive noise cancellation.",
    image: "https://i.pinimg.com/736x/da/86/bc/da86bcd10808af67af54aea3d6851f7b.jpg",
    gradient: "from-emerald-500/20 to-teal-500/20",
    cta: "Buy Now",
    category:"electronics"
  },
  {
    id: 5,
    badge: "SUMMER SALE",
    title: "NeoStreet Fashion Drop",
    description: "Upgrade your wardrobe with futuristic streetwear styles.",
    image: "https://img.freepik.com/free-photo/medium-shot-wom…oors_23-2149870230.jpg?semt=ais_hybrid&w=740&q=80",
    gradient: "from-rose-500/20 to-red-500/20",
    cta: "Shop Collection",
    category:"clothing"
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {BANNERS.map((banner) => (
            <div key={banner.id} onClick={() => navigate(`/category/${banner.category}`)} className="flex-[0_0_100%] min-w-0 relative">
              <div className={cn(
                "flex flex-col md:flex-row items-center justify-between p-8 md:p-16 min-h-[400px] md:min-h-[500px] bg-gradient-to-br transition-all duration-700",
                banner.gradient
              )}>
                {/* Left Section */}
                <div className="flex-1 space-y-6 text-center md:text-left z-10">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan"
                  >
                    {banner.badge}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight"
                  >
                    {banner.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted text-lg max-w-md"
                  >
                    {banner.description}
                  </motion.p>
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-neon-cyan text-black font-bold uppercase tracking-widest text-xs hover:neon-glow-cyan transition-all"
                  >
                    {banner.cta}
                  </motion.button>
                </div>

                {/* Right Section */}
                <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-neon-cyan/20 blur-3xl rounded-full animate-pulse" />
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-2xl shadow-2xl relative z-10 border border-white/10"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-cyan hover:text-black z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-neon-cyan hover:text-black z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              selectedIndex === index ? "w-8 bg-neon-cyan" : "w-2 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
