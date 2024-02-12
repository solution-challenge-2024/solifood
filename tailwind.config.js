/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#0E9F6E",
      },
      fontFamily: {
        sans: ["Product Sans", "sans-serif"],
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [require("flowbite/plugin")],
};
