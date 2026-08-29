/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F6F1',
          50: '#FDFCF9',
          100: '#F8F6F1',
          200: '#F1EDE4',
          300: '#E8E2D4',
        },
        charcoal: {
          DEFAULT: '#171514',
          700: '#2A2624',
          500: '#4A4441',
          400: '#6B645F',
          300: '#9A938D',
        },
        crimson: {
          DEFAULT: '#8B1118',
          dark: '#6B0E14',
          deep: '#5A0B10',
          light: '#A71922',
          bright: '#C43340',
        },
        zari: {
          DEFAULT: '#B89A5A',
          light: '#D4B872',
          muted: '#8E7544',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial-sm': '0.18em',
        'editorial': '0.28em',
        'editorial-lg': '0.42em',
        'brand': '0.08em',
      },
    },
  },
  plugins: [],
};
