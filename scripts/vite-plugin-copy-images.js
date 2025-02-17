import fs from "fs";
import path from "path";

export default function copyImages() {
  let outDir;
  let isBuild = false;
  let isSSR = false;

  return {
    name: "copy-images",
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      console.log('🖼️  Copy Images plugin initialized');
      outDir = config.build.outDir;
      isBuild = config.command === 'build';
      isSSR = !!config.build.ssr;
      console.log(`Build mode: ${isBuild}, SSR: ${isSSR}, outDir: ${outDir}`);
    },
    writeBundle(options, bundle) {
      // Skip if we're in SSR mode or not in build mode
      if (isSSR || !isBuild) {
        console.log('⏭️  Skipping image copy (SSR or not build mode)');
        return;
      }

      console.log('🔍 Scanning for blog posts...');

      const blogDir = path.join(process.cwd(), "src", "routes", "blog");
      const buildDir = path.join(process.cwd(), "build");
      console.log('📁 Looking in blog directory:', blogDir);
      console.log('📁 Build directory:', buildDir);

      // Debug: List all blog post files in src/routes/blog
      try {
        const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        console.log('📚 Blog posts in src/routes/blog:', blogPosts);

        // Process each blog post directory
        for (const blogPost of blogPosts) {
          if (blogPost === '[page]' || blogPost === 'feed.xml') continue;

          const fullDirPath = path.join(blogDir, blogPost);
          console.log(`📂 Looking for media in: ${fullDirPath}`);

          try {
            const media = fs
              .readdirSync(fullDirPath)
              .filter((file) =>
                /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file),
              );

            console.log(`📸 Found ${media.length} media files in ${blogPost}`);

            for (const medium of media) {
              const content = fs.readFileSync(path.join(fullDirPath, medium));
              const outputPath = path.join(buildDir, 'blog', blogPost, medium);

              // Ensure the output directory exists
              const outputDir = path.dirname(outputPath);
              if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
              }

              console.log(`📦 Copying to: ${outputPath}`);
              fs.writeFileSync(outputPath, content);
            }
          } catch (error) {
            console.error(`❌ Error processing ${fullDirPath}:`, error);
          }
        }
      } catch (error) {
        console.error('❌ Error reading blog directory:', error);
      }

      console.log('✅ Copy Images plugin finished');
    },
  };
}
