/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode Backgrounds
        dark: {
          primary: '#0D0D0D',
          secondary: '#1A1A1A',
          card: '#242424',
          elevated: '#2D2D2D',
          border: '#3D3D3D',
        },
        // Gold Accents
        gold: {
          DEFAULT: '#C9A227',
          light: '#E5C76B',
          dark: '#9A7B1D',
          glow: 'rgba(201, 162, 39, 0.3)',
        },
        // Coffee tones
        espresso: '#3D2314',
        crema: '#D4A574',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(201, 162, 39, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(201, 162, 39, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(201, 162, 39, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
