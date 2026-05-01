/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: 'oklch(98% 0 0)',
        text: 'oklch(18% 0 0)',
        accent: 'oklch(68% 0.21 250)',
      },
    },
  },
  plugins: [],
}
