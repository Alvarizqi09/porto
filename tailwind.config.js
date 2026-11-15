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
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      primary: ["var(--font-nunito)", "sans-serif"],
      display: ["var(--font-quicksand)", "sans-serif"],
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
        ghibli: {
          sky: "var(--ghibli-sky)",
          "sky-deep": "var(--ghibli-sky-deep)",
          cloud: "var(--ghibli-cloud)",
          sunset: "var(--ghibli-sunset)",
          forest: "var(--ghibli-forest)",
          earth: "var(--ghibli-earth)",
          petal: "var(--ghibli-petal)",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        nature: "0 4px 20px rgba(61, 79, 61, 0.08), 0 1px 4px rgba(61, 79, 61, 0.05)",
        "nature-lg": "0 8px 30px rgba(61, 79, 61, 0.12), 0 2px 8px rgba(61, 79, 61, 0.08)",
        "nature-xl": "0 12px 40px rgba(61, 79, 61, 0.15), 0 4px 12px rgba(61, 79, 61, 0.1)",
        glow: "0 0 20px rgba(123, 169, 143, 0.3)",
        "glow-accent": "0 0 20px rgba(212, 168, 83, 0.3)",
        "glow-sky": "0 0 20px rgba(184, 212, 227, 0.4)",
        inner: "inset 0 2px 4px rgba(61, 79, 61, 0.06)",
      },
      animation: {
        "ghibli-float": "ghibli-float 6s ease-in-out infinite",
        "ghibli-float-slow": "ghibli-float 8s ease-in-out infinite",
        "ghibli-float-fast": "ghibli-float 4s ease-in-out infinite",
        "ghibli-sway": "ghibli-sway 4s ease-in-out infinite",
        "ghibli-sway-slow": "ghibli-sway 6s ease-in-out infinite",
        "ghibli-firefly": "ghibli-firefly 4s ease-in-out infinite",
        "ghibli-glow": "ghibli-glow 3s ease-in-out infinite",
        "ghibli-leaf": "ghibli-leaf-fall 12s linear infinite",
        "ghibli-mote": "ghibli-mote 8s ease-in-out infinite",
        "cloud-drift": "cloud-drift var(--cloud-speed, 60s) linear infinite",
        "ghibli-rise": "ghibli-rise 0.8s ease-out forwards",
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
