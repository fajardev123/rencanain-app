/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./packages/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        "filson-regular": ["FilsonSoftRegular", "sans-serif"],
        "filson-bold": ["FilsonSoftBold", "sans-serif"],
      },
      colors: {
        primary: "#08944e",
        secondary: "#ffffff",
        border: "#e4e4e7",
      },
    },
  },
  plugins: [],
};
