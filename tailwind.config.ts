import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
      },
      animation: {
        pingLarge: "pingLarge 1s ease-in-out infinite",
        moveLeft: "moveLeft 10s linear infinite",
        moveRight: "moveRight 10s linear infinite",
        pingSmall: "pingSmall 1s ease-in-out infinite",
      },
      keyframes: {
        pingLarge: {
          "75%, 100%": {
            transform: "scale(3)",
            opacity: "0",
          },
        },
        pingSmall: {
          '0%':   { transform: 'scale(1)',   opacity: '1' },
          '75%':  { transform: 'scale(1.3)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        moveLeft: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        moveRight: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
