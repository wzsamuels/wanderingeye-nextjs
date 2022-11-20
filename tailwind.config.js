/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'navBar': '50px'
      },
      colors: {
        'light': '#EAEADA',
        'lightAccent': '#d78839',
        'primary': '#8B0000',
        'darkShade': '#241823',
        'gray': '#56544d',
        'darkGray': '#272522',
      },
      boxShadow: {
        '3xl': '0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)'
      }
    },
  },
  plugins: [],
}
