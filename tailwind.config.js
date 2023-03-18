/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        varxen: {
          100: '#5A50FF',
          200: '#8000FF'
        }
      }
    },
  },
  plugins: [require("daisyui")],
}