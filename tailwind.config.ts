// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], 
  safelist: [
    "from-neon-cyan",
    "to-neon-magenta",
  ],// or 'purge' in older v2
  theme: {
    extend: {
      colors: {
  'neon-cyan': '#00f3ff',
  'neon-magenta': '#ff00ff',
  'neon-yellow': '#fefe00',
  'deep-space': '#050505',
  'glass': 'rgba(255, 255, 255, 0.05)',
  'glass-border': 'rgba(255, 255, 255, 0.1)',
},
    },
  },
  plugins: [],
};