/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Paytone One', 'sans-serif'],
      },
      colors: {
        aura: {
          bg: '#030014',
          card: '#0f0728',
          purple: '#7c3aed',
          violet: '#8b5cf6',
          magenta: '#d946ef',
          cyan: '#06b6d4',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'blob': 'blob 20s infinite',
        'blob-slow': 'blob 25s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
          '50%': { opacity: '.8', boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    }
  },
  plugins: [],
}
