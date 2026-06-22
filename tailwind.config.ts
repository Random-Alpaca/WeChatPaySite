import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WeChat green accent paired with deep neutral ink
        brand: {
          50: "#eafaf0",
          100: "#cdf2da",
          200: "#9be6b6",
          300: "#5fd488",
          400: "#2fbf66",
          500: "#07c160", // WeChat green
          600: "#06a854",
          700: "#068a47",
          800: "#0a6c39",
          900: "#0b5530",
        },
        ink: {
          50: "#f6f7f8",
          100: "#eceef1",
          200: "#d6dae0",
          300: "#b1b8c2",
          400: "#838d9c",
          500: "#5f6b7c",
          600: "#4a5462",
          700: "#3b424d",
          800: "#262b33",
          900: "#13161b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(19, 22, 27, 0.12)",
        card: "0 1px 3px rgba(19,22,27,0.06), 0 8px 24px -12px rgba(19,22,27,0.15)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
