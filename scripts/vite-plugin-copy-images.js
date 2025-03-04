import fs from "fs";
import path from "path";

export default function copyImages() {
  // Extract the image processing logic to a separate function
  function processImages(emitFile) {
    console.log("🔍 Scanning for blog posts...");
    const blogDir = path.join(process.cwd(), "src", "routes", "blog");

    try {
      const blogPosts = fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .filter(
          (dirent) => dirent.name !== "[page]" && dirent.name !== "feed.xml"
        )
        .map((dirent) => dirent.name);

      console.log("📚 Blog posts found:", blogPosts);

      for (const blogPost of blogPosts) {
        if (blogPost === "[page]" || blogPost === "feed.xml") continue;

        const fullDirPath = path.join(blogDir, blogPost);
        console.log(`📂 Processing: ${blogPost}`);

        try {
          const media = fs
            .readdirSync(fullDirPath)
            .filter((file) =>
              /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file)
            );

          console.log(`📸 Found ${media.length} media files in ${blogPost}`);

          for (const medium of media) {
            const content = fs.readFileSync(path.join(fullDirPath, medium));

            // Standard location: /blog/[slug]/[image]
            const outputPath = path.join("blog", blogPost, medium);
            console.log(`📦 Emitting: ${outputPath}`);
            if (emitFile) {
              emitFile({
                type: "asset",
                fileName: outputPath,
                source: content,
              });
            }
          }
        } catch (error) {
          console.error(`❌ Error processing ${fullDirPath}:`, error);
        }
      }
    } catch (error) {
      console.error("❌ Error reading blog directory:", error);
    }

    console.log("✅ Copy Images plugin finished");
  }

  return {
    name: "copy-images",
    enforce: "post",
    apply: "build", // Only run during build

    configResolved(config) {
      console.log("🖼️  Copy Images plugin initialized");
    },

    configureServer(server) {
      // During development, just watch the blog image files
      console.log("🔍 Setting up blog image watcher for development mode...");

      // Watch for changes in blog directory
      const blogDir = path.join(process.cwd(), "src", "routes", "blog");
      server.watcher.add(
        path.join(
          blogDir,
          "**/*.{png,jpg,jpeg,gif,svg,webp,webm,mp4,ogv,mp3,ogg}"
        )
      );

      console.log(
        "📝 Development mode: Images will be served from their source location"
      );
    },

    generateBundle() {
      // In build mode, process and emit the files
      processImages((fileInfo) => this.emitFile(fileInfo));
    },
  };
}
