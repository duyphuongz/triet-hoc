import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#202124",
        paper: "#FFF9EF",
        mint: "#B8F2D0",
        coral: "#FF7A6B",
        lemon: "#FFE66D",
        teal: "#2EC4B6",
        grape: "#6B5DD3",
      },
      boxShadow: {
        soft: "0 14px 35px rgba(32, 33, 36, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
