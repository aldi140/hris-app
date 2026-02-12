import scrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"], // opsional
      },
      keyframes: {
        scaleFade: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        scaleFade: "scaleFade 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
};
