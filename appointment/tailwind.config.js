/** @type {import('tailwindcss').Config}*/

module.exports = {

    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your file types
  ],

  theme: {

    extend: {

        fontFamily: {

            poppins: ['var(--font-poppins)', 'sans-serif']
        },
    },
  },

  plugins: []
}