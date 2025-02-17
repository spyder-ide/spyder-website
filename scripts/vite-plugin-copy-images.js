import fs from "fs";
import path from "path";

export default function copyImages() {
  return {
    name: "copy-images",
    enforce: 'post',
    apply: 'build',

    configResolved(config) {
      console.log('🖼️  Copy Images plugin initialized');
    },

    generateBundle() {
      console.log('🔍 Scanning for blog posts...');
      const blogDir = path.join(process.cwd(), "src", "routes", "blog");

      try {
        const blogPosts = fs.readdirSync(blogDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);

        console.log('📚 Blog posts found:', blogPosts);

        for (const blogPost of blogPosts) {
          if (blogPost === '[page]' || blogPost === 'feed.xml') continue;

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
              const outputPath = path.join('blog', blogPost, medium);

              console.log(`📦 Emitting: ${outputPath}`);
              this.emitFile({
                type: 'asset',
                fileName: outputPath,
                source: content
              });
            }
          } catch (error) {
            console.error(`❌ Error processing ${fullDirPath}:`, error);
          }
        }
      } catch (error) {
        console.error('❌ Error reading blog directory:', error);
      }

      console.log('✅ Copy Images plugin finished');
    }
  };
}
