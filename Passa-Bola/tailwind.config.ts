import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'xs': '375px',   // Mobile first
      'sm': '640px',   // Large mobile
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fad5ff',
          300: '#f5b3ff',
          400: '#ed82ff',
          500: '#e052ff',
          600: '#d42fff',
          700: '#b015d4',
          800: '#8e17ab',
          900: '#741888',
          950: '#4e0456',
        },
        // Sports app specific colors
        field: '#22c55e',      // Field green
        win: '#10b981',        // Win indicator
        loss: '#ef4444',       // Loss indicator
        draw: '#6b7280',       // Draw indicator
        live: '#dc2626',       // Live match indicator
        
        // Neutral colors optimized for mobile
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6', 
          150: '#ebedef',       // Custom shade for cards
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#161b22',       // Dark mode background
          900: '#111827',
          950: '#030712',
        },
        
        // Status colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        
        // Team colors for common teams
        teams: {
          corinthians: '#000000',
          palmeiras: '#006b3f',
          santos: '#ffffff',
          saoPaulo: '#e60026',
        },
        
        // Legacy colors (maintaining compatibility)
        'purple-800': '#4B0082',
        'pink-600': '#FF1493', 
        'gold-accent': '#FFD700',
        'dark-text': '#1A202C',
        'medium-gray': '#718096',
        'light-bg': '#F7FAFC',
        'white': '#FFFFFF',
      },
      fontFamily: {
        heading: ['Inter', 'Poppins', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'field-pattern': 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;