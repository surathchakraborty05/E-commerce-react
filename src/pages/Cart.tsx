import  { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2,
  Plus, 
  Minus, 
  ChevronRight, 
  ShieldCheck, 
  Zap,
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// const INITIAL_CART = [
//   { 
//     id: "CRT-001", 
//     name: "Neural Link Interface v4", 
//     price: 2400.00, 
//     quantity: 1, 
//     image: "https://picsum.photos/seed/neural/200/200",
//     category: "Hardware"
//   },
//   { 
//     id: "CRT-002", 
//     name: "Atmospheric Filter Unit", 
//     price: 850.00, 
//     quantity: 2, 
//     image: "https://picsum.photos/seed/filter/200/200",
//     category: "Infrastructure"
//   }
// ];
interface cartitem {
  id: string;
  name: string;
  price: number;
  rarity: string;
  description: string;
  image_url: string;
  category:string;
  quantity:number;
}

interface User {
  id: string;
  full_name: string;
  email: string;
}

export default function Cart() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
  const [cartlistItems, setCartlistItems] = useState<cartitem[]>([]);
  const updateQuantity = async (id: string, delta: number) => {

  const item = cartlistItems.find(i => i.id === id);
  if (!item) return;

  const newQuantity = Math.max(1, item.quantity + delta);

  const { error } = await supabase
    .from("cart")
    .update({ quantity: newQuantity })
    .eq("user_id", currentUser?.id)
    .eq("product_id", id);

  if (error) {
    console.log("Quantity update error:", error);
    return;
  }

  setCartlistItems(prev =>
    prev.map(i =>
      i.id === id ? { ...i, quantity: newQuantity } : i
    )
  );
};

  const removeItem = async (id: string) => {

  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", currentUser?.id)
    .eq("product_id", id);

  if (error) {
    console.log("Delete error:", error);
    return;
  }

  setCartlistItems(prev => prev.filter(item => item.id !== id));
};

  const subtotal = cartlistItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
  const neuralTax = subtotal * 0.08;
  const total = subtotal + neuralTax;
   useEffect(() => {
      const fetchCart = async () => {
        if (!currentUser) return;
  
        const { data, error } = await supabase
          .from('cart')
          .select('*')
          .eq('user_id', currentUser.id);
          console.log('Raw wishlist data from Supabase:', data);
        if (error) {
          console.error('Error fetching wishlist:', error);
          return;
        }
  
        if (data) {
          const formattedData: cartitem[] = data.map((item: any) => ({
            id: item.product_id,            
            name: item.product_name,         
            price: item.product_price, 
            category:item.category,             
            rarity: item.rarity,
            quantity:item.quantity,
            image_url: item.product_image,   
            description: item.description,
          }));
          setCartlistItems(formattedData);
        }
      };
  
      fetchCart();
    }, [currentUser]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Cart Items List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-xl tracking-tight">Neural Cart <span className="text-white/30 text-sm font-mono ml-2">[{cartlistItems.length} items]</span></h3>
          <button className="text-[10px] uppercase tracking-widest text-white/30 hover:text-red-400 transition-colors flex items-center gap-2">
            <Trash2 className="w-3 h-3" /> Clear All
          </button>
        </div>

        <AnimatePresence mode="popLayout">
          {cartlistItems.length > 0 ? (
            cartlistItems.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                key={item.id} 
                className="glass-card p-4 flex items-center gap-6 group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/5 relative">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-space/60 to-transparent" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-lg leading-tight truncate">{item.name}</h4>
                    <span className="text-neon-cyan font-mono font-bold">Rs {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-mono mb-4">{item.category} • {item.id}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-mono font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-12 h-12 text-white/10 mb-4" />
              <p className="text-white/30 font-mono uppercase tracking-widest">Neural Cart is Empty</p>
              <button className="mt-6 text-neon-cyan text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">Return to Inventory</button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          <div className="glass-card p-6 border-neon-cyan/20">
            <h3 className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white/40 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Subtotal</span>
                <span className="font-mono">Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Neural Tax (8%)</span>
                <span className="font-mono">Rs {neuralTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Shipping</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest">Instant Sync</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest text-white/60">Total Amount</span>
                <span className="text-2xl font-mono font-bold text-neon-cyan">Rs {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-neon-cyan hover:neon-glow-cyan transition-all duration-300 flex items-center justify-center gap-2 group">
                Confirm Purchase <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Secure Neural Transaction
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-neon-magenta/5 to-transparent border-neon-magenta/20">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-neon-magenta fill-current" />
              <h4 className="text-sm font-bold uppercase tracking-widest">Aetheris Prime</h4>
            </div>
            <p className="text-xs text-white/40 mb-4 leading-relaxed">
              Upgrade to Prime for zero-tax neural transactions and priority sync.
            </p>
            <button className="text-[10px] font-bold uppercase tracking-widest text-neon-magenta hover:text-white transition-colors flex items-center gap-1">
              Learn More <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
