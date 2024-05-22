/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "purple": '#635FC7',
      "light-purple" : '#A8A4FF',
      "black" : '#000112',
      "dark-bg" : '#20212C',
      "light-bg" : '#F4F7FD',
      "dark-grey" : '#2B2C37',
      "dark-lines" : '#3E3F4E',
      "light-lines" : '#E4EBFA',
      "red" : '#EA5555',
      "light-red" : '#FF9898' 
    },
  },
  plugins: [],
};
