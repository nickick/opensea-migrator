const config = require('./config.json')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        currentStepColor: config.styles.currentStepColor,
        previousStepColor: config.styles.previousStepColor,
        futureStepColor: config.styles.futureStepColor
      }
    },
  },
  plugins: [],
};
