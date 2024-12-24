/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      stroke: ['current'],
      fill: ['current'],
      fontFamily: {
        'host': ['Host Grotesk', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'icon': 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        'icon-hover':'rgb(38, 57, 77) 0px 20px 30px -10px;'
      },
    },
  },
  plugins: [],
}

