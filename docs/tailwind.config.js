import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [heroui()],
};
