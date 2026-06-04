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
    fontFamily: {
      primary: ["var(--font-inter)", "sans-serif"],
      display: ["var(--font-inter)", "sans-serif"],
      mono: ["var(--font-jetbrainsMono)", "monospace"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        neobrutal: "3px 3px 0px 0px var(--border)",
        "neobrutal-hover": "5px 5px 0px 0px var(--border)",
        "neobrutal-card": "6px 6px 0px 0px var(--border)",
        "neobrutal-card-hover": "9px 9px 0px 0px var(--border)",
        "neobrutal-accent": "4px 4px 0px 0px var(--accent)",
        "neobrutal-primary": "4px 4px 0px 0px var(--primary)",
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
  plugins: [require("tailwindcss-animate")],
};
