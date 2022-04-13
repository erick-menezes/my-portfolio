module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { height: '0px', opacity: 1 },
          '100%': { height: '40px' },
        },
        disappear: {
          '0%': { height: '40px' },
          '100%': { height: '0px', opacity: 0 },
        }
      },
      animation: {
        appear: 'appear 0.2s ease-in-out forwards',
        disappear: 'disappear 0.2s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
