import {useState,useEffect} from 'react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  CreditCard, 
  ShoppingBag, 
  Zap,
  ShieldCheck,
  ChevronRight,
  Tag,
  Smartphone,
  Globe,
  Wallet,
  Coins
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  category: string;
}

// interface OrderSummaryProps {
//   customerName: string;
//   address: string;
//   products: Product[];
//   onBack: () => void;
//   onPlaceOrder: () => void;
// }

export default function OrderSummary (){
  // const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [customerNam, setCustomerName] = useState("");
  const [addres, setAddress] = useState("");
  // const { id } = useParams<{ id: string }>();
  const [paymentMethod, setPaymentMethod] = useState('');
  // const location = useLocation();
  const navigate = useNavigate();
  // const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();
  const [showQR, setShowQR] = useState(false);
  const [upiConfirmed, setUpiConfirmed] = useState(false);

const state = location.state as {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
    category: string;
  }[];
} | null;

const productsToShow = state?.products || [];
if (!state?.products) {
  navigate("/");
  return null;
}
// const productsToShow = product ? [{ ...product, quantity: 1 }] : []; 
useEffect(() => {
  const fetchUser = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("User not found in localStorage");
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setCurrentUser(parsedUser);

    // fetch name and address from database
    const { data, error } = await supabase
      .from("profiless")   
      .select("full_name, address")
      .eq("id", parsedUser.id)
      .single();

    if (error) {
      console.log("Error fetching user:", error);
      return;
    }

    if (data) {
      setCustomerName(data.full_name);
      setAddress(data.address);
    }
  };

  fetchUser();
}, []);
    // Temporary dummy data (later form bana sakte ho)
//     useEffect(() => {
//       console.log("Component Rendered, ID:", id);
//   const storedUser = localStorage.getItem("user"); 

//   if (storedUser) {
//     setCurrentUser(JSON.parse(storedUser));
//   }
//   if (id) {
//     fetchProduct();
//   }
// }, [id]);
  //   const fetchProduct = async () => {
  //     setLoading(true);
  //   try {
  //     console.log("Fetching product with id:", id);
  //     const { data, error } = await supabase
  //       .from('products')
  //       .select('*')
  //       .eq('id', id)
  //       .maybeSingle();
  //     console.log("Fetched product data:", data, "Error:", error);
  //     if (error) throw error;
  //     if (!data) {
  //       navigate('/');
  //       return;
  //     }
  //     setProduct(data);
  //   } catch (error) {
  //     console.error('Error fetching product:', error);
  //     navigate('/');
  //   } finally {
  //     console.log("Hi");
  //   }
  // };
  const placeOrder = async () => {
    console.log("Current User:", currentUser);
    console.log("Products:", productsToShow);
  if (!currentUser || productsToShow.length === 0) {
    console.log("Current User or Product missing");
    return;
  }
  if(!paymentMethod){
    alert("Please Select a payment Method");
    return;
  }
  if (paymentMethod === "upi" && !upiConfirmed) {
  alert("Please confirm UPI payment first");
  return;
}

  try {
   const firstProduct = productsToShow[0];
   const quantity = firstProduct.quantity;
   const totalPrice = Number(firstProduct.price) * quantity;
    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          user_id: currentUser.id,
          product_id: firstProduct.id,
          product_name: firstProduct.name,
          product_image: firstProduct.image_url,
          product_price: Number(firstProduct.price),
          product_quantity: quantity,
          total_price: totalPrice,
          category:firstProduct.category,
          payment_mode:paymentMethod,
          status: "pending", // default pending, change as needed
        },
      ])
      .select(); // select karne se insert ka result milta hai

    if (error) {
      console.log("Place Order Error:", error);
      return;
    }

    console.log("Order Placed Successfully:", data);
    alert("Order placed successfully!");
    const { error: notifError } = await supabase
    .from("notifications")
    .insert([
      {
        user_id: currentUser.id,
        email: currentUser.email,
        heading: "Order Placed",
        description: `Your order for ${firstProduct.name} has been placed successfully`
      }
    ]);

    if (notifError) {
      console.log("Notification Insert Error:", notifError);
    }
  } catch (err) {
    console.log("Place Order Failed:", err);
  }
};
  const subtotal = productsToShow.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountPercentage = 15; // Mock discount
  const discountAmount = subtotal * (discountPercentage / 100);
  const neuralTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + neuralTax;
  // if (loading) {
  // return <div className="text-center mt-20 text-white">Loading product...</div>;
