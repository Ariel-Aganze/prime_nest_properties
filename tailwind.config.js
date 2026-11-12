/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f5fa',
          100: '#e1e7f2',
          200: '#c3cfe3',
          300: '#94a7c9',
          400: '#5f78a6',
          500: '#3d5785',
          600: '#2b4370',
          700: '#1f3459',
          800: '#162745',
          900: '#0f1d35',
          950: '#0a1426',
        },
        gold: {
          50: '#fbf8ef',
          100: '#f5edd6',
          200: '#ead9a9',
          300: '#dfc27b',
          400: '#d4ad5a',
          500: '#c69a42',
          600: '#a97e35',
          700: '#88622e',
          800: '#71502b',
          900: '#5f4328',
        },
        charcoal: {
          50: '#f6f6f7',
          100: '#e9eaec',
          200: '#d3d5d9',
          300: '#aeb2b9',
          400: '#828892',
          500: '#646a75',
          600: '#4f545d',
          700: '#41454c',
          800: '#2f3237',
          900: '#1f2125',
          950: '#141518',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 20px 50px -20px rgba(10, 20, 38, 0.30)',
        'luxe-lg': '0 30px 70px -25px rgba(10, 20, 38, 0.45)',
        gold: '0 12px 30px -12px rgba(198, 154, 66, 0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'slow-zoom': 'slow-zoom 20s ease-out both',
      },
    },
  },
  plugins: [],
};
