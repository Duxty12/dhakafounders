import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E73BE",
          navy: "#111827",
          "soft-blue": "#EFF6FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "var(--font-inter)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-plus-jakarta)", "ui-sans-serif", "system-ui"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        brand: "0 4px 24px rgba(30, 115, 190, 0.2)",
        "brand-lg": "0 8px 40px rgba(30, 115, 190, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
