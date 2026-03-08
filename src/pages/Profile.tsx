import React, { useState,useEffect  } from 'react';
import SignUp from './SignUp.tsx';
import Login from './Login.tsx';
import OrderHistory from './Orderhistory.tsx';
import Cart from './Cart';
import OrderDetails from './OrderDetails';
import ProfileUpdate from './ProfileUpdate';
import SettingsView from './settings';
import { 
  User, 
  Home,
  ShoppingBag, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Shield,  
  Cpu, 
  Globe, 
  ChevronRight,
  Search,
  Wallet,
  Star,
  Mail,
  MapPin,
  Phone,
  Heart,
  ExternalLink,
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const USER_DATA = {
  name: "Surath Chakrabarti",
  id: "USR-0921-X",
  rank: "Elite Voyager",
  avatar: "https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&amp;q=60&amp;w=3000&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljJTIwYm95fGVufDB8fDB8fHww",
  credits: "12,450.00",
  loyaltyPoints: 4200,
  joined: "2024.08.12",
  location: "Tripura,India",
  email: "Surathchakrab@gmail.com",
  phone: "+88 (0) 921-X-442",
  address: "Level 42, Sky-Spire Alpha, Neo-Tokyo",
};

// const RECENT_ORDERS = [
//   { id: "ORD-9921", item: "  Link Interface v4", status: "Delivered", date: "2026.02.20", price: "2,400.00", icon: <Cpu className="w-4 h-4" /> },
//   { id: "ORD-9918", item: "Atmospheric Filter Unit", status: "In Transit", date: "2026.02.25", price: "850.00", icon: <Globe className="w-4 h-4" /> },
//   { id: "ORD-9915", item: "Plasma Torch (Compact)", status: "Processing", date: "2026.02.27", price: "1,200.00", icon: <Zap className="w-4 h-4" /> },
// ];

const WISHLIST_ITEMS = [
  { 
    id: "WSH-001", 
    name: "Quantum Processor X1", 
    price: "15,000.00", 
    rarity: "Legendary", 
    image: "https://picsum.photos/seed/quantum/400/300",
    description: "Next-gen processing unit with zero-latency   sync."
  },
  { 
    id: "WSH-002", 
    name: "Anti-Gravity Boots", 
    price: "4,200.00", 
    rarity: "Rare", 
    image: "https://picsum.photos/seed/boots/400/300",
    description: "Standard issue for high-altitude maintenance crews."
  },
  { 
    id: "WSH-003", 
    name: "Cybernetic Eye Mk.II", 
    price: "8,900.00", 
    rarity: "Epic", 
    image: "https://picsum.photos/seed/eye/400/300",
    description: "Enhanced optical sensors with thermal and night vision."
  },
  { 
    id: "WSH-004", 
    name: "Holographic Projector", 
    price: "1,500.00", 
    rarity: "Common", 
    image: "https://picsum.photos/seed/holo/400/300",
    description: "Portable projector for high-fidelity 3D visualizations."
  }
];


// --- Components ---
interface orders {
  product_id: string;
  date:string;
  product_name: string;
  product_price: number;
  rarity: string;
  description: string;
  product_image: string;
  status:string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
}
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full group",
      active 
        ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" 
         : "text-white/50 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", active && "text-neon-cyan")} />
    <span className="font-medium text-sm tracking-wide">{label}</span>
    {active && (
      <motion.div 
        layoutId="active-pill"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]"
      />
    )}
  </button>
);

