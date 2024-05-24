/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {screens: {
      xl: "1130px",
      lg: "940px",
      sm: "768px",},},
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
}

