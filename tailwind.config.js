/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bearing-element-color': '#00C55E',
        'possible-bearing-element-color' : '#bbf7d0'
      }
    },
  },
  plugins: [],
}
