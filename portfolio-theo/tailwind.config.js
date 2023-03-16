module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            alka: ['Alkami', 'serif'],
            nikea: ['NIKEA', 'sans-serif'],
            fira: ['Fira Sans', 'sans-serif'],
            Inter: ['Inter', 'sans-serif'],
          },
        },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }