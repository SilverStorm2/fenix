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
          black: "#0B0F1A",
          gold: "#B6FF3B",
          "gold-dark": "#8AD61F",
          "gold-light": "#E6EEF8",
          success: "#10B981",
          danger: "#EF4444",
          gray: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #B6FF3B 0%, #8AD61F 100%)",
        "black-gradient": "linear-gradient(135deg, #151B2B 0%, #0B0F1A 100%)",
        "fenix-gradient":
          "linear-gradient(135deg, #0B0F1A 0%, #8AD61F 50%, #B6FF3B 100%)",
      },
    },
  },
  plugins: [],
};
