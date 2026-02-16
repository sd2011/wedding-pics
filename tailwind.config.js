/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          gold: '#D4AF37',
          rose: '#F4A5AE',
          blush: '#FFE5E5',
        },
      },
    },
  },
  plugins: [],
}