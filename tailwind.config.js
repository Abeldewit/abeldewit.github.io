/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at left top, rgb(6, 182, 212), rgb(49, 46, 129))',
      }
    },
  },
  plugins: [],
}
