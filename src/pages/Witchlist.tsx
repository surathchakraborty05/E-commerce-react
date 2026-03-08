// // src/components/Wishlist.tsx
// import React, {useState,useEffect} from "react";
// import { motion } from "motion/react";
// import { Heart, ExternalLink, ShoppingBag,X } from "lucide-react";
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';
// import { AnimatePresence } from 'motion/react';
// import { supabase } from '../lib/supabase';
// import { 
//   Bell,
//   Search
// } from 'lucide-react';
// const USER_DATA = {
//   name: "Surath Chakrabarti",
//   id: "USR-0921-X",
//   rank: "Elite Voyager",
//   avatar: "https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   credits: "12,450.00",
//   loyaltyPoints: 4200,
//   joined: "2024.08.12",
//   location: "Tripura,India",
//   email: "Surathchakrab@gmail.com",
//   phone: "+88 (0) 921-X-442",
//   address: "Level 42, Sky-Spire Alpha, Neo-Tokyo",
// };
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// const GlassCard = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
//   <div className={cn("glass-card p-6 relative overflow-hidden group", className)}>
//     <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />
    
//     {title && (
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-white/40">{title}</h3>
//         <div className="w-8 h-[1px] bg-white/10" />
//       </div>
//     )}
//     {children}
//   </div>
// );

// interface WishlistItem {
//   id: string;
//   name: string;
//   price: number;
//   rarity: string;
//   description:string;
//   image_url: string;
// }
//  interface user{
//   id:number;
//   full_name:string;
//   email:string;
// }
// // const WISHLIST_ITEMS = [
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-002", 
// //     name: "Anti-Gravity Boots", 
// //     price: "4,200.00", 
// //     rarity: "Rare", 
// //     image: "https://picsum.photos/seed/boots/400/300",
// //     description: "Standard issue for high-altitude maintenance crews."
// //   },
// //   { 
// //     id: "WSH-003", 
// //     name: "Cybernetic Eye Mk.II", 
// //     price: "8,900.00", 
// //     rarity: "Epic", 
// //     image: "https://picsum.photos/seed/eye/400/300",
// //     description: "Enhanced optical sensors with thermal and night vision."
// //   },
// //   { 
// //     id: "WSH-004", 
// //     name: "Holographic Projector", 
// //     price: "1,500.00", 
// //     rarity: "Common", 
// //     image: "https://picsum.photos/seed/holo/400/300",
// //     description: "Portable projector for high-fidelity 3D visualizations."
// //   },
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   }
// // ];
// // const initialWishlist = [
// //   { id: "WSH-001", name: "Quantum Processor X1", price: "15,000.00", rarity: "Legendary", image: "https://picsum.photos/seed/quantum/400/300", description: "Next-gen processing unit with zero-latency neural sync." },
// //   { id: "WSH-002", name: "Anti-Gravity Boots", price: "4,200.00", rarity: "Rare", image: "https://picsum.photos/seed/boots/400/300", description: "Standard issue for high-altitude maintenance crews." },
// //   { id: "WSH-003", name: "Cybernetic Eye Mk.II", price: "8,900.00", rarity: "Epic", image: "https://picsum.photos/seed/eye/400/300", description: "Enhanced optical sensors with thermal and night vision." },
// //   { id: "WSH-004", name: "Holographic Projector", price: "1,500.00", rarity: "Common", image: "https://picsum.photos/seed/holo/400/300", description: "Portable projector for high-fidelity 3D visualizations." },
// // ];
// export default function Wishlist() {
//   // App ya component me
 
