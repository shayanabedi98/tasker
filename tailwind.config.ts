import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#0D0D0D",
        bgLight: "#191919",
        text: "#FFFDFF",
        primary: "#2173A3",
        secondary: "#185477"
      }
    },
  },
  plugins: [],
};
export default config;
