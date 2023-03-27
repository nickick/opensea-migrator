const config = require('./config.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: config.styles.textColor,
        currentStepColor: config.styles.currentStepColor,
        previousStepColor: config.styles.previousStepColor,
        futureStepColor: config.styles.futureStepColor,
        ctaButtonColor: config.styles.ctaButtonColor,
        borderColor: config.styles.borderColor,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
