import React, { useState } from 'react';
import { supabase } from '../lib/supabase'
import { motion } from 'motion/react';
import { 
  Zap, 
  Shield, 
  Mail, 
  Lock, 
  ChevronRight,
  Fingerprint,
  Key,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// // Utility for tailwind classes
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }
// const handleLogin = async (e: React.FormEvent) => {
//   e.preventDefault();

//   const { data, error } = await supabase
//     .from('profiless')
//     .select('*')
//     .eq('email', formData.email)
//     .single();

//   if (error || !data) {
//     alert("User not found");
//     return;
//   }

//   if (data.password_hash !== formData.password) {
//     alert("Incorrect password");
//     return;
//   }

//   alert("Login successful!");
//   navigate('/profile');
// };
interface LoginProps {
  onLogin: () => void;
  onSignUp: () => void;
}
export default function Login({ onLogin, onSignUp }: LoginProps) {
   const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  //  const gotohome = () => {
  //   navigate('/');
  // };
  const gotosignup = () => {
    navigate('/SignUp');
  };
//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (formData.email === "test@example.com" && formData.password === "123456") {
//     navigate("/profile");
//     alert("Login success (mock)!");
//     return;
//   }


//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: formData.email,
//     password: formData.password
//   });

//   if (error) {
//     alert("Invalid email or password");
//     return;
//   }

//   console.log("User:", data.user);
//   alert("Login successful!");
//   navigate('/profile');
// };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data, error } = await supabase
    .from('profiless')
    .select('*')
    .eq('email', formData.email)
    .single();

  if (error || !data) {

    await supabase.from("notifications").insert({
      heading: "Login Failed",
      description: "Login attempt failed. User not found.",
      email: formData.email,
      user_id: null
    });

    alert("User not found");
    return;
  }

  if (data.password_hash !== formData.password) {

    await supabase.from("notifications").insert({
      heading: "Login Failed",
      description: "Incorrect password attempt.",
      email: formData.email,
      user_id: data.id
    });

    alert("Incorrect password");
    return;
  }

  localStorage.setItem("user", JSON.stringify(data));

  await supabase.from("notifications").insert({
    heading: "Login Successful",
    description: "User logged in successfully.",
    email: formData.email,
    user_id: data.id
  });

  alert("Login successful!");
  navigate("/profile");
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-magenta/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-magenta to-neon-cyan flex items-center justify-center neon-glow-magenta mb-4">
              <Key className="text-black w-10 h-10 fill-current" />
            </div>
            <h1 className="text-3xl font-display font-bold tracking-tighter italic mb-2">LUx STORe</h1>
            <p className="text-black/70 text-xs uppercase tracking-[0.3em] font-mono">Sync Neural Identity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-black/100 ml-1">Neural Mail</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-cyan transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="identity@aetheris.net"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/100">Access Code</label>
                <button type="button" className="text-[10px] uppercase tracking-widest text-neon-cyan hover:text-white transition-colors">Recover Link</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-neon-magenta transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/20 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
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
              className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-neon-magenta hover:neon-glow-magenta transition-all duration-300 flex items-center justify-center gap-2 group mt-4"
            >
              Sync Identity <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <button 
              onClick={gotosignup}
              className="text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              New identity? <span className="text-neon-magenta font-bold">Initialize Link</span>
            </button>
            
            <div className="flex font-bold items-center gap-2 text-[10px] text-white/80 uppercase tracking-widest">
              <Shield className="w-3 h-3" />
              Neural Encryption Layer Active
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2 text-[10px] text-white/100 uppercase tracking-widest">
            <Fingerprint className="w-4 h-4 text-black/100" /> <p className='text-black/90 font-bold'>Biometric Ready</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/90 uppercase tracking-widest">
            <Zap className="w-4 h-4 " /> Instant Sync
          </div>
        </div>
      </motion.div>
    </div>
  );
}
