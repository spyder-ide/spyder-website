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

const blogImages = () => {
  return (tree, file) => {
    visit(tree, "image", (node) => {
      // Get the blog post slug from the file path
      const routePath = file.filename.split("routes")[1] || "";
      const blogMatch = routePath.match(/\/blog\/([^/]+)/);

      console.log(
        `[BlogImages] Processing image: ${node.url} in file: ${file.filename}`
      );

      if (blogMatch && blogMatch[1]) {
        const slug = blogMatch[1];
        console.log(`[BlogImages] Detected blog slug: ${slug}`);

        // Store the original URL for debugging
        const originalUrl = node.url;

        // Handle paths with or without './' prefix
        if (node.url.startsWith("./")) {
          // Handle relative paths with './' prefix
          const imgName = node.url.slice(2);
          // Point to the slug directory
          node.url = `/blog/${slug}/${imgName}`;
          console.log(
            `[BlogImages] Transformed ./ path to: ${node.url} (was: ${originalUrl})`
          );
        } else if (node.url.startsWith("/")) {
          // Handle absolute paths - keep as is
          console.log(`[BlogImages] Keeping absolute path: ${node.url}`);
        } else if (node.url.startsWith("http")) {
          // Handle URLs - keep as is
          console.log(`[BlogImages] Keeping URL: ${node.url}`);
        } else {
          // Handle relative paths without './' prefix - IMPORTANT: This is the case that's failing on Netlify
          // Always prefix with slug for blog images
          node.url = `/blog/${slug}/${node.url}`;
          console.log(
            `[BlogImages] Transformed relative path to: ${node.url} (was: ${originalUrl})`
          );
        }
      } else if (node.url.startsWith("./")) {
        // Fallback for other routes
        const route = routePath.split("/").slice(0, -1).join("/");
        node.url = `${route}/${node.url.slice(2)}`;
        console.log(`[BlogImages] Fallback transformation to: ${node.url}`);
      }

      console.log(`[BlogImages] Final image path: ${node.url}`);
    });
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
  remarkPlugins: [smartypants, escapeQuotes, processMetadata],
  rehypePlugins: [
    blogImages,
    rehypeTitleFigure,
    [classNames, classNamesOptions],
  ],
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
