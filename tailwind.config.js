/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0C0919',
        surface: 'rgba(255,255,255,0.04)',
        'surface-2': '#1A1230',
        gold: {
          DEFAULT: '#C9972F',
          light: '#E8C97A',
          dark: '#8B6520',
        },
        paithani: {
          DEFAULT: '#7E2787',
          light: '#B85CC0',
        },
        cream: {
          DEFAULT: '#F5EDD6',
          muted: '#B8A88A',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(126,39,135,0.25) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(201,151,47,0.1) 0%, transparent 50%), linear-gradient(180deg, #0C0919 0%, #100820 100%)',
        'gold-shine': 'linear-gradient(135deg, #C9972F 0%, #E8C97A 50%, #C9972F 100%)',
      },
      animation: {
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        glow: { '0%,100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
      boxShadow: {
        'glass': '0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'gold-glow': '0 0 24px rgba(201,151,47,0.3)',
        'paithani-glow': '0 0 24px rgba(126,39,135,0.3)',
      },
    },
  },
  plugins: [],
}

