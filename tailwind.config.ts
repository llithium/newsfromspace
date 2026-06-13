import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "var(--ink)",
        ink2: "var(--ink2)",
        ink3: "var(--ink3)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        well: "var(--well)",
        line: "var(--line)",
        accent: "var(--accent)",
        accentInk: "var(--accent-ink)",
        accentSoft: "var(--accent-soft)",
        go: "var(--go)",
        warn: "var(--warn)",
      },
      animation: {
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#e8eae8",
            foreground: "#161d28",
            content1: "#f2f3f1",
            primary: { DEFAULT: "#0b7f8d", foreground: "#ffffff" },
            success: { DEFAULT: "#1c7a4d", foreground: "#ffffff" },
            warning: { DEFAULT: "#9a6a17", foreground: "#ffffff" },
            divider: "rgba(22,29,40,0.15)",
          },
        },
        dark: {
          colors: {
            background: "#0d1118",
            foreground: "#e7eae9",
            content1: "#141b25",
            primary: { DEFAULT: "#2fc0d2", foreground: "#06222a" },
            success: { DEFAULT: "#3fcf86", foreground: "#06220f" },
            warning: { DEFAULT: "#d8a23f", foreground: "#241804" },
            divider: "rgba(255,255,255,0.12)",
          },
        },
      },
    }),
  ],
};
export default config;
