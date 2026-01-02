/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fenix: {
          black: "#0A0A0A",
          gold: "#FFD700",
          "gold-dark": "#DAA520",
          "gold-light": "#FFF4CC",
          success: "#10B981",
          danger: "#EF4444",
          gray: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #FFD700 0%, #DAA520 100%)",
        "black-gradient": "linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 100%)",
        "fenix-gradient":
          "linear-gradient(135deg, #0A0A0A 0%, #DAA520 50%, #FFD700 100%)",
      },
    },
  },
  plugins: [],
};
