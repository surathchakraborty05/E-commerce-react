import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Filter, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase, Product } from '../lib/supabase';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const CATEGORY_THEMES = {
    electronics: {
        title: "Neural Electronics",
        subtitle: "High-performance hardware for the digital frontier",
        accent: "text-neon-cyan",
        bgGradient: "from-neon-cyan/10 to-transparent",
        cardHover: "hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]",
        button: "bg-neon-cyan text-black hover:neon-glow-cyan"
    },
    shoes: {
        title: "Kinetic Footwear",
        subtitle: "Engineered for speed and zero-gravity comfort",
        accent: "text-neon-magenta",
        bgGradient: "from-neon-magenta/10 to-transparent",
        cardHover: "hover:border-neon-magenta/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]",
        button: "bg-neon-magenta text-white hover:neon-glow-magenta"
    },
    clothing: {
        title: "Aetheris Apparel",
        subtitle: "Minimalist design meets smart-fabric technology",
        accent: "text-neon-yellow",
        bgGradient: "from-neon-yellow/10 to-transparent",
        cardHover: "hover:border-neon-yellow/50 hover:shadow-[0_0_20px_rgba(254,254,0,0.15)]",
        button: "bg-neon-yellow text-black hover:neon-glow-yellow"
    },
    general: {
        title: "General Matrix",
        subtitle: "Essential supplies for every sector",
        accent: "text-white",
        bgGradient: "from-white/5 to-transparent",
        cardHover: "hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
        button: "bg-white text-black hover:bg-white/90"
    }
};

export default function CategoryPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();

    const validCategory = Object.keys(CATEGORY_THEMES);

const category = validCategory.includes(categoryId || "")
  ? (categoryId as keyof typeof CATEGORY_THEMES)
  : "general";
    const theme = CATEGORY_THEMES[category];
    useEffect(() => {
    fetchProducts();
}, [category]);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    const filteredProducts = products.filter(p => p.category === category);

    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* 🔥 Background Layer */}
            <div className="absolute inset-0 -z-10">
                <div className={cn("w-full h-full bg-gradient-to-br", theme.bgGradient)} />
            </div>

            {/* 🔥 Actual Content */}



            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">
                {/* Breadcrumbs & Header */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted font-mono">
                        <button onClick={() => navigate('/')} className="hover:text-neon-cyan transition-colors">Home</button>
                        <ChevronRight className="w-3 h-3" />
                        <span className={theme.accent}>{theme.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-6xl font-display font-bold tracking-tight"
                            >
                                {theme.title}
                            </motion.h1>
                            <p className="text-muted text-lg max-w-2xl">{theme.subtitle}</p>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Filter className="w-4 h-4" /> Filter Neural Logs
                        </button>
                    </div>
                </div>

                {/* Hero Banner for Category */}
                <div className={cn(
                    "glass-card p-12 bg-gradient-to-br border-white/5 relative overflow-hidden min-h-[300px] flex items-center",
                    theme.bgGradient
                )}>
                    <div className="relative z-10 max-w-lg space-y-4">
                        <span className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", theme.accent)}>Sector Clearance Active</span>
                        <h2 className="text-3xl font-bold tracking-tight">Exclusive {category} access granted to Elite Voyagers.</h2>
                        <p className="text-muted text-sm">Synchronize your neural link to view restricted inventory and priority pricing.</p>
                    </div>
                    <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
                        <div className={cn("w-full h-full bg-current", theme.accent)} style={{ maskImage: 'radial-gradient(circle, black, transparent)' }} />
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (

                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-xl">No products found</p>
                    </div>
                ) : (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            onClick={() => navigate(`/product/${product.id}`)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={cn(
                                "glass-card p-0 overflow-hidden group transition-all duration-500",
                                theme.cardHover
                            )}
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                />
                                {product.category && (
                                    <div className="absolute top-4 left-4">
                                        <span className={cn(
                                            "px-2 py-1 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest",
                                            theme.accent
                                        )}>
                                            {product.category}
                                        </span>
                                    </div>
                                )}
                                <button className={cn(
                                    "absolute bottom-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg",
                                    theme.button
                                )}>
                                    <ShoppingBag className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-lg leading-tight group-hover:text-neon-cyan transition-colors">{product.name}</h4>
                                    <div className="flex items-center gap-1 text-neon-yellow">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-xs font-bold">{product.category}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-muted line-clamp-2">{product.description}</p>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="text-xl font-mono font-bold">
                                        <span className={cn("text-sm mr-1", theme.accent)}>A$</span>
                                        <span className="text-main">{product.price}</span>
                                    </div>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">
                                        Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>)}

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 glass-card">
                        <p className="text-muted font-mono uppercase tracking-widest">No neural logs found for this sector</p>
                        <button onClick={() => navigate('/')} className="mt-4 text-neon-cyan text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                            Return to Home Base
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

}
