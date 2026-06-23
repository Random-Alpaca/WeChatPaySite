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
        // Deep forest-green accent paired with deep neutral ink
        brand: {
          50: "#eef6f1",
          100: "#d3e8db",
          200: "#a7d1b8",
          300: "#74b393",
          400: "#3f8e6a",
          500: "#186440", // primary accent
          600: "#135437",
          700: "#0f432c",
          800: "#0c3523",
          900: "#08251a",
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
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
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
