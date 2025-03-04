import fs from "fs";
import path from "path";

/**
 * Vite plugin to transform HTML files in the build output
 * This should fix image paths in blog posts
 */
export default function htmlTransform() {
  let outDir;

  return {
    name: "html-transform",
    enforce: "post",
    apply: "build", // only apply in build mode

    configResolved(config) {
      console.log("🔄 HTML Transform plugin initialized");
      outDir = config.build.outDir || "build";
      console.log(`📁 Build output directory: ${outDir}`);
    },

    async closeBundle() {
      console.log("🔍 Starting HTML transformation for flat blog files...");

      // Try multiple potential blog directories
      const buildPaths = [path.join(process.cwd(), "build")];

      for (const buildPath of buildPaths) {
        const blogDir = path.join(buildPath, "blog");

        if (!fs.existsSync(blogDir)) {
          console.log(`❌ Blog directory not found at: ${blogDir}`);
          continue;
        }

        console.log(`✅ Found blog directory at: ${blogDir}`);

        try {
          // Get all HTML files directly in the blog directory
          const files = fs.readdirSync(blogDir);
          const htmlFiles = files.filter((file) => file.endsWith(".html"));

          console.log(
            `📄 Found ${htmlFiles.length} HTML files in blog directory`
          );

          let transformCount = 0;

          for (const htmlFile of htmlFiles) {
            console.log(`🔍 Processing ${htmlFile}`);
            const slug = htmlFile.replace(".html", "");
            const htmlPath = path.join(blogDir, htmlFile);

            // Read HTML file content
            let html = fs.readFileSync(htmlPath, "utf8");
            const originalHtml = html;

            // Fix image paths
            html = html.replace(
              /<img\s+([^>]*?)src="([^"]+?)"/g,
              (match, attrs, src) => {
                // Skip external URLs and already correct paths
                if (
                  src.startsWith("http") ||
                  src.startsWith(`/blog/${slug}/`) ||
                  (src.startsWith("/") && !src.startsWith("/blog/"))
                ) {
                  console.log(
                    `🔍 Skipping external URL or already correct path: ${src}`
                  );
                  return match;
                }

                // If it's a relative path (doesn't start with /)
                if (!src.startsWith("/")) {
                  const newSrc = `/blog/${slug}/${src}`;
                  console.log(
                    `🖼️ Fixed relative path in ${slug}: ${src} -> ${newSrc}`
                  );
                  return `<img ${attrs} src="${newSrc}"`;
                }

                // Handle incorrect /blog/ paths (without slug)
                if (
                  src.startsWith("/blog/") &&
                  !src.includes(`/blog/${slug}/`)
                ) {
                  const imgFilename = src.split("/").pop();
                  const newSrc = `/blog/${slug}/${imgFilename}`;
                  console.log(
                    `🖼️ Fixed blog path in ${slug}: ${src} -> ${newSrc}`
                  );
                  return `<img ${attrs} src="${newSrc}"`;
                }

                return match;
              }
            );

            if (html !== originalHtml) {
              fs.writeFileSync(htmlPath, html);
              transformCount++;
              console.log(`✅ Transformed HTML for blog post: ${slug}`);
            }
          }

          console.log(
            `🏁 HTML transformation complete. Fixed paths in ${transformCount} files.`
          );
          return; // Exit after the first successful directory processing
        } catch (error) {
          console.error(`❌ Error during HTML transformation:`, error);
        }
      }

      console.log(`❌ Could not find any blog files to process`);
    },
  };
}
