/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hot-red': '#cc0000',
        'hot-darkred': '#aa0000',
        'hot-footer': '#021e35',
        'hot-footer-text': '#7289a0',
        'hot-border': '#e5e5e5',
        'hot-sidebar-gray': '#e5e5e5',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

