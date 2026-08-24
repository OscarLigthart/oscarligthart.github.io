import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed at the root of oscarligthart.github.io, so base is "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
  },
});
