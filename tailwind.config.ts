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
        oman: {
          red: "#a3131d",
          green: "#0f8b4c",
          cream: "#f5efe7",
          slate: "#1f2933",
        },
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
      borderRadius: {
        xl: "1.5rem",
      },
      boxShadow: {
        soft: "0 15px 40px rgba(15, 139, 76, 0.12)",
        subtle: "0 8px 24px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(135deg, rgba(163,19,29,0.08), rgba(15,139,76,0.08))",
      },
    },
  },
  plugins: [],
};

export default config;