// }
  if (!productsToShow || productsToShow.length === 0) {
  return (
    <div className="text-center mt-20 text-white">
      No products found.
    </div>
  );
}
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-deep-space flex items-center justify-center p-6 lg:p-12 text-white"
    >
    <div className="w-full max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Order Confirmation</h2>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">Finalizing Neural Transaction</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Customer Info */}
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute w-32 h-32 top-30 right-6 bg-neon-cyan/5 blur-3xl rounded-full " />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <User className="w-3 h-3" /> Delivery Identity
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neon-cyan border border-white/5">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Recipient</p>
                  <p className="text-sm font-medium">{customerNam}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neon-cyan border border-white/5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Coordinates</p>
                  <p className="text-sm font-medium leading-relaxed">{addres}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 ">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> Payment Protocol
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'upi', label: 'UPI Interface', icon: Smartphone, desc: 'Instant Neural Transfer' },
                { id: 'netbanking', label: 'Net Banking', icon: Globe, desc: 'Direct Sector Link' },
                { id: 'cod', label: 'Cash on Delivery', icon: Wallet, desc: 'Physical Credit Exchange' },
                { id: 'lux', label: 'Lux Store Credit', icon: Coins, desc: 'Premium Aetheris Balance', special: true },
              ].map((method) => (
                <button
                  key={method.id}
                    onClick={() => {
                    setPaymentMethod(method.id);

                    if (method.id === "upi") {
                      setShowQR(true);
                      setUpiConfirmed(false);
                    } else {
                      setShowQR(false);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group",
                    paymentMethod === method.id 
                      ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.1)]" 
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                    paymentMethod === method.id ? "bg-neon-cyan text-black" : "bg-white/5 text-white/40 group-hover:text-white"
                  )}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-sm font-bold",
                        paymentMethod === method.id ? "text-white" : "text-white/80"
                      )}>{method.label}</span>
                      {method.special && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 uppercase tracking-tighter">Special</span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/30 uppercase tracking-tight font-mono">{method.desc}</p>
                  </div>
                  <div className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    paymentMethod === method.id ? "border-neon-cyan bg-neon-cyan" : "border-white/20"
                  )}>
                    {paymentMethod === method.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          {/* Product Details */}
          <div className="glass-card p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <ShoppingBag className="w-3 h-3" /> Manifest Details
            </h3>
            
            <div className="space-y-4">
                
              {productsToShow.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold truncate">{product.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{product.category} • Qty: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-bold">Rs {(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column: Pricing */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-neon-cyan/20 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-neon-cyan/5 blur-3xl rounded-full -mr-24 -mb-24" />
            
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <CreditCard className="w-3 h-3" /> Transaction Summary
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Gross Subtotal</span>
                <span className="font-mono">Rs {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm items-center">
                <span className="text-white/40 flex items-center gap-2">
                  <Tag className="w-3 h-3 text-neon-magenta" /> Neural Discount
                </span>
                <div className="text-right">
                  <span className="text-neon-magenta font-mono font-bold">-Rs {discountAmount.toFixed(2)}</span>
                  <p className="text-[10px] text-neon-magenta/60 font-mono">({discountPercentage}% applied)</p>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-white/40">Neural Tax (8%)</span>
                <span className="font-mono">Rs {neuralTax.toFixed(2)}</span>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Final Amount</p>
                  <span className="text-3xl font-mono font-bold text-neon-cyan">Rs {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={async () => {await placeOrder() ; navigate("/")}}
                className="w-full bg-neon-cyan text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:neon-glow-cyan transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Place Order <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Encrypted Neural Link Active
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-neon-magenta/5 to-transparent border-neon-magenta/20">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-neon-magenta fill-current" />
              <h4 className="text-sm font-bold uppercase tracking-widest">Loyalty Reward</h4>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              This transaction will grant you <span className="text-neon-magenta font-bold">120 Loyalty Points</span> upon successful sync.
            </p>
          </div>
        </div>
      </div>
      </div>
      {showQR && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl text-center w-80">
      <h3 className="text-black font-bold mb-4">Scan UPI QR</h3>

      <img
        src="/upi-qr.png"
        alt="UPI QR"
        className="w-48 h-48 mx-auto mb-4"
      />

      <button
        onClick={() => {
          setUpiConfirmed(true);
          setShowQR(false);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded w-full mb-2"
      >
        Confirm Payment
      </button>

      <button
        onClick={() => setShowQR(false)}
        className="bg-gray-300 text-black px-4 py-2 rounded w-full"
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </motion.div>
  );
}
