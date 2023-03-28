/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        varxen: {
          100: '#5A50FF',
          200: '#8000FF',
          300: '#1F1C59',
          400: '#423BBF'
        }
      }
    },
  },
  plugins: [require("daisyui")],
}