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
        parchment: "#F5E9DA",
        cream:     "#FDF6EE",
        terra:     "#C97B63",
        "terra-dk":"#A85E48",
        sand:      "#E8A87C",
        espresso:  "#2C1A0E",
        taupe:     "#8B6F5E",
        warm:      "#EDD9C5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "craft-gradient":  "linear-gradient(135deg, #F5E9DA 0%, #EDD9C5 50%, #F5E9DA 100%)",
        "hero-gradient":   "linear-gradient(135deg, #F5E9DA 0%, #EDD9C5 40%, #FDF6EE 100%)",
      },
      boxShadow: {
        craft: "0 8px 32px rgba(44,26,14,0.1)",
        card:  "0 4px 20px rgba(44,26,14,0.08)",
        glow:  "0 0 32px rgba(201,123,99,0.25)",
      },
      animation: {
        "float-slow":  "floatAnim 6s ease-in-out infinite",
        "spin-slow":   "spin 12s linear infinite",
        "pulse-soft":  "pulseSoft 3s ease-in-out infinite",
        "fade-up":     "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        floatAnim: { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-18px)" } },
        pulseSoft: { "0%,100%":{ opacity:"1" }, "50%":{ opacity:"0.6" } },
        fadeUp:    { "0%":{ opacity:"0",transform:"translateY(30px)" }, "100%":{ opacity:"1",transform:"translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
