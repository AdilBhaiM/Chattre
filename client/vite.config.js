import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // content: ["./src/index.js", "./src/**/*.{js,jsx,tsx}"],
  content: ["*"],
  theme:{
    fontFamily: {
      "quickSand": ['poppins', 'sans-serif'],
    },
    colors:{
      primary: '#f1f1f1'
    }
  },
  plugins: [react(), tailwindcss()],
});
