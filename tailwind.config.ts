import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      colors: {
        background: {
          light: "#f9fafb",
          dark: "#050816"
        },
        foreground: {
          light: "#0f172a",
          dark: "#e5e7eb"
        },
        accent: {
          DEFAULT: "#6366f1"
        }
      },
      boxShadow: {
        subtle: "0 18px 45px rgba(15, 23, 42, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;

