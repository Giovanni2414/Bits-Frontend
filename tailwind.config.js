/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        varxen: {
          primaryBlack: '#1f1f21',
          primaryPurple: '#574ff6',
          secundaryPurple: '#683cc0',
          secundaryGray: '#8b8d90',
          secundaryWhite: '#e2e2e2',
          complementaryPrimaryPurple: '#FCDE88'
        }
      }
    },
  },
  plugins: [require("daisyui")],
}