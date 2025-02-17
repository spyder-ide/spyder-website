import fs from "fs";
import path from "path";

export default function copyImages() {
  return {
    name: "copy-images",
    writeBundle(object, bundle) {
      const blogDir = path.join(process.cwd(), "src", "routes", "blog");

      for (const file of Object.values(bundle)) {
        if (
          file.fileName.endsWith(".html") &&
          file.fileName.startsWith("blog/")
        ) {
          console.log(`Found blog post: ${file.fileName}`);
          const dirName = path.dirname(file.fileName);
          const fullDirPath = path.join(blogDir, dirName.split("blog/")[1]);

          const media = fs
            .readdirSync(fullDirPath)
            .filter((file) =>
              /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i.test(file),
            );

          for (const medium of media) {
            const content = fs.readFileSync(path.join(fullDirPath, medium));
            console.log(`Copying: ${path.join(dirName, medium)}`);
            this.emitFile({
              type: "asset",
              fileName: path.join(dirName, medium),
              source: content,
            });
          }
        }
      }
    },
  };
}
