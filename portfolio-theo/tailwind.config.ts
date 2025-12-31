import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Lime Neon Accent
        lime: {
          neon: '#A1FB09',
          dark: '#7BC406',
          glow: 'rgba(161, 251, 9, 0.4)',
          subtle: 'rgba(161, 251, 9, 0.1)',
        },
        // Silver Grey Palette
        silver: {
          100: '#F5F5F7',
          200: '#E8E8ED',
          300: '#C4C4CC',
          400: '#8E8E93',
          500: '#636366',
          600: '#48484A',
          700: '#3A3A3C',
          800: '#2C2C2E',
          900: '#1C1C1E',
          950: '#0D0D0F',
        },
        // Legacy compatibility
        gray: {
          brand: '#8E8E93',
          dark: '#1C1C1E',
          darker: '#0D0D0F',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Special Gothic Expanded One', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-lime': 'linear-gradient(135deg, #A1FB09 0%, #7BC406 100%)',
        'gradient-silver': 'linear-gradient(135deg, #3A3A3C 0%, #1C1C1E 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(58, 58, 60, 0.5) 0%, rgba(28, 28, 30, 0.6) 100%)',
      },
      boxShadow: {
        'lime-glow': '0 0 25px rgba(161, 251, 9, 0.35)',
        'lime-glow-lg': '0 0 50px rgba(161, 251, 9, 0.5)',
        'lime-glow-xl': '0 0 80px rgba(161, 251, 9, 0.6)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'inner-light': 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '20px',
        heavy: '40px',
      },
      borderRadius: {
        'glass': '20px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};

export default config;
