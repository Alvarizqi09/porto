/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // Default for smaller screens
        sm: "2rem", // Increased padding for larger screens
        lg: "4rem",
      },
    },
    screens: {
      sm: "480px", // Adjusted for smaller devices
      md: "768px",
      lg: "1024px", // Larger screens
      xl: "1280px",
    },
    fontFamily: { primary: "var(--font-jetbrainsMono)" },
    extend: {
      colors: {
        primary: "#F8EDE3",
        accent: {
          DEFAULT: "#C5705D",
          hover: "#D0B8A8",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
};
