import fs from "fs";
import path from "path";

/**
 * Vite plugin to transform HTML files in the build output
 * This will fix image paths in blog posts
 */
export default function htmlTransform() {
  let outDir;

  return {
    name: "html-transform",
    enforce: "post",
    apply: "build", // only apply in build mode

    configResolved(config) {
      console.log("🔄 HTML Transform plugin initialized");
      outDir = config.build.outDir || ".svelte-kit/output/client";
      console.log(`📁 Build output directory: ${outDir}`);
    },

    async closeBundle() {
      console.log("🔍 Starting HTML transformation...");

      // Process blog post HTML files
      const blogDir = path.join(process.cwd(), outDir, "blog");

      if (!fs.existsSync(blogDir)) {
        console.log(`❌ Blog directory not found in build output: ${blogDir}`);

        // Try alternative location
        const altBlogDir = path.join(process.cwd(), "build", "blog");
        if (fs.existsSync(altBlogDir)) {
          console.log(
            `✅ Found blog directory at alternative location: ${altBlogDir}`
          );
          transformBlogHtml(altBlogDir);
        } else {
          console.log(`❌ Could not find blog directory in build output`);
        }
        return;
      }

      transformBlogHtml(blogDir);
    },
  };
}

/**
 * Transform HTML files in the blog directory
 */
function transformBlogHtml(blogDir) {
  try {
    const blogSlugs = fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => !dirent.name.includes("."))
      .map((dirent) => dirent.name);

    console.log(`📂 Found ${blogSlugs.length} blog post directories`);

    let transformCount = 0;

    for (const slug of blogSlugs) {
      const indexHtmlPath = path.join(blogDir, slug, "index.html");

      if (!fs.existsSync(indexHtmlPath)) {
        console.log(`⚠️ No index.html found for blog post: ${slug}`);
        continue;
      }

      // Read the HTML file
      let html = fs.readFileSync(indexHtmlPath, "utf8");
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
            return match;
          }

          // If it's a relative path (doesn't start with /)
          if (!src.startsWith("/")) {
            const newSrc = `/blog/${slug}/${src}`;
            console.log(
              `🖼️ Fixed relative image path in ${slug}: ${src} -> ${newSrc}`
            );
            return `<img ${attrs}src="${newSrc}"`;
          }

          // Handle incorrect /blog/ paths (without slug)
          if (src.startsWith("/blog/") && !src.includes(`/blog/${slug}/`)) {
            // Extract image filename from the path
            const imgFilename = src.split("/").pop();
            const newSrc = `/blog/${slug}/${imgFilename}`;
            console.log(
              `🖼️ Fixed blog image path in ${slug}: ${src} -> ${newSrc}`
            );
            return `<img ${attrs}src="${newSrc}"`;
          }

          return match;
        }
      );

      // Write the transformed HTML back to the file if changes were made
      if (html !== originalHtml) {
        fs.writeFileSync(indexHtmlPath, html);
        transformCount++;
        console.log(`✅ Transformed HTML for blog post: ${slug}`);
      } else {
        console.log(`ℹ️ No image paths needed fixing in blog post: ${slug}`);
      }
    }

    console.log(
      `🏁 HTML transformation complete. Fixed paths in ${transformCount} files.`
    );
  } catch (error) {
    console.error("❌ Error during HTML transformation:", error);
  }
}
