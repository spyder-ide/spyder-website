// vite.config.js
import { sveltekit } from "file:///home/andi/Dev/Spyder/spyder-website/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///home/andi/Dev/Spyder/spyder-website/node_modules/vite/dist/node/index.js";

// scripts/vite-plugin-copy-images.js
import fs from "fs";
import path from "path";
function copyImages() {
  function processImages(emitFile) {
    console.log("\u{1F50D} Scanning for blog posts...");
    const blogDir = path.join(process.cwd(), "src", "routes", "blog");
    try {
      const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).filter(
        (dirent) => dirent.name !== "[page]" && dirent.name !== "feed.xml"
      ).map((dirent) => dirent.name);
      console.log("\u{1F4DA} Blog posts found:", blogPosts);
      for (const blogPost of blogPosts) {
        if (blogPost === "[page]" || blogPost === "feed.xml") continue;
        const fullDirPath = path.join(blogDir, blogPost);
        console.log(`\u{1F4C2} Processing: ${blogPost}`);
        try {
          const media = fs.readdirSync(fullDirPath).filter(
            (file) => /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file)
          );
          console.log(`\u{1F4F8} Found ${media.length} media files in ${blogPost}`);
          for (const medium of media) {
            const content = fs.readFileSync(path.join(fullDirPath, medium));
            const outputPath = path.join("blog", blogPost, medium);
            console.log(`\u{1F4E6} Emitting: ${outputPath}`);
            if (emitFile) {
              emitFile({
                type: "asset",
                fileName: outputPath,
                source: content
              });
            }
            const altOutputPath = path.join("blog", medium);
            console.log(`\u{1F4E6} Emitting alternative: ${altOutputPath}`);
            if (emitFile) {
              emitFile({
                type: "asset",
                fileName: altOutputPath,
                source: content
              });
            }
          }
        } catch (error) {
          console.error(`\u274C Error processing ${fullDirPath}:`, error);
        }
      }
    } catch (error) {
      console.error("\u274C Error reading blog directory:", error);
    }
    console.log("\u2705 Copy Images plugin finished");
  }
  return {
    name: "copy-images",
    enforce: "post",
    // Make sure it runs in both development and build
    apply: "build",
    // Change back to build for now to fix the error
    configResolved(config) {
      console.log("\u{1F5BC}\uFE0F  Copy Images plugin initialized");
    },
    configureServer(server) {
      console.log("\u{1F50D} Setting up blog image watcher for development mode...");
      const blogDir = path.join(process.cwd(), "src", "routes", "blog");
      server.watcher.add(
        path.join(
          blogDir,
          "**/*.{png,jpg,jpeg,gif,svg,webp,webm,mp4,ogv,mp3,ogg}"
        )
      );
      console.log(
        "\u{1F4DD} Development mode: Images will be served from their source location"
      );
    },
    generateBundle() {
      processImages((fileInfo) => this.emitFile(fileInfo));
    }
  };
}

