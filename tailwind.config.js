/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8E7960',
        secondary: '#D6A461',
        accent: '#C84E3A',
        neutral: '#5A5A5A',
        background: '#FFF8F3',
        lightSand: '#F2ECE4',
      },
    },
  },
  plugins: [
    
    require('daisyui'),

  ],
}