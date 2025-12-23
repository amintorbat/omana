import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx,json}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        primary: "rgb(var(--om-green-rgb) / <alpha-value>)",
        accent: "rgb(var(--om-red-rgb) / <alpha-value>)",
        background: "rgb(var(--om-bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--om-surface-rgb) / <alpha-value>)",
        text: "rgb(var(--om-text-rgb) / <alpha-value>)",
        muted: "rgb(var(--om-muted-rgb) / <alpha-value>)",
        border: "rgb(var(--om-border-rgb) / <alpha-value>)",
        oman: {
          red: "rgb(var(--om-red-rgb) / <alpha-value>)",
          green: "rgb(var(--om-green-rgb) / <alpha-value>)",
          bg: "rgb(var(--om-bg-rgb) / <alpha-value>)",
          surface: "rgb(var(--om-surface-rgb) / <alpha-value>)",
          text: "rgb(var(--om-text-rgb) / <alpha-value>)",
          muted: "rgb(var(--om-muted-rgb) / <alpha-value>)",
          border: "rgb(var(--om-border-rgb) / <alpha-value>)",
          slate: "rgb(var(--om-text-rgb) / <alpha-value>)",
          cream: "rgb(var(--om-bg-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 15px 40px rgba(0, 122, 61, 0.12)",
        subtle: "0 8px 24px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(135deg, rgb(var(--om-red-rgb) / 0.08), rgb(var(--om-green-rgb) / 0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