//   const currentUser = JSON.parse(localStorage.getItem("user") || "null") as user | null;
//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]); 
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//     const [notifications] = useState([
//       { id: 1, title: 'Neural Sync Complete', description: 'Your profile has been successfully synchronized with the Aetheris grid.', time: '2m ago', type: 'success' },
//       { id: 2, title: 'New Order Dispatched', description: 'Your order #AX-9021 has been dispatched to your neural link.', time: '15m ago', type: 'info' },
//       { id: 3, title: 'Security Alert', description: 'A new login was detected from a different sector.', time: '1h ago', type: 'warning' },
//       { id: 4, title: 'Wallet Refill', description: 'Your digital wallet has been refilled with 500.00 AC.', time: '3h ago', type: 'success' },
//     ]);
// //     const [wishlistItems, setWishlistItems] = useState([
// //    { 
// //     id: "WSH-001", 
// //     name: "Quantum Processor X1", 
// //     price: "15,000.00", 
// //     rarity: "Legendary", 
// //     image: "https://picsum.photos/seed/quantum/400/300",
// //     description: "Next-gen processing unit with zero-latency neural sync."
// //   },
// //   { 
// //     id: "WSH-002", 
// //     name: "Anti-Gravity Boots", 
// //     price: "4,200.00", 
// //     rarity: "Rare", 
// //     image: "https://picsum.photos/seed/boots/400/300",
// //     description: "Standard issue for high-altitude maintenance crews."
// //   },
// //   { 
// //     id: "WSH-003", 
// //     name: "Cybernetic Eye Mk.II", 
// //     price: "8,900.00", 
// //     rarity: "Epic", 
// //     image: "https://picsum.photos/seed/eye/400/300",
// //     description: "Enhanced optical sensors with thermal and night vision."
// //   },
// //   { 
// //     id: "WSH-004", 
// //     name: "Holographic Projector", 
// //     price: "1,500.00", 
// //     rarity: "Common", 
// //     image: "https://picsum.photos/seed/holo/400/300",
// //     description: "Portable projector for high-fidelity 3D visualizations."
// //   },
// // ]
// // );
// //     const toggleWishlistItem = (id: string) => {
// //   setWishlistItems(prev =>
// //     prev.map(item =>
// //       item.id === id ? { ...item, liked: !item.liked } : item
// //     )
// //   );
// // };
// // const toggleFavorite = (id: string) => {
// //     setWishlistItems(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
// //   };
// useEffect(() => {
//   const fetchWishlist = async () => {
//     if (!currentUser) return;

//     const { data, error } = await supabase
//       .from('wishlist')
//       .select('*')
//       .eq('user_id', currentUser.id);

//     if (error) {
//       console.log('Error fetching wishlist:', error);
//       return;
//     }
//     if (data) {
//       const formattedData: WishlistItem[] = data.map((item: any) => ({
//         id: item.id,
//         name: item.name,
//         price: item.price.toString(), // ensure string
//         rarity: item.rarity,
//         image_url:item.image_url, // agar column alag ho
//         description: item.description,
//       }));
//     setWishlistItems(formattedData); // set only items user has wishlisted
//   };

//   fetchWishlist();
// }, []);

//   return (
//     <main className="flex-1 overflow-y-auto p-6 lg:p-12">
//         <header className="flex items-center justify-between mb-12">
//           <AnimatePresence>
//         {isNotificationsOpen && (
//           <motion.aside 
//             initial={{ x: '100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed top-0 right-0 z-50 w-80 md:w-96 h-full bg-deep-space/90 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col gap-6 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Bell className="w-5 h-5 text-neon-cyan" />
//                 <h2 className="font-display font-bold text-xl tracking-tight">Neural Alerts</h2>
//               </div>
//               <button 
//                 onClick={() => setIsNotificationsOpen(false)}
//                 className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
//               {notifications.map((notification) => (
//                 <div 
//                   key={notification.id}
//                   className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
//                 >
//                   <div className={cn(
//                     "absolute left-0 top-0 bottom-0 w-1",
//                     notification.type === 'success' ? "bg-emerald-500" : 
//                     notification.type === 'warning' ? "bg-amber-500" : "bg-neon-cyan"
//                   )} />
//                   <div className="flex justify-between items-start mb-1">
//                     <h4 className="font-semibold text-sm text-white/90">{notification.title}</h4>
//                     <span className="text-[10px] font-mono text-white/30 uppercase">{notification.time}</span>
//                   </div>
//                   <p className="text-xs text-white/50 leading-relaxed">{notification.description}</p>
//                 </div>
//               ))}
//             </div>

//             <button className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all">
//               Clear All Logs
//             </button>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//           <div>
//            <h1 className="text-4xl font-display font-bold tracking-tight mb-1 text-black/70 drop-shadow-md">
//     Welcome back, 
//     <span className="holographic-text leading-tight" style={{
//       textShadow: "0 0 80px rgba(150, 138, 138, 0.7), 0 0 80px rgb(0, 0, 0)"
//     }}>
//       {USER_DATA.name.split(' ')[0]}
//     </span>
//   </h1>
//             <p className="text-black/70 text-sm font-mono uppercase tracking-widest text-black/70">Status: {USER_DATA.rank} // {USER_DATA.id}</p>
//           </div>
          
