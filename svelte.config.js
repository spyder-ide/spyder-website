import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { visit } from "unist-util-visit";
import rehypeTitleFigure from 'rehype-title-figure'
import smartypants from "remark-smartypants";
import classNames from "rehype-class-names";

const classNamesOptions = {
  h2: "section",
  h3: "subsection",
  h4: "subsubsection",
  a: "link",
  figure: "figure"
};

const blogImages = () => {
  return (tree, file) => {
    visit(tree, "image", (node) => {
      if (node.url.startsWith("./")) {
        const route = file.filename
          .split("routes")[1]
          .split("/")
          .slice(0, -1)
          .join("/");
        node.url = `${route}/${node.url.slice(2)}`;
      }
    });
  };
};

const escapeQuotes = () => {
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.alt) {
        node.alt = node.alt.replace(/"/g, '&quot;');
      }
    });
  };
}

const mdsvexOptions = {
  extensions: [".md"],
  remarkPlugins: [
    smartypants,
    escapeQuotes
  ],
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
      // Prerender fallback strategy
      fallback: '404.html',
      precompress: true,
      strict: true
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        // Ignore missing metadata during prerendering
        if (path.includes('/blog/') && message.includes('metadata')) {
          return;
        }

        // Log other errors as warnings
        console.warn(`${path} referred by ${referrer}: ${message}`);
      },
      handleMissingId: "ignore",
      entries: ["*", "/blog/*", "/download/*", "/about"],
      origin: process.env.SITE_URL || "https://spyder-ide.org"
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "" : "",
    }
  },
  extensions: [".svelte", ".md"],
  preprocess: [
    mdsvex(mdsvexOptions),
    vitePreprocess(),
  ],
  // Omit warning about screenreaders announcing <img> elements as an image
  onwarn: (warning, handler) => {
    // Omit the warning about redundant alt text if we are on development mode
    if (warning.code === 'a11y-img-redundant-alt' &&
        warning.message.includes('Screenreaders already announce')) {
      return;
    }
    handler(warning);
  }
};

export default config;
