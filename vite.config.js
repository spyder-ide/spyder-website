import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import copyImages from "./vite-plugin-copy-images";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit(), copyImages()],
  build: {
    sourcemap: false,
  },
});
