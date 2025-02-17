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
      console.log('📦 Bundle contains:', Object.keys(bundle).map(key => `\n - ${key}`).join(''));

      const blogDir = path.join(process.cwd(), "src", "routes", "blog");

      for (const file of Object.values(bundle)) {
        console.log(`🔎 Checking file: ${file.fileName} (${file.type})`);
        if (
          file.fileName.endsWith(".html") &&
          file.fileName.startsWith("blog/")
        ) {
          console.log(`📝 Found blog post: ${file.fileName}`);
          const dirName = path.dirname(file.fileName);
          const fullDirPath = path.join(blogDir, dirName.split("blog/")[1]);

          try {
            const media = fs
              .readdirSync(fullDirPath)
              .filter((file) =>
                /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file),
              );

            console.log(`📸 Found ${media.length} media files in ${dirName}`);

            for (const medium of media) {
              const content = fs.readFileSync(path.join(fullDirPath, medium));
              const outputPath = path.join(dirName, medium);
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
