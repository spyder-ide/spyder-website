import fs from "fs";
import path from "path";

export default function copyImages() {
  return {
    name: "copy-images",
    apply: 'build',
    enforce: 'post',
    configResolved() {
      console.log('🖼️  Copy Images plugin initialized');
    },
    writeBundle(options, bundle) {
      console.log('🔍 Scanning for blog posts...');
      console.log('📂 Bundle options:', options);

      const blogDir = path.join(process.cwd(), "src", "routes", "blog");
      console.log('📁 Looking in blog directory:', blogDir);

      // Debug: List all files in the bundle
      const bundleFiles = Object.values(bundle).map(f => f.fileName);
      console.log('📑 All bundle files:', bundleFiles);

      // Debug: List all blog post files in src/routes/blog
      try {
        const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        console.log('📚 Blog posts in src/routes/blog:', blogPosts);
      } catch (error) {
        console.error('❌ Error reading blog directory:', error);
      }

      for (const file of Object.values(bundle)) {
        // Debug: Log each file we're checking
        console.log(`🔎 Checking: ${file.fileName}`);
        console.log(`   Starts with entries/pages/blog/? ${file.fileName.startsWith('entries/pages/blog/')}`);
        console.log(`   Ends with _page.md.js? ${file.fileName.endsWith('_page.md.js')}`);
        console.log(`   Includes /_? ${file.fileName.includes('/_')}`);

        // Look for mdsvex-processed blog posts, but exclude the dynamic route template
        if (
          file.fileName.startsWith('entries/pages/blog/') &&
          file.fileName.endsWith('_page.md.js') &&
          !file.fileName.includes('/_page_/') // Only exclude the dynamic route template
        ) {
          console.log(`📝 Found blog post: ${file.fileName}`);

          // Extract the blog post directory name from the file path
          // e.g., "entries/pages/blog/my-post/_page.md.js" -> "my-post"
          const blogPostDir = file.fileName
            .split('/blog/')[1]
            .split('/_page.md.js')[0];

          const fullDirPath = path.join(blogDir, blogPostDir);
          console.log(`📂 Looking for media in: ${fullDirPath}`);

          try {
            const media = fs
              .readdirSync(fullDirPath)
              .filter((file) =>
                /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file),
              );

            console.log(`📸 Found ${media.length} media files in ${blogPostDir}`);

            for (const medium of media) {
              const content = fs.readFileSync(path.join(fullDirPath, medium));
              const outputPath = path.join('blog', blogPostDir, medium).replace(/\\/g, '/');
              console.log(`📦 Emitting: ${outputPath}`);

              this.emitFile({
                type: "asset",
                fileName: outputPath,
                source: content,
              });
            }
          } catch (error) {
            console.error(`❌ Error processing ${fullDirPath}:`, error);
          }
        }
      }
      console.log('✅ Copy Images plugin finished');
    },
  };
}
