import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          plum: "#34213D",
          plumDark: "#24142B",
          plumLight: "#4C3358",
          violet: "#7963A8",
          violetLight: "#9D88C8",
          lavender: "#F2EFF8",
          lavenderSubtle: "#FAF7FC",
          ivory: "#FFFDF9",
          coral: "#E98E83",
          coralLight: "#FBE6E3",
          sage: "#8EA187",
          sageLight: "#E4EBE2",
          text: "#29252F",
          muted: "#6B6475",
        },
      },
      boxShadow: {
        'clay-card': '8px 8px 18px rgba(52, 33, 61, 0.08), -6px -6px 14px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(52, 33, 61, 0.04)',
        'clay-btn': '4px 4px 10px rgba(52, 33, 61, 0.16), -3px -3px 8px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.5), inset -1px -1px 2px rgba(52, 33, 61, 0.08)',
        'clay-btn-hover': '6px 6px 14px rgba(52, 33, 61, 0.22), -4px -4px 10px rgba(255, 255, 255, 0.95), inset 1px 1px 2px rgba(255, 255, 255, 0.6), inset -1px -1px 2px rgba(52, 33, 61, 0.1)',
        'clay-pressed': 'inset 4px 4px 8px rgba(52, 33, 61, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.85)',
        'clay-pill': '4px 4px 8px rgba(52, 33, 61, 0.06), -3px -3px 7px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.8)',
        'glass': '0 8px 32px 0 rgba(52, 33, 61, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(52, 33, 61, 0.14)',
      },
    },
  },
  plugins: [],
};

export default config;
