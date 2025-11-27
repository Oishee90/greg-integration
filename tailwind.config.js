/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          600: "#DF951F",
          700: "#C67D0F",
        },
      },
    },
  },
  plugins: [],
};