//           <div className="flex items-center gap-4">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-cyan transition-colors" />
//               <input 
//                 type="text" 
//                 placeholder="Search inventory..." 
//                 className=" bg-black/10 border border-white/30 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all w-64"
//               />
//             </div>
//             <button onClick={() => setIsNotificationsOpen(true)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
//               <Bell className="w-5 h-5 text-white/60" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-neon-magenta rounded-full shadow-[0_0_8px_rgba(255,0,255,0.8)]" />
//             </button>
//           </div>
//         </header>
//     <motion.div
//   key="wishlist-view"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   exit={{ opacity: 0, y: -20 }}
//   className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 
//              min-h-screen p-6 bg-deep-space selection:bg-neon-cyan selection:text-black"
// >
//       {wishlistItems.map((item) => (
//         <div key={item.id}>
//           <GlassCard className="flex flex-col p-4 overflow-hidden group/item h-auto rounded-xl shadow-lg hover:shadow-neon transition-all">
//             <div className="relative h-40 overflow-hidden rounded-t-xl">
//               <img 
//                 src={item.image_url} 
//                 alt={item.name} 
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
//                 referrerPolicy="no-referrer"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-60" />
//               <div className="absolute top-3 right-3">
//                 <button className="w-8 h-8 rounded-full bg-deep-space/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all">
//                   <Heart className="w-4 h-4 fill-current"/>
//                 </button>
//               </div>
//               <div className={cn(
//                 "absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border",
//                 item.rarity === 'Legendary' ? "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30" :
//                 item.rarity === 'Epic' ? "bg-neon-magenta/10 text-neon-magenta border-neon-magenta/30" :
//                 item.rarity === 'Rare' ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" :
//                 "bg-white/10 text-white/60 border-white/20"
//               )}>
//                 {item.rarity}
//               </div>
//             </div>
//             <div className="p-4 flex-1 flex flex-col">
//               <div className="flex justify-between items-start mb-2">
//                 <h4 className="font-display font-bold text-lg leading-tight">{item.name}</h4>
//                 <span className="text-neon-cyan font-mono font-bold text-sm">Rs {item.price}</span>
//               </div>
//               <p className="text-white/50 text-xs mb-6 line-clamp-2 flex-1">
//                 {item.description}
//               </p>
//               <div className="flex gap-2 mt-auto">
//                 <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
//                   <ExternalLink className="w-3 h-3" /> Details
//                 </button>
//                 <button className="flex-1 bg-neon-cyan text-black py-2 rounded-lg text-xs font-bold hover:neon-glow-cyan transition-all flex items-center justify-center gap-2">
//                   <ShoppingBag className="w-3 h-3" /> Buy Now
//                 </button>
//               </div>
//             </div>
//           </GlassCard>
//         </div>
//       ))}
//     </motion.div>
//     </main>
    
//   );
// }
// src/components/Wishlist.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ExternalLink, ShoppingBag, X, Bell, Search } from "lucide-react";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabase';
import { useNavigate } from "react-router-dom";

