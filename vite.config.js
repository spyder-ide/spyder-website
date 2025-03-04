// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import copyImages from "./scripts/vite-plugin-copy-images";
import htmlTransform from "./scripts/vite-plugin-html-transform";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  //plugins: [sveltekit(), copyImages()],
  plugins: [sveltekit(), copyImages(), htmlTransform()],
  server: {
    fs: {
      allow: ["./"],
    },
    strictPort: false,
  },
  build: {
    chunkSizeWarningLimit: 1500,
    ssrEmitAssets: true,
    sourcemap: false,
  },
});
