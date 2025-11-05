/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'noir-bg': '#1a1a1a',
        'noir-text': '#e0e0e0',
        'noir-accent': '#00ffff', // Electric Blue
        'noir-border': '#333333',
      },
    },
  },
  plugins: [],
}
