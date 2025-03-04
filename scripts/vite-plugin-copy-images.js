import fs from "fs";
import path from "path";

export default function copyImages() {
  // Store build info
  let outDir;

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

      console.log(`📚 Found ${blogPosts.length} blog posts`);

      let totalMediaCount = 0;

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
          totalMediaCount += media.length;

          for (const medium of media) {
            const content = fs.readFileSync(path.join(fullDirPath, medium));

            // Standard location: /blog/[slug]/[image]
            const outputPath = path.join("blog", blogPost, medium);
            console.log(`📦 Emitting: ${outputPath}`);

            if (emitFile) {
              const fileId = emitFile({
                type: "asset",
                fileName: outputPath,
                source: content,
              });
              console.log(`📦 Emitted as: ${outputPath} (ID: ${fileId})`);
            }
          }
        } catch (error) {
          console.error(`❌ Error processing ${fullDirPath}:`, error);
        }
      }

      console.log(`📊 Total media files processed: ${totalMediaCount}`);
    } catch (error) {
      console.error("❌ Error reading blog directory:", error);
    }

    console.log("✅ Copy Images plugin finished");

    // Also manually ensure images are in the build directory
    try {
      if (outDir) {
        console.log(`🔍 Checking build directory: ${outDir}`);
        const buildBlogDir = path.join(process.cwd(), outDir, "blog");

        // Create the directory if it doesn't exist
        if (!fs.existsSync(buildBlogDir)) {
          console.log(
            `📁 Creating blog directory in build output: ${buildBlogDir}`
          );
          fs.mkdirSync(buildBlogDir, { recursive: true });
        }
      }
    } catch (error) {
      console.error("❌ Error checking build directory:", error);
    }
  }

  return {
    name: "copy-images",
    enforce: "post",
    apply: "build", // Only run during build

    configResolved(config) {
      console.log("🖼️  Copy Images plugin initialized");
      console.log(`🔧 Build mode: ${config.mode}`);
      console.log(`📁 Output directory: ${config.build.outDir}`);
      outDir = config.build.outDir || ".svelte-kit/output/client";
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

    generateBundle(options, bundle) {
      // In build mode, process and emit the files
      console.log("🔨 Generating bundle - copying blog images...");
      console.log(`📦 Output path: ${options.dir || "default output"}`);

      processImages((fileInfo) => {
        try {
          const result = this.emitFile(fileInfo);
          console.log(
            `✅ Successfully emitted: ${fileInfo.fileName} (${result})`
          );
          return result;
        } catch (error) {
          console.error(`❌ Failed to emit ${fileInfo.fileName}:`, error);
          return null;
        }
      });

      console.log("🏁 Image copying complete!");
    },

    closeBundle() {
      console.log("🧹 Finalizing image copying process...");

      // Additional verification step after the bundle is closed
      if (outDir) {
        console.log(`🔍 Checking final build output in: ${outDir}`);

        try {
          const buildDir = path.join(process.cwd(), outDir);
          if (fs.existsSync(buildDir)) {
            const blogDir = path.join(buildDir, "blog");

            if (fs.existsSync(blogDir)) {
              const blogDirs = fs
                .readdirSync(blogDir, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);

              console.log(
                `📁 Found ${blogDirs.length} blog directories in final build`
              );
            } else {
              console.log(
                `⚠️ Blog directory not found in final build: ${blogDir}`
              );
            }
          } else {
            console.log(`⚠️ Build directory not found: ${buildDir}`);
          }
        } catch (error) {
          console.error("❌ Error verifying final build:", error);
        }
      }

      console.log("🎉 Copy Images plugin completely finished");
    },
  };
}