const USER_DATA = {
  name: "Surath Chakrabarti",
  id: "USR-0921-X",
  rank: "Elite Voyager",
  avatar: "https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  credits: "12,450.00",
  loyaltyPoints: 4200,
  joined: "2024.08.12",
  location: "Tripura,India",
  email: "Surathchakrab@gmail.com",
  phone: "+88 (0) 921-X-442",
  address: "Level 42, Sky-Spire Alpha, Neo-Tokyo",
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const GlassCard = ({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) => (
  <div className={cn("glass-card p-6 relative overflow-hidden group", className)}>
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />
    {title && (
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-white/40">{title}</h3>
        <div className="w-8 h-[1px] bg-white/10" />
      </div>
    )}
    {children}
  </div>
);

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  rarity: string;
  description: string;
  image_url: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
}

export default function Wishlist() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, title: 'Neural Sync Complete', description: 'Your profile has been successfully synchronized with the Aetheris grid.', time: '2m ago', type: 'success' },
    { id: 2, title: 'New Order Dispatched', description: 'Your order #AX-9021 has been dispatched to your neural link.', time: '15m ago', type: 'info' },
    { id: 3, title: 'Security Alert', description: 'A new login was detected from a different sector.', time: '1h ago', type: 'warning' },
    { id: 4, title: 'Wallet Refill', description: 'Your digital wallet has been refilled with 500.00 AC.', time: '3h ago', type: 'success' },
  ]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!currentUser) return;

      const { data, error } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', currentUser.id);
        console.log('Raw wishlist data from Supabase:', data);
      if (error) {
        console.error('Error fetching wishlist:', error);
        return;
      }

      if (data) {
        const formattedData: WishlistItem[] = data.map((item: any) => ({
          id: item.product_id,            
          name: item.product_name,         
          price: item.product_price,              
          rarity: item.rarity,
          image_url: item.product_image,   
          description: item.description,
        }));
        setWishlistItems(formattedData);
      }
    };

    fetchWishlist();
  }, [currentUser]);

  return (
    <main className="flex-1 overflow-y-auto p-6 lg:p-12">
      <header className="flex items-center justify-between mb-12">
        <AnimatePresence>
          {isNotificationsOpen && (
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 w-80 md:w-96 h-full bg-deep-space/90 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col gap-6 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-neon-cyan" />
                  <h2 className="font-display font-bold text-xl tracking-tight">Neural Alerts</h2>
                </div>
                <button onClick={() => setIsNotificationsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
                    <div className={cn("absolute left-0 top-0 bottom-0 w-1",
                      n.type === 'success' ? "bg-emerald-500" :
                      n.type === 'warning' ? "bg-amber-500" : "bg-neon-cyan"
                    )} />
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm text-white/90">{n.title}</h4>
                      <span className="text-[10px] font-mono text-white/30 uppercase">{n.time}</span>
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed">{n.description}</p>
                  </div>
                ))}
              </div>

              <button className="mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all">
                Clear All Logs
              </button>
            </motion.aside>
          )}
        </AnimatePresence>

        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-1 text-black/70 drop-shadow-md">
            Welcome back, <span className="holographic-text">{USER_DATA.name.split(' ')[0]}</span>
          </h1>
          <p className="text-black/70 text-sm font-mono uppercase tracking-widest">Status: {USER_DATA.rank} // {USER_DATA.id}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-cyan transition-colors" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="bg-black/10 border border-white/30 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all w-64"
            />
          </div>
          <button onClick={() => setIsNotificationsOpen(true)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-white/60" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-magenta rounded-full shadow-[0_0_8px_rgba(255,0,255,0.8)]" />
          </button>
        </div>
      </header>

      <motion.div
        key="wishlist-view"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen p-6 bg-deep-space selection:bg-neon-cyan selection:text-black"
      >
        {wishlistItems.map(item => (
          <div key={item.id}>
            <GlassCard className="flex flex-col p-4 overflow-hidden group/item h-auto rounded-xl shadow-lg hover:shadow-neon transition-all">
              <div className="relative h-40 overflow-hidden rounded-t-xl">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 right-3">
                  <button className="w-8 h-8 rounded-full bg-deep-space/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all">
                    <Heart className="w-4 h-4 fill-current"/>
                  </button>
                </div>
                <div className={cn(
                  "absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest border",
                  item.rarity === 'Legendary' ? "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30" :
                  item.rarity === 'Epic' ? "bg-neon-magenta/10 text-neon-magenta border-neon-magenta/30" :
                  item.rarity === 'Rare' ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30" :
                  "bg-white/10 text-white/60 border-white/20"
                )}>
                  {item.rarity}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display font-bold text-lg leading-tight">{item.name}</h4>
                  <span className="text-neon-cyan font-mono font-bold text-sm">Rs {item.price}</span>
                </div>
                <p className="text-white/50 text-xs mb-6 line-clamp-2 flex-1">{item.description}</p>
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => navigate(`/product/${item.id}`)} className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-3 h-3"  /> Details
                  </button>
                  <button onClick={() =>
    navigate("/ordersummary", {
      state: {
        products: [
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image_url: item.image_url,
            category: item.rarity
          }
        ]
      }
    })
  } className="flex-1 bg-neon-cyan text-black py-2 rounded-lg text-xs font-bold hover:neon-glow-cyan transition-all flex items-center justify-center gap-2">
                    <ShoppingBag className="w-3 h-3" /> Buy Now
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
      </motion.div>
    </main>
  );
}