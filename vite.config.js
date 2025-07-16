// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import copyImages from "./scripts/vite-plugin-copy-images";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit(), copyImages()],
  server: {
    fs: {
      allow: ["./"],
    },
    strictPort: false,
  },
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 1500,
    ssrEmitAssets: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'svelte-core': ['svelte'],
          // Create separate chunks for each icon pack
          'icons-ai': ['svelte-icons-pack/ai'],
          'icons-bs': ['svelte-icons-pack/bs'],
          'icons-bi': ['svelte-icons-pack/bi'],
          'icons-lu': ['svelte-icons-pack/lu'],
          'icons-vsc': ['svelte-icons-pack/vsc'],
        }
      }
    },
  },
  optimizeDeps: {
    include: ['svelte'],
  }
});