// vite.config.js
var vite_config_default = defineConfig({
  plugins: [sveltekit(), copyImages()],
  server: {
    fs: {
      allow: ["./"]
    },
    strictPort: false
  },
  build: {
    chunkSizeWarningLimit: 1500,
    ssrEmitAssets: true,
    sourcemap: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic2NyaXB0cy92aXRlLXBsdWdpbi1jb3B5LWltYWdlcy5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2FuZGkvRGV2L1NweWRlci9zcHlkZXItd2Vic2l0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYW5kaS9EZXYvU3B5ZGVyL3NweWRlci13ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2FuZGkvRGV2L1NweWRlci9zcHlkZXItd2Vic2l0ZS92aXRlLmNvbmZpZy5qc1wiOy8vIHZpdGUuY29uZmlnLmpzXG5pbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tIFwiQHN2ZWx0ZWpzL2tpdC92aXRlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGNvcHlJbWFnZXMgZnJvbSBcIi4vc2NyaXB0cy92aXRlLXBsdWdpbi1jb3B5LWltYWdlc1wiO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbc3ZlbHRla2l0KCksIGNvcHlJbWFnZXMoKV0sXG4gIHNlcnZlcjoge1xuICAgIGZzOiB7XG4gICAgICBhbGxvdzogW1wiLi9cIl0sXG4gICAgfSxcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXG4gICAgc3NyRW1pdEFzc2V0czogdHJ1ZSxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2FuZGkvRGV2L1NweWRlci9zcHlkZXItd2Vic2l0ZS9zY3JpcHRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9hbmRpL0Rldi9TcHlkZXIvc3B5ZGVyLXdlYnNpdGUvc2NyaXB0cy92aXRlLXBsdWdpbi1jb3B5LWltYWdlcy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hbmRpL0Rldi9TcHlkZXIvc3B5ZGVyLXdlYnNpdGUvc2NyaXB0cy92aXRlLXBsdWdpbi1jb3B5LWltYWdlcy5qc1wiO2ltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvcHlJbWFnZXMoKSB7XG4gIC8vIEV4dHJhY3QgdGhlIGltYWdlIHByb2Nlc3NpbmcgbG9naWMgdG8gYSBzZXBhcmF0ZSBmdW5jdGlvblxuICAvLyBzbyBpdCBjYW4gYmUgdXNlZCBieSBib3RoIGNvbmZpZ3VyZVNlcnZlciBhbmQgZ2VuZXJhdGVCdW5kbGVcbiAgZnVuY3Rpb24gcHJvY2Vzc0ltYWdlcyhlbWl0RmlsZSkge1xuICAgIGNvbnNvbGUubG9nKFwiXHVEODNEXHVERDBEIFNjYW5uaW5nIGZvciBibG9nIHBvc3RzLi4uXCIpO1xuICAgIGNvbnN0IGJsb2dEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJzcmNcIiwgXCJyb3V0ZXNcIiwgXCJibG9nXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJsb2dQb3N0cyA9IGZzXG4gICAgICAgIC5yZWFkZGlyU3luYyhibG9nRGlyLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSlcbiAgICAgICAgLmZpbHRlcigoZGlyZW50KSA9PiBkaXJlbnQuaXNEaXJlY3RvcnkoKSlcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoZGlyZW50KSA9PiBkaXJlbnQubmFtZSAhPT0gXCJbcGFnZV1cIiAmJiBkaXJlbnQubmFtZSAhPT0gXCJmZWVkLnhtbFwiXG4gICAgICAgIClcbiAgICAgICAgLm1hcCgoZGlyZW50KSA9PiBkaXJlbnQubmFtZSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiXHVEODNEXHVEQ0RBIEJsb2cgcG9zdHMgZm91bmQ6XCIsIGJsb2dQb3N0cyk7XG5cbiAgICAgIGZvciAoY29uc3QgYmxvZ1Bvc3Qgb2YgYmxvZ1Bvc3RzKSB7XG4gICAgICAgIGlmIChibG9nUG9zdCA9PT0gXCJbcGFnZV1cIiB8fCBibG9nUG9zdCA9PT0gXCJmZWVkLnhtbFwiKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBmdWxsRGlyUGF0aCA9IHBhdGguam9pbihibG9nRGlyLCBibG9nUG9zdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDQzIgUHJvY2Vzc2luZzogJHtibG9nUG9zdH1gKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IG1lZGlhID0gZnNcbiAgICAgICAgICAgIC5yZWFkZGlyU3luYyhmdWxsRGlyUGF0aClcbiAgICAgICAgICAgIC5maWx0ZXIoKGZpbGUpID0+XG4gICAgICAgICAgICAgIC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicHx3ZWJtfG1wNHxvZ3Z8bXAzfG9nZykkL2kudGVzdChmaWxlKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKGBcdUQ4M0RcdURDRjggRm91bmQgJHttZWRpYS5sZW5ndGh9IG1lZGlhIGZpbGVzIGluICR7YmxvZ1Bvc3R9YCk7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IG1lZGl1bSBvZiBtZWRpYSkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZnVsbERpclBhdGgsIG1lZGl1bSkpO1xuXG4gICAgICAgICAgICAvLyBFbWl0IHRvIGJvdGggbG9jYXRpb25zIHRvIGVuc3VyZSBjb21wYXRpYmlsaXR5XG4gICAgICAgICAgICAvLyAxLiBTdGFuZGFyZCBsb2NhdGlvbjogL2Jsb2cvW3NsdWddL1tpbWFnZV1cbiAgICAgICAgICAgIGNvbnN0IG91dHB1dFBhdGggPSBwYXRoLmpvaW4oXCJibG9nXCIsIGJsb2dQb3N0LCBtZWRpdW0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFx1RDgzRFx1RENFNiBFbWl0dGluZzogJHtvdXRwdXRQYXRofWApO1xuICAgICAgICAgICAgaWYgKGVtaXRGaWxlKSB7XG4gICAgICAgICAgICAgIGVtaXRGaWxlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFzc2V0XCIsXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IG91dHB1dFBhdGgsXG4gICAgICAgICAgICAgICAgc291cmNlOiBjb250ZW50LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMi4gQWx0ZXJuYXRpdmUgbG9jYXRpb24gZm9yIGNvbXBhdGliaWxpdHk6IC9ibG9nL1tpbWFnZV1cbiAgICAgICAgICAgIGNvbnN0IGFsdE91dHB1dFBhdGggPSBwYXRoLmpvaW4oXCJibG9nXCIsIG1lZGl1bSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXHVEODNEXHVEQ0U2IEVtaXR0aW5nIGFsdGVybmF0aXZlOiAke2FsdE91dHB1dFBhdGh9YCk7XG4gICAgICAgICAgICBpZiAoZW1pdEZpbGUpIHtcbiAgICAgICAgICAgICAgZW1pdEZpbGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYXNzZXRcIixcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogYWx0T3V0cHV0UGF0aCxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGNvbnRlbnQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBcdTI3NEMgRXJyb3IgcHJvY2Vzc2luZyAke2Z1bGxEaXJQYXRofTpgLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIlx1Mjc0QyBFcnJvciByZWFkaW5nIGJsb2cgZGlyZWN0b3J5OlwiLCBlcnJvcik7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJcdTI3MDUgQ29weSBJbWFnZXMgcGx1Z2luIGZpbmlzaGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImNvcHktaW1hZ2VzXCIsXG4gICAgZW5mb3JjZTogXCJwb3N0XCIsXG4gICAgLy8gTWFrZSBzdXJlIGl0IHJ1bnMgaW4gYm90aCBkZXZlbG9wbWVudCBhbmQgYnVpbGRcbiAgICBhcHBseTogXCJidWlsZFwiLCAvLyBDaGFuZ2UgYmFjayB0byBidWlsZCBmb3Igbm93IHRvIGZpeCB0aGUgZXJyb3JcblxuICAgIGNvbmZpZ1Jlc29sdmVkKGNvbmZpZykge1xuICAgICAgY29uc29sZS5sb2coXCJcdUQ4M0RcdUREQkNcdUZFMEYgIENvcHkgSW1hZ2VzIHBsdWdpbiBpbml0aWFsaXplZFwiKTtcbiAgICB9LFxuXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgLy8gRHVyaW5nIGRldmVsb3BtZW50LCB0ZWxsIFZpdGUgdG8gd2F0Y2ggdGhlIGJsb2cgaW1hZ2UgZmlsZXNcbiAgICAgIGNvbnNvbGUubG9nKFwiXHVEODNEXHVERDBEIFNldHRpbmcgdXAgYmxvZyBpbWFnZSB3YXRjaGVyIGZvciBkZXZlbG9wbWVudCBtb2RlLi4uXCIpO1xuXG4gICAgICAvLyBXYXRjaCBmb3IgY2hhbmdlcyBpbiBibG9nIGRpcmVjdG9yeVxuICAgICAgY29uc3QgYmxvZ0RpciA9IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcInNyY1wiLCBcInJvdXRlc1wiLCBcImJsb2dcIik7XG4gICAgICBzZXJ2ZXIud2F0Y2hlci5hZGQoXG4gICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICBibG9nRGlyLFxuICAgICAgICAgIFwiKiovKi57cG5nLGpwZyxqcGVnLGdpZixzdmcsd2VicCx3ZWJtLG1wNCxvZ3YsbXAzLG9nZ31cIlxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICAvLyBGb3IgZGV2ZWxvcG1lbnQsIHdlJ2xsIGxvZyBidXQgbm90IGFjdHVhbGx5IGVtaXQgZmlsZXNcbiAgICAgIC8vIHNpbmNlIFZpdGUncyBkZXYgc2VydmVyIHdpbGwgaGFuZGxlIHNlcnZpbmcgdGhlIGZpbGVzIGZyb20gdGhlaXIgb3JpZ2luYWwgbG9jYXRpb25zXG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgXCJcdUQ4M0RcdURDREQgRGV2ZWxvcG1lbnQgbW9kZTogSW1hZ2VzIHdpbGwgYmUgc2VydmVkIGZyb20gdGhlaXIgc291cmNlIGxvY2F0aW9uXCJcbiAgICAgICk7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlQnVuZGxlKCkge1xuICAgICAgLy8gSW4gYnVpbGQgbW9kZSwgd2UnbGwgcHJvY2VzcyBhbmQgZW1pdCB0aGUgZmlsZXNcbiAgICAgIHByb2Nlc3NJbWFnZXMoKGZpbGVJbmZvKSA9PiB0aGlzLmVtaXRGaWxlKGZpbGVJbmZvKSk7XG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLG9CQUFvQjs7O0FDRmlULE9BQU8sUUFBUTtBQUM3VixPQUFPLFVBQVU7QUFFRixTQUFSLGFBQThCO0FBR25DLFdBQVMsY0FBYyxVQUFVO0FBQy9CLFlBQVEsSUFBSSxzQ0FBK0I7QUFDM0MsVUFBTSxVQUFVLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxPQUFPLFVBQVUsTUFBTTtBQUVoRSxRQUFJO0FBQ0YsWUFBTSxZQUFZLEdBQ2YsWUFBWSxTQUFTLEVBQUUsZUFBZSxLQUFLLENBQUMsRUFDNUMsT0FBTyxDQUFDLFdBQVcsT0FBTyxZQUFZLENBQUMsRUFDdkM7QUFB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
