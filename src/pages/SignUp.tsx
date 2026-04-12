import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'


// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

interface SignUpProps {
  onSignUp: () => void;
  onLogin: () => void;
}
interface UserProfile {
  id?: number;      
  full_name: string;
  email: string;
  password_hash: string;
  created_at?: string; 
}

export default function SignUp({ onSignUp }: SignUpProps) {
//   const [setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // const handleProfile = () => {
  //   navigate('/profile');
  //   // setIsOpen(false); 
  // };
// Signup.tsx me handleSubmit
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const { data, error } = await supabase.auth.signUp({
//     email: formData.email,
//     password: formData.password,
//     options: {
//     emailRedirectTo: 'http://localhost:3000/login', 
//   }
//   });

//   if (error) {
//     alert(error.message);
//     return;
//   }

//   // Optional: extra user info insert into profiless table
//   await supabase
//     .from('profiless')
//     .insert([{ full_name: formData.username, email: formData.email }]);

//   alert("Signup successful! Please verify your email if needed.");
// };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data,error } = await supabase
    .from('profiless')
    .insert<UserProfile>([
      {
        full_name: formData.username,
        email: formData.email,
        password_hash: formData.password
      }
    ]);

  if (error) {
    alert(error.message);
    return;
  }
  if (data && (data as UserProfile[]).length > 0) {
    localStorage.setItem("user", JSON.stringify(data[0])); 
  }
  alert("Account created!");
  navigate('/');
};
const handleLogin = () => {
    navigate('/login');
    // setIsOpen(false); 
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
  <img
    src="https://images.unsplash.com/photo-1526116977494-90748acc0cad?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60" />
  <div className="absolute inset-0 bg-white/5" />

  <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-magenta/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
</div>
      

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-10 relative overflow-hidden">
          {/* Subtle scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center neon-glow-cyan mb-4">
              <Zap className="text-black w-10 h-10 fill-current" />
            </div>
            <h1 className="text-3xl font-display font-black tracking-tighter italic mb-2">LUx STORe</h1>
            <p className="text-black/40 text-xs uppercase tracking-[0.3em] font-mono">Initialize Luxstore Link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className=" font-bold text-[10px] uppercase tracking-widest text-black/90 ml-1">Your Name</label>
              <div className="relative group">
                <User className="absolute  left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 group-focus-within:text-neon-cyan transition-colors" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Surath Chakrabarti"
                  className=" font-bold w-full bg-black/5 border border-black/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className=" font-bold text-[10px] uppercase tracking-widest text-black/90 ml-1">EMail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-cyan transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="identity@aetheris.net"
                  className=" font-bold w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
  <label className=" font-bold text-[10px] uppercase tracking-widest text-black/90 ml-1">Password</label>
  <div className="relative group">
    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-magenta transition-colors" />
    
    <input 
      type={showPassword ? "text" : "password"}  // <-- toggleable type
      required
      placeholder="••••••••"
      className=" font-bold w-full bg-black/5 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/20 transition-all"
      value={formData.password}
      onChange={(e) => setFormData({...formData, password: e.target.value})}
    />
    
    {/* Eye button inside input */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-neon-magenta transition-colors"
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  </div>
</div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-black py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-neon-cyan hover:neon-glow-cyan transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
            >
              Initialize Link <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <button 
              onClick={handleLogin}
              className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              Already linked? <span className="text-neon-cyan font-bold">Sync Identity</span>
            </button>
            
            <div className="flex items-center gap-2 text-[10px] text-white/80 uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              End-to-End Neural Encryption Active
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <div className=" font-bold flex items-center gap-2 text-[10px] text-white/100 uppercase tracking-widest">
            <Fingerprint className="w-4 h-4" /> <div className='font-bold flex items-center gap-2 text-[10px] text-black/100 uppercase tracking-widest'>Biometric Ready</div> 
          </div>
          <div  className=" font-bold flex items-center gap-2 text-[10px] text-white/100 uppercase tracking-widest">
            <Zap className="w-4 h-4"  /> Instant Sync
          </div>
        </div>
      </motion.div>
    </div>
  );
}
