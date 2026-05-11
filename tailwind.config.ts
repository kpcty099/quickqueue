import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#111827",
        ink: "#e5eefb",
        muted: "#90a3b8",
        line: "rgba(148, 163, 184, 0.2)"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(34, 211, 238, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
