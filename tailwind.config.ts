import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        museum: {
          dark: "#0d0d0d",
          surface: "#111111",
          border: "#1a1815",
          line: "#2a2a2a",
          muted: "#4a4540",
          soft: "#5a5247",
          warm: "#7a6e5f",
          cream: "#d4cdc3",
          light: "#f0ece4",
          gold: "#c9a96e",
          "gold-hover": "#e0c08a",
          "gold-dim": "#7a6a52",
          error: "#c9695a",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
      animation: {
        blink: "blink 1.2s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
