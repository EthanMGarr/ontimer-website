import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "src/widget/spam-widget.tsx"),
      name: "SpamWidget",
      fileName: "spam-widget",
      formats: ["iife"],
    },
    rollupOptions: {
      // Bundle React — no external deps required by the embedder
    },
  },
});
