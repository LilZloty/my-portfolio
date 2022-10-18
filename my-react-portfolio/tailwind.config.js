/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      sans:['Inter','sans-serif'],
      alka:['Alkami','serif'],
      nikea:['Nikea-Regular'],
      fira:['Fira Sans', 'sans-serif'],
      Inter:['Inter', 'sans-serif'],
    },
  },
  },
  plugins: [],
}