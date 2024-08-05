/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'darkblue' : '#005B96'
      },
      screens: {
        'mm' : '375px',
        'ml' : '425px'
      },
      spacing: {
        '34' : '9.3rem' 
      }
    },
  },
  plugins: [],
}