const GlassCard = ({ children, className, title }: { children: React.ReactNode, className?: string, title?: string }) => (
  <div className={cn("glass-card p-6 relative overflow-hidden group", className)}>
    {/* Subtle scanline effect */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />
    
    {title && (
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-muted">{title}</h3>
        <div className="w-8 h-[1px] bg-white/10" />
      </div>
    )}
    {children}
  </div>
);
 type ToggleSwitchProps = {
  active: boolean;
  onClick: () => void;
  };
export default function App() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "null") as User | null;
  useEffect(() => {
  const fetchUserData = async () => {

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("profiless")   // apni table name
      .select("*")
      .eq("id", currentUser.id)
      .single();

    if (error) {
      console.log("User fetch error:", error);
      return;
    }

    if (data) {
      setUserData({
        name: data.full_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city
      });
    }
  };

  fetchUserData();
}, []);
  const [orders, setOrders] = useState<orders[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('profile');
  const [walletAction, setWalletAction] = useState<'deposit' | 'transfer' | null>('deposit');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalcart, setTotalcart] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });  
  //   Preferences State
  const goToHome = () => {
    navigate('/'); 
  };
  const goTowish = () => {
    navigate('/Wishlist'); 
  };
  type Preferences = {
  bioSync: boolean;
  autoRefill: boolean;
  holographicMode: boolean;
};
  const [preferences, setPreferences] = useState<Preferences>({
  bioSync: false,
  autoRefill: false,
  holographicMode: false,
});
const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
};
const [hasFetched, setHasFetched] = useState(false);
      useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
  
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", currentUser.id);
  
      if (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        setHasFetched(true);
        return;
      }
  
      if (data) {
        setOrders(data);  
      }
      setTotalOrders(data.length);

    // total spent
    const total = data.reduce((sum, order) => {
      return sum + Number(order.product_price); 
    }, 0);

    setTotalSpent(total);
  
      setLoading(false);
    };
  
    fetchOrders();
  }, []);
  useEffect(() => {
    const fetchcart = async () => {
      if (!currentUser) return;
  
      setLoading(true);
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", currentUser.id);
  
      if (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
        return;
      }
      setTotalcart(data.length);
  
      setLoading(false);
    };
  
    fetchcart();
  }, []);
  useEffect(() => {
  const fetchNotifications = async () => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Notification fetch error:", error);
      return;
    }

    if (data) {
      const formatted = data.map((n) => ({
        id: n.id,
        title: n.heading,
        description: n.description,
        time: new Date(n.created_at).toLocaleString(),
        type: "info"
      }));

      setNotifications(formatted);
    }
  };

  fetchNotifications();
}, []);
  if (!isLoggedIn) {
    if (authView === 'login') {
      return <Login onLogin={() => setIsLoggedIn(true)} onSignUp={() => setAuthView('signup')} />;
    }
    return <SignUp onSignUp={() => setIsLoggedIn(true)} onLogin={() => setAuthView('login')} />;
  }
function calculatePoints() {
  const maxMoney = 50000;
  const maxOrders = 100;

  const points = 10000 * (
    0.7 * (totalSpent / maxMoney) +
    0.3 * (totalOrders / maxOrders)
  );

  return Math.round(points);
}
const percent = (calculatePoints() / 10000) * 100;
const left = 10000 - calculatePoints();
const STATS = [
  { label: "Total Spent", value: totalSpent, icon: <CreditCard className="w-4 h-4" /> },
  { label: "Orders", value: totalOrders, icon: <ShoppingBag className="w-4 h-4" /> },
  { label: "Loyalty", value: calculatePoints(), icon: <Star className="w-4 h-4" /> },
];
// const togglePreference = useCallback((key: keyof Preferences) => {
//   console.log("Toggle fired");
//   setPreferences(prev => ({
//     ...prev,
//     [key]: !prev[key],
//   }));
// }, []);
const togglePreference = (key: keyof Preferences) => {
  console.log("TOGGLE FIRED");

  setPreferences(prev => {
    console.log("Previous:", prev[key]);

    return {
      ...prev,
      [key]: !prev[key],
    };
  });
};
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const dismissNotification = async (id: number) => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Delete error:", error);
    return;
  }

  setNotifications(prev => prev.filter(n => n.id !== id));
};

