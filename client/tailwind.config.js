/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      black: '#fff'
    },
    fontSize: {
      xs: '14px',
      sm: '16px',
      md: '22px',
      lg: '42px',
      xl: '64px'
    },
    borderRadius: {
      sm: '3px'
    },
    fontFamily: {
      roboto: 'Roboto, sans-serif'
    },
    extend: {
      colors: {
        primary: '#ff7d9d',
        accent: '#fff',
        fill: '#161616',
        orange: '#FCB322'
      },
    },
  },
  plugins: [],
}
