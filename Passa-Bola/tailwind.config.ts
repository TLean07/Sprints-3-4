import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-800': '#4B0082',
        'pink-600': '#FF1493',
        'gold-accent': '#FFD700',
        'dark-text': '#1A202C',
        'medium-gray': '#718096',
        'light-bg': '#F7FAFC',
        'white': '#FFFFFF',
        'success': '#48BB78',
        'error': '#E53E3E',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/hero-bg.svg')",
      },
    },
  },
  plugins: [],
};

export default config;