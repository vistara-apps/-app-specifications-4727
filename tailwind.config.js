/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-light': 'hsl(0, 0%, 100%)',
        'bg-dark': 'hsl(240, 10%, 4%)',
        'surface-light': 'hsl(0, 0%, 98%)',
        'surface-dark': 'hsl(240, 10%, 8%)',
        'primary': 'hsl(43, 96%, 50%)',
        'accent': 'hsl(43, 96%, 60%)',
        'text-light': 'hsl(220, 15%, 25%)',
        'text-dark': 'hsl(220, 15%, 85%)',
        'success': 'hsl(140, 70%, 50%)',
        'warning': 'hsl(30, 90%, 50%)',
        'error': 'hsl(0, 70%, 50%)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(43, 96%, 50%, 0.12)',
        'hover': '0 12px 30px hsla(43, 96%, 50%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}