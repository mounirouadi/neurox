/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008DFF",
        "dark-1": "#4f4f4f",
        "gray-1": "#eeeeee",
        "text-color": "#141414",
      },
    },
  },
  plugins: [],
};
