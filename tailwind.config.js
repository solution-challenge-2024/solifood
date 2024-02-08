/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Product Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
