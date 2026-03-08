import  { useState, useMemo,useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  Cpu, 
  Globe, 
  Zap,
  Search,
  Filter,
  Download,
  ExternalLink,
  Shield,
  X,
  Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ALL_ORDERS = [
  { id: "ORD-9921", item: "Neural Link Interface v4", status: "Delivered", date: "2026.02.20", price: "2,400.00", icon: <Cpu className="w-5 h-5" />, category: "Hardware" },
  { id: "ORD-9918", item: "Atmospheric Filter Unit", status: "In Transit", date: "2026.02.25", price: "850.00", icon: <Globe className="w-5 h-5" />, category: "Infrastructure" },
  { id: "ORD-9915", item: "Plasma Torch (Compact)", status: "Processing", date: "2026.02.27", price: "1,200.00", icon: <Zap className="w-5 h-5" />, category: "Tools" },
  { id: "ORD-9882", item: "Cryo-Storage Module", status: "Delivered", date: "2026.01.15", price: "5,600.00", icon: <Shield className="w-5 h-5" />, category: "Storage" },
  { id: "ORD-9875", item: "Nano-Repair Swarm", status: "Cancelled", date: "2026.01.10", price: "3,100.00", icon: <Zap className="w-5 h-5" />, category: "Medical" },
];

interface OrderHistoryProps {
  onOrderClick?: (order: any) => void;
}
interface orders {
  product_id: string;
  date:string;
  product_name: string;
  total_price: number;
  category: string;
  description: string;
  product_image: string;
  status:string;
}

// interface User {
//   id: number;
//   full_name: string;
//   email: string;
// }
export default function OrderHistory({ onOrderClick }: OrderHistoryProps) {
  // const currentUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [orders, setOrders] = useState<orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
useEffect(() => {
    const userFromStorage = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    console.log("Loaded User:", userFromStorage);

    if (userFromStorage) {
      setCurrentUser(userFromStorage);
    }
  }, []);

  // 🔹 2️⃣ FETCH ORDERS EFFECT
  useEffect(() => {
    if (!currentUser?.id) return;

    const fetchOrders = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", currentUser.id);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        console.log("Fetched Orders:", data);
        setOrders(data || []);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [currentUser]);
const filteredOrders = useMemo(() => {
  return orders.filter(order => {
    const matchesSearch =
      order.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || order.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}, [orders, searchQuery, selectedCategory]);
  const categories = useMemo(() => {
    const cats = Array.from(new Set(orders.map(o => o.category)));
    return cats;
  }, [orders]);
//     useEffect(() => {
//         if (!currentUser?.id) return;
// const fetchOrders = async () => {
//   setLoading(true);

//   const user = JSON.parse(localStorage.getItem("currentUser") || "null");
//   console.log("Loaded User:", user);
//   setCurrentUser(user);
//   if (!currentUser) {
//     setLoading(false);
//     return;
//   }
//   const { data, error } = await supabase
//     .from("orders")
//     .select("*")
//     .eq("user_id", currentUser.id);

//   if (error) {
//     console.error("Error fetching orders:", error);
//   } else {
//     console.log("Fetched Orders:", data);
//     setOrders(data || []);
//   }

//   setLoading(false);
// };

//   fetchOrders();
// }, [currentUser]);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
            />
             {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "p-2 rounded-xl border transition-all flex items-center gap-2",
                selectedCategory || isFilterOpen
                  ? "bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan" 
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white"
              )}
            > <Filter className="w-5 h-5" />
            {selectedCategory && <span className="text-[10px] font-bold uppercase tracking-widest">{selectedCategory}</span>}
            </button>

            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 z-10"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-deep-space/90 backdrop-blur-xl border border-white/10 rounded-xl p-2 z-20 shadow-2xl"
                  >
                    <button 
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors",
                        !selectedCategory ? "bg-neon-cyan/10 text-neon-cyan" : "text-white/40 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      All Categories
                      {!selectedCategory && <Check className="w-3 h-3" />}
                    </button>
                    <div className="h-[1px] bg-white/5 my-1" />
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-colors",
                          selectedCategory === cat ? "bg-neon-cyan/10 text-neon-cyan" : "text-white/40 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {cat}
                        {selectedCategory === cat && <Check className="w-3 h-3" />}
          </button>
                              ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all">
          <Download className="w-4 h-4" /> Export Ledger
        </button>
      </div>

      <div className="glass-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-main">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Order ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Item Details</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Date</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Amount</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono">Status</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-main font-mono text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
    <tr>
      <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/10 border border-white/5">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No matching neural logs found</p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory(null);
                        }}
                        className="text-neon-cyan text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
    </tr>
  ) :filteredOrders.length > 0 ? (
                filteredOrders.map((order, i) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={order.product_id} 
                  onClick={() => onOrderClick?.(order)}
                  className="group hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono text-main group-hover:text-neon-cyan transition-colors">{order.product_id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-white/5 border border-white/10">
                        <img
                          src={order.product_image}
                          alt={order.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {order.product_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-main">{order.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-main font-mono">{order.date}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-mono font-bold">Rs. {order.total_price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className={cn(
                      "text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full inline-block font-bold",
                      order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-400" : 
                      order.status === 'In Transit' ? "bg-neon-cyan/10 text-neon-cyan" : 
                      order.status === 'Cancelled' ? "bg-red-500/10 text-red-400" :
                      "bg-neon-magenta/10 text-neon-magenta"
                    )}>
                      {order.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-main hover:text-neon-cyan hover:border-neon-cyan/30 transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/10 border border-white/5">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No matching neural logs found</p>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory(null);
                        }}
                        className="text-neon-cyan text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-white/30 text-[10px] uppercase tracking-widest font-mono pt-4">
        <span>Showing  {filteredOrders.length} of {orders.length} transactions</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded border border-white/5 hover:border-white/20 transition-colors disabled:opacity-30" disabled>Prev</button>
          <button className="px-3 py-1 rounded border border-white/5 hover:border-white/20 transition-colors">Next</button>
        </div>
      </div>
    </motion.div>
  );
}
