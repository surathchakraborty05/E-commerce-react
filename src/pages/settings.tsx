import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft,
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  Globe, 
  CreditCard, 
  UserX, 
  ChevronRight,
  Mail,
  Smartphone,
  MessageSquare,
  Lock,
  Eye,
  Languages,
  DollarSign
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SettingsProps {
  onBack: () => void;
}

export default function Settings({ onBack }: SettingsProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [activeSection, setActiveSection] = useState('general');

  const generalRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    activitySharing: true,
    dataUsage: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    biometric: true
  });

  const [language, setLanguage] = useState('English (US)');
  const [currency, setCurrency] = useState('Aetheris Credits (A$)');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      general: generalRef,
      notifications: notificationsRef,
      security: securityRef,
      payments: paymentsRef
    };
    
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const Toggle = ({ active, onToggle, label, description, icon: Icon }: { 
    active: boolean, 
    onToggle: () => void, 
    label: string, 
    description?: string,
    icon?: any
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div>
          <div className="text-sm font-medium">{label}</div>
          {description && <div className="text-xs text-muted mt-0.5">{description}</div>}
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "w-12 h-6 rounded-full transition-all relative",
          active ? "bg-neon-cyan" : "bg-white/10"
        )}
      >
        <motion.div 
          animate={{ x: active ? 26 : 2 }}
          className={cn(
            "w-5 h-5 rounded-full absolute top-0.5 shadow-sm",
            active ? "bg-black" : "bg-white/60"
          )}
        />
      </button>
    </div>
  );

  const Section = ({ title, children, sectionRef }: { title: string, children: React.ReactNode, sectionRef: React.RefObject<HTMLDivElement> }) => (
    <div className="space-y-2 scroll-mt-24" ref={sectionRef}>
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/90 font-mono ml-1 mb-4">{title}</h3>
      <div className="glass-card p-6 divide-y divide-white/5">
        {children}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8 pb-12"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-neon-cyan/50 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-white/90" />
        </button>
        <div>
          <h2 className="text-3xl text-white/90 font-display font-bold tracking-tight">Neural Settings</h2>
          <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-mono">Configure your Aetheris experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Navigation Shortcuts */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-4 space-y-1 sticky top-24">
            <button 
              onClick={() => scrollToSection('general')}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                activeSection === 'general' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "hover:bg-white/5 text-muted hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">General</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('notifications')}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                activeSection === 'notifications' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "hover:bg-white/5 text-muted hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('security')}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                activeSection === 'security' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "hover:bg-white/5 text-muted hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Security</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollToSection('payments')}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                activeSection === 'payments' ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20" : "hover:bg-white/5 text-muted hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-medium">Payments</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-neon-magenta/10 to-transparent border-neon-magenta/20">
            <div className="w-12 h-12 rounded-2xl bg-neon-magenta/20 flex items-center justify-center text-neon-magenta mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="font-bold mb-1">Aetheris Mobile</h4>
            <p className="text-xs text-muted mb-4">Sync your neural link with our mobile terminal for on-the-go access.</p>
            <button className="w-full py-2 rounded-lg bg-neon-magenta text-white text-xs font-bold uppercase tracking-widest hover:neon-glow-magenta transition-all">
              Get Mobile App
            </button>
          </div>
        </div>

        {/* Right Column: Settings Content */}
        <div className="md:col-span-2 space-y-8">
          <Section title="Appearance" sectionRef={generalRef}>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-sm font-medium">Interface Theme</div>
                  <div className="text-xs text-muted mt-0.5">Switch between dark and light modes</div>
                </div>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    theme === 'dark' ? "bg-white text-black shadow-lg" : "text-muted hover:text-white"
                  )}
                >
                  <Moon className="w-3 h-3" /> Dark
                </button>
                <button 
                  onClick={() => setTheme('light')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    theme === 'light' ? "bg-white text-black shadow-lg" : "text-muted hover:text-white"
                  )}
                >
                  <Sun className="w-3 h-3" /> Light
                </button>
              </div>
            </div>
          </Section>

          <Section title="Notifications" sectionRef={notificationsRef}>
            <Toggle 
              active={notifications.email} 
              onToggle={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
              label="Email Notifications"
              description="Receive order updates and neural logs via mail"
              icon={Mail}
            />
            <Toggle 
              active={notifications.push} 
              onToggle={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
              label="Push Notifications"
              description="Real-time alerts on your current terminal"
              icon={Bell}
            />
            <Toggle 
              active={notifications.sms} 
              onToggle={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
              label="SMS Alerts"
              description="Critical security alerts via comms frequency"
              icon={MessageSquare}
            />
          </Section>

          <Section title="Privacy & Security" sectionRef={securityRef}>
            <Toggle 
              active={security.twoFactor} 
              onToggle={() => setSecurity(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your neural link"
              icon={Shield}
            />
            <Toggle 
              active={privacy.publicProfile} 
              onToggle={() => setPrivacy(prev => ({ ...prev, publicProfile: !prev.publicProfile }))}
              label="Public Profile"
              description="Allow other users to see your rank and achievements"
              icon={Eye}
            />
          </Section>

          <Section title="Localization" sectionRef={paymentsRef}>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Language</div>
                  <div className="text-xs text-muted mt-0.5">Select your preferred neural language</div>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-neon-cyan/50"
              >
                <option>English (US)</option>
                <option>Japanese (JP)</option>
                <option>Neo-Sanskrit</option>
                <option>Binary Code</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">Currency</div>
                  <div className="text-xs text-muted mt-0.5">Preferred currency for transactions</div>
                </div>
              </div>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-neon-cyan/50"
              >
                <option>Aetheris Credits (A$)</option>
                <option>Bitcoin (BTC)</option>
                <option>Ethereum (ETH)</option>
                <option>Solana (SOL)</option>
              </select>
            </div>
          </Section>

          <div className="pt-8 space-y-4">
            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-main font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white/90">
              Download All Neural Data
            </button>
            <button className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
              <UserX className="w-4 h-4" /> Terminate Neural Link (Delete Account)
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
