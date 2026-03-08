// import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Calendar, 
  Hash,
  Box,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface OrderDetailsProps {
  order: {
    id: string;
    product_name: string;
    status: string;
    date: string;
    product_price: string;
    category: string;
    product_image?: string;
  };
  onBack: () => void;
}

export default function OrderDetails({ order, onBack }: OrderDetailsProps) {
  // Mock delivery steps
  const steps = [
    { id: 'packaged', label: 'Packaged', icon: Package, status: 'completed', location: 'Sector 7 Logistics Hub' },
    { id: 'transit', label: 'In Transit', icon: Truck, status: order.status === 'Delivered' ? 'completed' : 'active', location: 'Neo-Tokyo Skyway' },
    { id: 'destination', label: 'Destination', icon: MapPin, status: order.status === 'Delivered' ? 'completed' : 'pending', location: 'Sky-Spire Alpha' },
  ];

  const activeStepIndex = steps.findIndex(s => s.status === 'active');
  const progress = order.status === 'Delivered' ? 100 : (activeStepIndex === -1 ? 0 : (activeStepIndex / (steps.length - 1)) * 100 + 15);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Order Details</h2>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">Real-time Neural Tracking Active</p>
        </div>
      </div>

      {/* Order Info Card */}
      <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative group">
            <img 
              src={order.product_image || `https://picsum.photos/seed/${order.id}/400/400`} 
              alt={order.product_name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-2 py-1 rounded bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 text-[10px] font-mono uppercase tracking-widest">
                {order.category}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col justify-between py-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-display font-bold mb-1">{order.product_name}</h3>
              <div className="flex items-center gap-4 text-white/40 font-mono text-xs uppercase tracking-widest">
                <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {order.id}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Est. Delivery
                </p>
                <p className="text-sm font-bold">2026.03.05 // 14:00</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1 flex items-center gap-1">
                  <Box className="w-3 h-3" /> Package Weight
                </p>
                <p className="text-sm font-bold">1.24 kg</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Total Value</p>
              <p className="text-2xl font-mono font-bold text-neon-cyan">Rs {order.product_price}</p>
            </div>
            <div className={cn(
              "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
              order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
              order.status === 'In Transit' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : 
              "bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/20"
            )}>
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Tracking Animation */}
      <div className="glass-card p-8 space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-2">
          <Truck className="w-4 h-4 text-neon-cyan" /> Neural Logistics Tracking
        </h3>

        <div className="relative pt-12 pb-8">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_15px_rgba(0,243,255,0.5)]"
            />
          </div>

          {/* Moving Truck Animation */}
          {order.status !== 'Delivered' && (
            <motion.div 
              initial={{ left: 0 }}
              animate={{ left: `${progress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-neon-cyan/40 blur-xl rounded-full animate-pulse" />
                <div className="bg-deep-space border border-neon-cyan/50 p-2 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.3)] relative">
                  <Truck className="w-6 h-6 text-neon-cyan" />
                  {/* Exhaust particles */}
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex gap-1">
                    {[1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          x: [-10, -30], 
                          opacity: [0.8, 0],
                          scale: [1, 0.5]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.8, 
                          delay: i * 0.2 
                        }}
                        className="w-1 h-1 rounded-full bg-neon-cyan/40"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step Points */}
          <div className="flex justify-between relative">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';
              
              return (
                <div key={step.id} className="flex flex-col items-center gap-4 relative z-20">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
                    isCompleted ? "bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.5)]" :
                    isActive ? "bg-deep-space text-neon-cyan border-neon-cyan animate-pulse" :
                    "bg-deep-space text-white/20 border-white/10"
                  )}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="text-center">
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors duration-500",
                      isCompleted || isActive ? "text-white" : "text-white/20"
                    )}>
                      {step.label}
                    </p>
                    <p className="text-[9px] font-mono text-white/30 uppercase max-w-[80px] leading-tight">
                      {step.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Support Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          Contact Logistics Support <ChevronRight className="w-4 h-4" />
        </button>
        <button className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          Download Neural Invoice <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
