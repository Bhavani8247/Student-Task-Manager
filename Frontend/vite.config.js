import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",              // ✅ correct and required for Vercel
  server: {
    port: 5173,
  },
});
