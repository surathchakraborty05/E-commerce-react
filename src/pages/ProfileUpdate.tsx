import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Save, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

interface ProfileUpdateProps {
  userData: UserData;
  onBack: () => void;
  onSave: (newData: UserData) => void;
}

interface InputFieldProps {
  label: string;
  icon: any;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}

const InputField = ({ label, icon: Icon, value, onChange, type = "text", placeholder }: InputFieldProps) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-cyan transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all placeholder:text-white/10"
      />
    </div>
  </div>
);

export default function ProfileUpdate({ userData, onBack, onSave }: ProfileUpdateProps) {
  const [formData, setFormData] = useState({...userData});
  const [isSaving, setIsSaving] = useState(false);
  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); 
  setIsSaving(true);

  try {
    // 1. Update frontend state

    // 2. Update Supabase
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser) throw new Error("No user logged in");

    const { data, error } = await supabase
      .from("profiless") 
      .update({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
      })
      .eq("id", currentUser.id)
      .select();

    if (error) throw error;

    onSave(formData);
    alert("Profile successfully updated!");

    // 3. Update localStorage
    localStorage.setItem("user", JSON.stringify(data[0]));

  } catch (err) {
    console.error(err);
    alert("Failed to update profile!");
  } finally {
    setIsSaving(false);
  }
};

  // const InputField = ({ label, icon: Icon, name, type = "text", placeholder }: { label: string, icon: any, name: keyof UserData, type?: string, placeholder?: string }) => (
  //   <div className="space-y-2">
  //     <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono ml-1">{label}</label>
  //     <div className="relative group">
  //       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-cyan transition-colors">
  //         <Icon className="w-4 h-4" />
  //       </div>
  //       <input 
  //         type={type}
  //         value={formData[name]}
  //         onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
  //         placeholder={placeholder}
  //         className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all placeholder:text-white/10"
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Identity Modification</h2>
          <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-mono">Updating Neural Signature</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] rounded-full -mr-32 -mt-32" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <InputField label="Full Name"
                icon={User}
                value={formData.name}
                onChange={(val) => handleChange("name", val)}
                placeholder="Enter your full name" />
            </div>
            
            <InputField label="EMail"
              icon={Mail}
              value={formData.email}
              onChange={(val) => handleChange("email", val)}
              type="email"
              placeholder="email@luxstore.grid" />
            <InputField label="Phone Number"
              icon={Phone}
              value={formData.phone}
              onChange={(val) => handleChange("phone", val)}
              placeholder="+91 XXXXX XXXXX" />
            
            <div className="md:col-span-2">
              <InputField label="Physical Coordinates (Address)"
                icon={MapPin}
                value={formData.address}
                onChange={(val) => handleChange("address", val)}
                placeholder="Your address" />
            </div>
            
            <div className="md:col-span-2">
              <InputField label="Sector / City"
                icon={Globe}
                value={formData.city}
                onChange={(val) => handleChange("city", val)}
                placeholder="Your city" />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-neon-cyan text-black font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:neon-glow-cyan transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSaving ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" /> Synchronizing...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 group-hover:scale-110 transition-transform" /> Save Changes
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="flex-1 bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase tracking-widest mt-4">
            <ShieldCheck className="w-3 h-3" /> Encrypted Identity Sync Active
          </div>
        </div>
      </form>
    </motion.div>
  );
}
