/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background-default': '#121212', // near-black background
        'background-charcoal': '#2E2E2E',
        'background-slate': '#3A3F44',
        'text-light': '#E0E0E0',
        'text-lighter': '#F5F5F5',
        'text-muted': '#A0A0A0',
        'accent-default': '#14B8A6', // teal
        'accent-hover': '#0D9488',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