const clearNotifications = async () => {
  if (!currentUser) return;

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", currentUser.id);

  if (error) {
    console.log("Clear error:", error);
    return;
  }

  setNotifications([]);
};
  const ToggleSwitch = React.memo(({ active, onClick }: ToggleSwitchProps) => {return(
    <div 
      onClick={onClick}
      className={cn(
        "w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300",
        active ? "bg-neon-cyan/20" : "bg-white/10"
      )}
    >
      <motion.div 
        animate={{ x: active ? 20 : 0 }}
        transition={{duration:0.2}}
        className={cn(
          "absolute left-1 top-1 w-3 h-3 rounded-full transition-shadow duration-300",
          active ? "bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]" : "bg-white/40"
        )}
      />
    </div>
  );
}
);

  return (
    <div className="flex min-h-screen bg-deep-space selection:bg-neon-cyan selection:text-black font-sans relative overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
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
                <h2 className="text-white/90 font-display font-bold text-xl tracking-tight">  Alerts</h2>
              </div>
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    key={notification.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
                  >
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-1",
                      notification.type === 'success' ? "bg-emerald-500" : 
                      notification.type === 'warning' ? "bg-amber-500" : "bg-neon-cyan"
                    )} />
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm text-white/90 pr-6">{notification.title}</h4>
                      <button 
                        onClick={() => dismissNotification(notification.id)}
                        className="absolute top-3 right-3 p-1 rounded-md text-white/20 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-white/50 leading-relaxed max-w-[80%]">{notification.description}</p>
                      <span className="text-[10px] font-mono text-white/30 uppercase whitespace-nowrap">{notification.time}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                    <Bell className="w-8 h-8 text-white/10" />
                  </div>
                  <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No new alerts</p>
                </div>
              )}
            </div>

            <button 
              onClick={clearNotifications}
              disabled={notifications.length === 0}
              className="text-white/90 mt-auto w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Clear All Logs
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 border-r border-white/5 p-6 flex flex-col gap-8 bg-deep-space/80 backdrop-blur-xl transition-all duration-300","light:bg-white/80",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:p-0 lg:opacity-0 lg:pointer-events-none"
      )}>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center neon-glow-cyan">
              <img 
                          src="https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&amp;q=60&amp;w=3000&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljJTIwYm95fGVufDB8fDB8fHww" 
                          alt="Logo" 
                          className="w-6 h-6 object-contain"
                        />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter italic">LUx STORe</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem icon={Home} label="Home"  onClick={goToHome} />
          <SidebarItem icon={User} label="Profile Overview" active={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={Heart} label="Wishlist" active={activeTab === 'wishlist'} onClick={goTowish} />
          <SidebarItem icon={ShoppingBag} label="Order History" active={activeTab === 'orders'} onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }} />
          <SidebarItem icon={Bell} label="Notifications" active={isNotificationsOpen} onClick={() => { setIsNotificationsOpen(true); setIsSidebarOpen(false); }} />
          <SidebarItem icon={Settings} label="  Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
        </nav>

        <div className="mt-auto">
          <SidebarItem icon={LogOut}  label="Disconnect" onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-12 w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={cn(
                "p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all",
                isSidebarOpen && "opacity-0 pointer-events-none w-0 p-0 border-0"
              )}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-1 text-white/90">
                Welcome back, <span className="holographic-text">{currentUser?.full_name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/90 text-[10px] md:text-sm font-mono uppercase tracking-widest">Status: {USER_DATA.rank} // {USER_DATA.id}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim group-focus-within:text-neon-cyan transition-colors text-white/90" />
              <input 
                type="text" 
                placeholder="Search inventory..." 
                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all w-64"
              />
            </div>
            <button 
              onClick={() => setActiveTab('cart')}
              className={cn(
                "w-10 h-10 rounded-full bg-dim border border-white/10 flex items-center justify-center hover:bg-dim transition-colors relative",
                activeTab === 'cart' && "border-neon-cyan text-neon-cyan bg-neon-cyan/5"
              )}
            >
              <ShoppingCart className="w-5 h-5 text-white/90" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,243,255,0.8)]">{totalcart}</span>
            </button>
            <button  onClick={() => setIsNotificationsOpen(true)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-white/60" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-magenta rounded-full shadow-[0_0_8px_rgba(255,0,255,0.8)]" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              <motion.div 
                key="profile-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="xl:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-6"
              >
                {/* Left Column: Profile Card & Stats */}
                <div className="xl:col-span-1 flex flex-col gap-6">
                  <GlassCard className="flex flex-col items-center text-center pt-12">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-magenta blur-md opacity-50 animate-pulse" />
                      <img 
                        src={USER_DATA.avatar} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-2 border-white/20 relative z-10 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-deep-space border border-neon-cyan p-1.5 rounded-full z-20">
                        <Shield className="w-4 h-4 text-neon-cyan" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-display font-bold mb-1">{userData.name}</h2>
                    <p className="text text-sm mb-6 flex items-center gap-2">
                      <Globe className="w-3 h-3" /> {userData.city}
                    </p>

                    <div className="w-full grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                      {STATS.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="text-muted mb-1">{stat.icon}</div>
                          <span className="text-lg font-mono font-bold text-muted">{stat.value}</span>
                          <span className="text-[10px] uppercase tracking-tighter text-main">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard title="Digital Wallet">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted text-xs uppercase tracking-widest font-mono">Available Credits</span>
                      <div className="flex items-center gap-1 text-neon-cyan">
                        <img 
                          src="https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&amp;q=60&amp;w=3000&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljJTIwYm95fGVufDB8fDB8fHww" 
                          alt="Logo" 
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-xs font-bold">Active</span>
                      </div>
                    </div>
                    <div className="text-3xl font-mono font-bold mb-6">
                      <span className="text-neon-cyan">Rs</span> <span className="text-main">{USER_DATA.credits}</span> 
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setWalletAction('deposit')}
                        className={cn(
                          "flex-1 font-bold py-2 rounded-lg text-sm transition-all duration-300",
                          walletAction === 'deposit' 
                            ? "bg-white text-black" 
                            : "border border-white/10 text-white hover:bg-white/5"
                        )}
                      >
                        Deposit
                      </button>
                      <button 
                        onClick={() => setWalletAction('transfer')}
                        className={cn(
                          "flex-1 font-bold py-2 rounded-lg text-sm transition-all duration-300",
                          walletAction === 'transfer' 
                            ? "bg-white text-black" 
                            : "border border-white/10 text-white hover:bg-white/5"
                        )}
                      >
                        Transfer
                      </button>
                    </div>
                  </GlassCard>

                  <GlassCard title="Identity Matrix">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <User className="w-5 h-5 text-neon-cyan mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-main mb-0.5">Full Name</div>
                          <div className="text-sm text-main">{userData.name}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Mail className="w-5 h-5 text-neon-cyan mt-0.5 " />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-main mb-0.5">  Mail</div>
                          <div className="text-sm text-main">{userData.email}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Phone className="w-5 h-5 text-neon-cyan mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-main mb-0.5">Phone Number</div>
                          <div className="text-sm font-medium">{userData.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5">
                        <MapPin className="w-5 h-5 text-neon-cyan mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-main mb-0.5">Physical Coordinates</div>
                          <div className="text-sm font-medium">{userData.address}</div>
                        </div>
                      </div>
                       <button 
                        onClick={() => setActiveTab('profile-update')}
                        className="w-full mt-2 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 hover:border-neon-cyan/30 transition-all"
                      >
                        Modify Identity Matrix
                      </button>
                    </div>
                  </GlassCard>
                </div>

                {/* Right Column: Orders & Preferences */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                  <GlassCard title="Recent Transactions">
                    <div className="space-y-4">
                      {loading ? (
  <div className="text-center py-10 text-white/40 font-mono uppercase tracking-widest text-xs">
    Loading Recent Orders
  </div>
) : orders.length === 0 ? (
  <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/10 border border-white/5">
                        <Search className="w-6 h-6" />
                      </div>
                      <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No matching   logs found</p>
                    </div>
) : (
  orders.map((order, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={order.product_id}
                          onClick={() => {
                            setSelectedOrder(order);
                            setActiveTab('order-details');
                          }} 
                          className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-neon-cyan/30 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-4">
                            <img src={order.product_image} alt={order.product_name} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60 group-hover:text-neon-cyan transition-colors"/>

                            
                            <div>
                              <h4 className="font-medium text-sm">{order.product_name}</h4>
                              <p className="text-xs text-nuted font-mono">{order.product_id} • {order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono font-bold mb-1">Rs {order.product_price}</div>
                            <div className={cn(
                              "text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full inline-block",
                              order.status === 'Delivered' ? "bg-emerald-500/10 text-emerald-400" : 
                              order.status === 'In Transit' ? "bg-neon-cyan/10 text-neon-cyan" : 
                              "bg-neon-magenta/10 text-neon-magenta"
                            )}>
                              {order.status}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                    </div>
                    <button onClick={() => setActiveTab('orders')} className="w-full mt-6 py-3 text-xs uppercase tracking-[0.2em] font-bold text-muted hover:text-neon-cyan transition-colors flex items-center justify-center gap-2">
                      View All History <ChevronRight className="w-4 h-4" />
                    </button>
                  </GlassCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassCard title="  Preferences">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted">Bio-Sync Authentication</span>
                          <ToggleSwitch 
                            active={preferences.bioSync} 
                            onClick={() => togglePreference('bioSync')} 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted">Auto-Refill Credits</span>
                          <ToggleSwitch 
                            active={preferences.autoRefill} 
                            onClick={() => togglePreference('autoRefill')} 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted">Holographic UI Mode</span>
                          <ToggleSwitch 
                            active={preferences.holographicMode} 
                            onClick={() => togglePreference('holographicMode')} 
                          />
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard title="Loyalty Program">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-neon-magenta/10 flex items-center justify-center text-neon-magenta">
                          <Star className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                          <div className="text-xs text-muted uppercase tracking-widest">Current Points</div>
                          <div className="text-xl font-mono font-bold"> {calculatePoints()} <span className="text-xs text-muted font-normal">/10,000 pts</span></div>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                        <div className="h-full  bg-gradient-to-r from-blue-500 to-pink-500" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted font-mono">
                        <span>  {left}/ 10,000 to next rank</span>
                        <span className="text-neon-magenta">PROPHET RANK</span>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'wishlist' ? (
              <motion.div 
                key="wishlist-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {WISHLIST_ITEMS.map((item) => (
                  <div key={item.id}>
                    <GlassCard className="flex flex-col p-0 overflow-hidden group/item h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-60" />
                        <div className="absolute top-3 right-3">
                          <button className="w-8 h-8 rounded-full bg-deep-space/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all">
                            <Heart className="w-4 h-4 fill-current" />
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
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-display font-bold text-lg leading-tight">{item.name}</h4>
                          <span className="text-neon-cyan font-mono font-bold text-sm">Rs {item.price}</span>
                        </div>
                        <p className="text-white/50 text-xs mb-6 line-clamp-2 flex-1">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mt-auto">
                          <button className="flex-1 bg-white/5 border border-white/10 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <ExternalLink className="w-3 h-3" /> Details
                          </button>
                          <button className="flex-1 bg-neon-cyan text-black py-2 rounded-lg text-xs font-bold hover:neon-glow-cyan transition-all flex items-center justify-center gap-2">
                            <ShoppingBag className="w-3 h-3" /> Buy Now
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </motion.div>
            ) : activeTab === 'orders' ? (
              <div className="xl:col-span-3">
                <OrderHistory onOrderClick={(order) => {
                  setSelectedOrder(order);
                  setActiveTab('order-details');
                }} />
              </div>
            ) : activeTab === 'order-details' ? (
              <div className="xl:col-span-3">
                <OrderDetails 
                  order={selectedOrder} 
                  onBack={() => setActiveTab('orders')} 
                />
              </div>
            ) : activeTab === 'cart' ? (
              <div className="xl:col-span-3">
                <Cart />
              </div>
            ) : activeTab === 'profile-update' ? (
              <div className="xl:col-span-3">
                <ProfileUpdate 
                  userData={userData}
                  onBack={() => setActiveTab('profile')}
                  onSave={(newData) => {
                    setUserData(newData);
                    setActiveTab('profile');
                    // Add a notification
                    setNotifications(prev => [
                      { 
                        id: Date.now(), 
                        title: 'Identity Updated', 
                        description: 'Your   signature has been successfully modified.', 
                        time: 'Just now', 
                        type: 'success' 
                      },
                      ...prev
                    ]);
                  }}
                />
              </div>
                          ) : activeTab === 'settings' ? (
              <div className="xl:col-span-3">
                <SettingsView onBack={() => setActiveTab('profile')} />
              </div>
              ):(
              <motion.div 
                key="other-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="xl:col-span-3 flex items-center justify-center h-96"
              >
                <div className="text-center">
                  <Cpu className="w-12 h-12 text-white/10 mx-auto mb-4 animate-pulse" />
                  <p className="text-white/30 font-mono uppercase tracking-widest">  Link Synchronizing...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
