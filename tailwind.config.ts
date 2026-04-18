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
        lavender: { 50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed" },
        blush: { 50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185" },
        cream: "#fdfcfb",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "craft-gradient": "linear-gradient(135deg, #f5f3ff 0%, #e0f2fe 50%, #fff1f2 100%)",
        "hero-gradient": "linear-gradient(135deg, #ede9fe 0%, #bae6fd 40%, #fecdd3 100%)",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(139, 92, 246, 0.08)",
        card: "0 8px 32px rgba(139, 92, 246, 0.12)",
        glow: "0 0 32px rgba(139, 92, 246, 0.2)",
      },
      animation: {
        "float-slow": "floatAnim 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        orbit: "orbit 8s linear infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        floatAnim: { "0%,100%":{ transform:"translateY(0px)" },"50%":{ transform:"translateY(-20px)" } },
        pulseSoft: { "0%,100%":{ opacity:"1" },"50%":{ opacity:"0.7" } },
        orbit: { "0%":{ transform:"rotate(0deg) translateX(40px) rotate(0deg)" },"100%":{ transform:"rotate(360deg) translateX(40px) rotate(-360deg)" } },
        sparkle: { "0%,100%":{ opacity:"0",transform:"scale(0)" },"50%":{ opacity:"1",transform:"scale(1)" } },
        fadeUp: { "0%":{ opacity:"0",transform:"translateY(30px)" },"100%":{ opacity:"1",transform:"translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
