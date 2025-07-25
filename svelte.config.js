// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import classNames from "rehype-class-names";
import rehypeTitleFigure from "rehype-title-figure";
import smartypants from "remark-smartypants";
import { visit } from "unist-util-visit";

const classNamesOptions = {
  h2: "section",
  h3: "subsection",
  h4: "subsubsection",
  a: "link",
  figure: "figure",
};

const LOGGING = false;

function debugLog(message) {
  if (LOGGING) {
    console.log(message);
  }
};

// Function to transform image paths correctly for blog posts
const blogImages = () => {
  return (tree, file) => {
    // Get the blog post slug from the file path
    const routePath = file.filename.split("routes")[1] || "";
    const blogMatch = routePath.match(/\/blog\/([^/]+)/);

    debugLog(`[BlogImages] Processing file: ${file.filename}`);

    // Only process blog post files
    if (blogMatch && blogMatch[1]) {
      const slug = blogMatch[1];
      debugLog(`[BlogImages] Detected blog slug: ${slug}`);

      // Process both image nodes and raw HTML nodes
      // First, handle regular image nodes
      visit(tree, "image", (node) => {
        // Store the original URL for debugging
        const originalUrl = node.url;

        // Skip external URLs
        if (node.url.startsWith("http")) {
          debugLog(`[BlogImages] Keeping external URL: ${node.url}`);
          return;
        }

        // Skip absolute paths outside of blog
        if (node.url.startsWith("/") && !node.url.startsWith("/blog/")) {
          debugLog(`[BlogImages] Keeping absolute path: ${node.url}`);
          return;
        }

        // For all other cases, ensure the image has the correct blog post slug prefix
        const cleanPath = node.url.startsWith("./")
          ? node.url.slice(2)
          : node.url;

        // Always use the pattern /blog/[slug]/[image.png]
        if (node.url.startsWith(`/blog/${slug}/`)) {
          debugLog(`[BlogImages] URL already has correct format: ${node.url}`);
        } else {
          node.url = `/blog/${slug}/${cleanPath}`;
          debugLog(
            `[BlogImages] Transformed to: ${node.url} (was: ${originalUrl})`
          );
        }
      });

      // Then handle raw HTML to catch any embedded <img>, <video>, and <source> tags
      visit(tree, "html", (node) => {
        if (node.value && (node.value.includes("<img") || node.value.includes("<video") || node.value.includes("<source"))) {
          debugLog(`[BlogImages] Processing HTML node: ${node.value.substring(0, 100)}...`);
          const originalHtml = node.value;

          // Transform image src attributes
          node.value = node.value.replace(/src="([^"]+)"/g, (match, src) => {
            // Skip external URLs and absolute paths
            if (
              src.startsWith("http") ||
              (src.startsWith("/") && !src.startsWith("/blog/"))
            ) {
              return match;
            }

            // Clean the path
            const cleanPath = src.startsWith("./") ? src.slice(2) : src;

            // Create the new src with blog slug
            const newSrc = `/blog/${slug}/${cleanPath}`;

            debugLog(`[BlogImages] Transformed HTML src: ${src} -> ${newSrc}`);
            return `src="${newSrc}"`;
          });

          // Transform video href attributes (for download links)
          node.value = node.value.replace(/href="([^"]+)"/g, (match, href) => {
            // Skip external URLs and absolute paths
            if (
              href.startsWith("http") ||
              (href.startsWith("/") && !href.startsWith("/blog/"))
            ) {
              return match;
            }

            // Clean the path
            const cleanPath = href.startsWith("./") ? href.slice(2) : href;

            // Create the new href with blog slug
            const newHref = `/blog/${slug}/${cleanPath}`;

            debugLog(`[BlogImages] Transformed HTML href: ${href} -> ${newHref}`);
            return `href="${newHref}"`;
          });

          if (originalHtml !== node.value) {
            debugLog("[BlogImages] HTML node was transformed");
          }
        }
      });
    } else {
      debugLog(
        `[BlogImages] Not a blog post, skipping image path transformation`
      );
    }
  };
};

const escapeQuotes = () => {
  return (tree) => {
    visit(tree, "image", (node) => {
      if (node.alt) {
        node.alt = node.alt.replace(/"/g, "&quot;");
      }
    });
  };
};

const processMetadata = () => {
  return (tree, file) => {
    const { data } = file;
    if (!data.fm) return;

    // Ensure tags is always an array
    if (typeof data.fm.tags === "string") {
      data.fm.tags = data.fm.tags.split(",").map((tag) => tag.trim());
    } else if (!Array.isArray(data.fm.tags)) {
      data.fm.tags = [];
    }

    // Ensure author is properly formatted
    if (typeof data.fm.author === "string") {
      data.fm.author = [data.fm.author];
    } else if (!Array.isArray(data.fm.author)) {
      data.fm.author = [];
    }

    // Update the frontmatter with processed data
    file.data.fm = data.fm;
  };
};

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  remarkPlugins: [smartypants, escapeQuotes, processMetadata, blogImages],
  rehypePlugins: [rehypeTitleFigure, [classNames, classNamesOptions]],
  layout: {
    blog: "src/lib/blocks/Post.svelte",
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      precompress: false,
      strict: false, // Allow dynamic routes
    }),
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "ignore",
      entries: ["*"],
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "" : "",
    },
  },
  extensions: [".svelte", ".md"],
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
  // Omit warning about screenreaders announcing <img> elements as an image
  onwarn: (warning, handler) => {
    // Omit the warning about redundant alt text if we are on development mode
    if (
      warning.code === "a11y-img-redundant-alt" &&
      warning.message.includes("Screenreaders already announce")
    ) {
      return;
    }

    handler(warning);
  },
};

export default config;
