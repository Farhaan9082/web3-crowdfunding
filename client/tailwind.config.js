/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.3rem",
        sm: "2rem",
        md: "3rem",
        lg: "4.5rem",
        xl: "6rem",
      },
    },
    extend: {
      colors: {
        background: "#13131a",
      },
      fontFamily: {
        epilogue: ["var(--font-epilogue)"],
      },
    },
  },
  plugins: [],
};
