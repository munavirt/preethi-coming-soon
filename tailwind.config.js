/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f0f10',
          body: '#1c1b1a',
          muted: '#636261',
          subtle: '#8e8c89',
          border: '#e8e6e3',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'editorial-tight': '0.03em',
        'editorial-sm': '0.12em',
        'editorial': '0.18em',
        'editorial-lg': '0.24em',
        'editorial-xl': '0.30em',
        'wordmark': '0.12em',
      },
    },
  },
  plugins: [],
};
