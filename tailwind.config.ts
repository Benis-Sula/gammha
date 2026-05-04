import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B6B4E",
          light: "#2D9468",
          dark: "#144D38",
        },
        accent: {
          DEFAULT: "#E07847",
          dark: "#C25F30",
        },
        surface: {
          DEFAULT: "#FAFAF8",
          alt: "#F0F7F3",
        },
        border: {
          DEFAULT: "#D2E8DC",
        },
        text: {
          DEFAULT: "#1A2E24",
          muted: "#4A6558",
        },
      },
      fontFamily: {
        heading: ["Lexend", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
        sans: ["Source Sans 3", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.15" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "6rem",
      },
      maxWidth: {
        container: "72rem",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        "card-hover":
          "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08)",
        elevated:
          "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
