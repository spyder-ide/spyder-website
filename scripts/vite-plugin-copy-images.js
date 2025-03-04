import fs from "fs";
import path from "path";

/**
 * Configuration options for the plugin
 * @typedef {Object} PluginConfig
 * @property {boolean} logging - Whether to enable debug logging
 * @property {string[]} mediaExtensions - File extensions to consider as media files
 * @property {string[]} ignoredDirs - Directories to ignore when scanning blog posts
 */

/** @type {PluginConfig} */
const CONFIG = {
  logging: false,
  mediaExtensions: [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "svg",
    "webp",
    "webm",
    "mp4",
    "ogv",
    "mp3",
    "ogg",
  ],
  ignoredDirs: ["[page]", "feed.xml"],
};

/**
 * Debug logger that only logs when logging is enabled
 * @param {...any} args - Arguments to pass to console.log
 */
function debugLog(...args) {
  if (CONFIG.logging) {
    console.log(...args);
  }
}

/**
 * Creates a Vite plugin to copy images from blog posts to the build output
 * @returns {import('vite').Plugin} Vite plugin object
 */
export default function copyImages() {
  // Store build info
  let outDir;

  /**
   * Gets the path to the blog directory
   * @returns {string} The absolute path to the blog directory
   */
  function getBlogDirectoryPath() {
    return path.join(process.cwd(), "src", "routes", "blog");
  }

  /**
   * Checks if a file is a media file based on extension
   * @param {string} filename - Name of the file to check
   * @returns {boolean} Whether the file is a media file
   */
  function isMediaFile(filename) {
    const pattern = new RegExp(
      `\\.(${CONFIG.mediaExtensions.join("|")})$`,
      "i"
    );
    return pattern.test(filename);
  }

  /**
   * Creates a directory if it doesn't exist
   * @param {string} dirPath - Path to the directory to create
   * @returns {boolean} Whether the directory was created or already existed
   */
  function ensureDirectoryExists(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        debugLog(`📁 Created directory: ${dirPath}`);
        return true;
      }
      return true;
    } catch (error) {
      console.error(`❌ Error creating directory ${dirPath}:`, error);
      return false;
    }
  }

  /**
   * Gets a list of all blog post directories
   * @param {string} blogDir - Path to the parent blog directory
   * @returns {string[]} Array of blog post directory names
   */
  function getBlogPosts(blogDir) {
    try {
      return fs
        .readdirSync(blogDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .filter((dirent) => !CONFIG.ignoredDirs.includes(dirent.name))
        .map((dirent) => dirent.name);
    } catch (error) {
      console.error("❌ Error reading blog directory:", error);
      return [];
    }
  }

  /**
   * Gets a list of media files in a specific blog post directory
   * @param {string} dirPath - Path to the blog post directory
   * @returns {string[]} Array of media filenames
   */
  function getMediaFiles(dirPath) {
    try {
      return fs.readdirSync(dirPath).filter((file) => isMediaFile(file));
    } catch (error) {
      console.error(`❌ Error reading directory ${dirPath}:`, error);
      return [];
    }
  }

  /**
   * Copy a media file to a target location
   * @param {string} sourcePath - Source file path
   * @param {string} targetPath - Target file path
   * @returns {boolean} Whether the copy operation succeeded
   */
  function copyFileToTarget(sourcePath, targetPath) {
    try {
      const targetDir = path.dirname(targetPath);
      ensureDirectoryExists(targetDir);

      const content = fs.readFileSync(sourcePath);
      fs.writeFileSync(targetPath, content);
      debugLog(`📋 Copied to: ${targetPath}`);
      return true;
    } catch (error) {
      console.error(
        `❌ Error copying file from ${sourcePath} to ${targetPath}:`,
        error
      );
      return false;
    }
  }

  /**
   * Process all blog post media files and copy them to output locations
   * @param {Function|null} emitFile - Function to emit files in the Vite build process
   */
  function processImages(emitFile) {
    debugLog("🔍 Scanning for blog posts...");
    const blogDir = getBlogDirectoryPath();
    const blogPosts = getBlogPosts(blogDir);

    debugLog(`📚 Found ${blogPosts.length} blog posts`);
    let totalMediaCount = 0;

    for (const blogPost of blogPosts) {
      const fullDirPath = path.join(blogDir, blogPost);
      debugLog(`📂 Processing: ${blogPost}`);

      const media = getMediaFiles(fullDirPath);
      debugLog(`📸 Found ${media.length} media files in ${blogPost}`);
      totalMediaCount += media.length;

      for (const medium of media) {
        const sourcePath = path.join(fullDirPath, medium);
        const relativePath = path.join("blog", blogPost, medium);

        // 1. Emit file for Vite bundle if emitFile function provided
        if (emitFile) {
          try {
            const content = fs.readFileSync(sourcePath);
            const fileId = emitFile({
              type: "asset",
              fileName: relativePath,
              source: content,
            });
            debugLog(`📦 Emitted as: ${relativePath} (ID: ${fileId})`);
          } catch (error) {
            console.error(`❌ Error emitting file: ${relativePath}`, error);
          }
        }

        // 2. Also manually copy to build directory
        const buildTargetPath = path.join(process.cwd(), "build", relativePath);
        copyFileToTarget(sourcePath, buildTargetPath);
      }
    }

    debugLog(`📊 Total media files processed: ${totalMediaCount}`);
    debugLog("✅ Copy Images plugin finished");

    // Ensure the blog directory exists in the build output
    if (outDir) {
      const buildBlogDir = path.join(process.cwd(), outDir, "blog");
      ensureDirectoryExists(buildBlogDir);
    }
  }

  /**
   * Verify images in the final build output
   */
  function verifyBuildOutput() {
    if (!outDir) return;

    debugLog(`🔍 Checking final build output in: ${outDir}`);

    const possibleBuildDirs = [
      path.join(process.cwd(), outDir),
      path.join(process.cwd(), "build"),
      path.join(process.cwd(), ".svelte-kit", "output", "client"),
      path.join(process.cwd(), "build", "client"),
    ];

    let foundBlogDir = false;

    for (const buildDir of possibleBuildDirs) {
      debugLog(`🔍 Checking build directory: ${buildDir}`);

      if (!fs.existsSync(buildDir)) {
        debugLog(`⚠️ Build directory not found: ${buildDir}`);
        continue;
      }

      const blogDir = path.join(buildDir, "blog");

      if (!fs.existsSync(blogDir)) {
        debugLog(`⚠️ Blog directory not found in build: ${blogDir}`);
        ensureDirectoryExists(blogDir);
        continue;
      }

      try {
        const blogDirs = fs
          .readdirSync(blogDir, { withFileTypes: true })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        debugLog(`📁 Found ${blogDirs.length} blog directories in: ${blogDir}`);
        foundBlogDir = true;

        // Verify if images exist in blog post directories
        let imageCount = 0;
        for (const slug of blogDirs) {
          const slugDir = path.join(blogDir, slug);
          const mediaFiles = getMediaFiles(slugDir);

          if (mediaFiles.length > 0) {
            debugLog(`📸 Found ${mediaFiles.length} media files in ${slug}`);
            imageCount += mediaFiles.length;
          }
        }

        debugLog(`📊 Total of ${imageCount} images found in ${blogDir}`);
      } catch (err) {
        console.error(`❌ Error reading blog directory: ${blogDir}`, err);
      }
    }

    if (!foundBlogDir) {
      debugLog(`❌ No blog directories found in any build location`);
    }
  }

  /**
   * The Vite plugin object
   * @type {import('vite').Plugin}
   */
  return {
    name: "copy-images",
    enforce: "post",
    apply: "build", // Only run during build

    /**
     * Called when the Vite config is resolved
     * @param {import('vite').ResolvedConfig} config - The resolved Vite config
     */
    configResolved(config) {
      debugLog("🖼️  Copy Images plugin initialized");
      debugLog(`🔧 Build mode: ${config.mode}`);
      debugLog(`📁 Output directory: ${config.build.outDir}`);
      outDir = config.build.outDir || "build";
    },

    /**
     * Configure the development server
     * @param {import('vite').ViteDevServer} server - The Vite dev server
     */
    configureServer(server) {
      debugLog("🔍 Setting up blog image watcher for development mode...");

      // Watch for changes in blog directory
      const blogDir = getBlogDirectoryPath();
      const watchPattern = path.join(
        blogDir,
        `**/*.{${CONFIG.mediaExtensions.join(",")}}`
      );

      server.watcher.add(watchPattern);
      debugLog(
        "📝 Development mode: Images will be served from their source location"
      );
    },

    /**
     * Called when generating the bundle
     * @param {Object} options - Bundle options
     * @param {Object} bundle - Bundle object
     */
    generateBundle(options, bundle) {
      debugLog("🔨 Generating bundle - copying blog images...");
      debugLog(`📦 Output path: ${options.dir || "default output"}`);

      processImages((fileInfo) => {
        try {
          const result = this.emitFile(fileInfo);
          debugLog(`✅ Successfully emitted: ${fileInfo.fileName} (${result})`);
          return result;
        } catch (error) {
          console.error(`❌ Failed to emit ${fileInfo.fileName}:`, error);
          return null;
        }
      });

      debugLog("🏁 Image copying complete!");
    },

    /**
     * Called when the bundle is closed
     */
    closeBundle() {
      debugLog("🧹 Finalizing image copying process...");
      verifyBuildOutput();
      debugLog("🎉 Copy Images plugin is done!");
    },
  };
}
