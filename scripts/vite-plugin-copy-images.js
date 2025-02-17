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

      const blogDir = path.join(process.cwd(), "src", "routes", "blog");

      for (const file of Object.values(bundle)) {
        // Look for mdsvex-processed blog posts
        if (
          file.fileName.startsWith('entries/pages/blog/') &&
          file.fileName.endsWith('_page.md.js') &&
          !file.fileName.includes('/_')  // Exclude dynamic route templates
        ) {
          console.log(`📝 Found blog post: ${file.fileName}`);

          // Extract the blog post directory name from the file path
          // e.g., "entries/pages/blog/my-post/_page.md.js" -> "my-post"
          const blogPostDir = file.fileName.split('/blog/')[1].split('/_page.md.js')[0];
          const fullDirPath = path.join(blogDir, blogPostDir);

          try {
            const media = fs
              .readdirSync(fullDirPath)
              .filter((file) =>
                /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file),
              );

            console.log(`📸 Found ${media.length} media files in ${blogPostDir}`);

            for (const medium of media) {
              const content = fs.readFileSync(path.join(fullDirPath, medium));
              // Use blog/[post-name]/[image] structure for output
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
