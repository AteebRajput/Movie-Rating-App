/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto Flex"', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        caveat: ["Caveat", 'serif'],
        akaya: ["Akaya Kanadaka", "system-ui"],
        ptsans: ["PT Sans Narrow", "serif"]
      },

    },
  },
  plugins: [],
}