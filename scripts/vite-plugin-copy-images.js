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
              try {
                const fileId = emitFile({
                  type: "asset",
                  fileName: outputPath,
                  source: content,
                });
                console.log(`📦 Emitted as: ${outputPath} (ID: ${fileId})`);
              } catch (error) {
                console.error(`❌ Error emitting file: ${outputPath}`, error);
              }
            }

            // Also directly copy the image to common build output locations
            // This ensures the images are available regardless of how SvelteKit builds
            try {
              // Ensure we also manually copy the files to common build directories
              const buildLocations = [
                path.join(process.cwd(), "build", "blog", blogPost),
                path.join(
                  process.cwd(),
                  ".svelte-kit",
                  "output",
                  "client",
                  "blog",
                  blogPost
                ),
                path.join(process.cwd(), "build", "client", "blog", blogPost),
              ];

              for (const buildLoc of buildLocations) {
                try {
                  // Create directory if it doesn't exist
                  if (!fs.existsSync(buildLoc)) {
                    fs.mkdirSync(buildLoc, { recursive: true });
                    console.log(`📁 Created directory: ${buildLoc}`);
                  }

                  // Copy the file
                  const outputFilePath = path.join(buildLoc, medium);
                  fs.writeFileSync(outputFilePath, content);
                  console.log(`📋 Manually copied to: ${outputFilePath}`);
                } catch (copyError) {
                  console.error(`❌ Error copying to ${buildLoc}:`, copyError);
                }
              }
            } catch (copyError) {
              console.error(`❌ Error in manual copy process:`, copyError);
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
          // Try multiple potential build directories
          const possibleBuildDirs = [
            // Standard build output
            path.join(process.cwd(), outDir),
            // Direct build path
            path.join(process.cwd(), "build"),
            // SvelteKit output client
            path.join(process.cwd(), ".svelte-kit", "output", "client"),
            // SvelteKit output client in build
            path.join(process.cwd(), "build", "client"),
          ];

          let foundBlogDir = false;

          for (const buildDir of possibleBuildDirs) {
            console.log(`🔍 Checking build directory: ${buildDir}`);

            if (fs.existsSync(buildDir)) {
              const blogDir = path.join(buildDir, "blog");

              if (fs.existsSync(blogDir)) {
                try {
                  const blogDirs = fs
                    .readdirSync(blogDir, { withFileTypes: true })
                    .filter((dirent) => dirent.isDirectory())
                    .map((dirent) => dirent.name);

                  console.log(
                    `📁 Found ${blogDirs.length} blog directories in: ${blogDir}`
                  );

                  foundBlogDir = true;

                  // Now verify if images exist in blog post directories
                  let imageCount = 0;
                  for (const slug of blogDirs) {
                    const slugDir = path.join(blogDir, slug);
                    const files = fs.readdirSync(slugDir);
                    const mediaFiles = files.filter((file) =>
                      /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(
                        file
                      )
                    );

                    if (mediaFiles.length > 0) {
                      console.log(
                        `📸 Found ${mediaFiles.length} media files in ${slug}`
                      );
                      imageCount += mediaFiles.length;
                    }
                  }

                  if (imageCount > 0) {
                    console.log(
                      `📊 Total of ${imageCount} images found in blog posts`
                    );
                  } else {
                    console.log(
                      `⚠️ No images found in any blog posts in: ${blogDir}`
                    );
                  }
                } catch (err) {
                  console.error(
                    `❌ Error reading blog directory: ${blogDir}`,
                    err
                  );
                }
              } else {
                console.log(`⚠️ Blog directory not found in build: ${blogDir}`);

                // Try to create it if it doesn't exist
                try {
                  console.log(`📁 Creating blog directory: ${blogDir}`);
                  fs.mkdirSync(blogDir, { recursive: true });
                } catch (err) {
                  console.error(
                    `❌ Failed to create blog directory: ${blogDir}`,
                    err
                  );
                }
              }
            } else {
              console.log(`⚠️ Build directory not found: ${buildDir}`);
            }
          }

          if (!foundBlogDir) {
            console.log(`❌ No blog directories found in any build location`);
          }
        } catch (error) {
          console.error("❌ Error verifying final build:", error);
        }
      }

      console.log("🎉 Copy Images plugin completely finished");
    },
  };
}
