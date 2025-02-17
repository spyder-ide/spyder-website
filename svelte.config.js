import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { visit } from "unist-util-visit";
import rehypeTitleFigure from 'rehype-title-figure'
import smartypants from "remark-smartypants";
import classNames from "rehype-class-names";
import copyImages from './scripts/vite-plugin-copy-images.js';

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
    adapter: adapter(),
    prerender: {
      handleHttpError: "warn",
      handleMissingId: "ignore",
      entries: ["*"],
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "" : "",
    },
    alias: {
      $static: 'static'
    }
  },
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex(mdsvexOptions)
  ],
  vitePlugin: {
    inspector: true
  },
  // Omit warning about screenreaders announcing <img> elements as an image
  onwarn: (warning, handler) => {
    // Fail the build on production if we have redundant words in the alt text
    //if (process.env.NODE_ENV === 'production' &&
    //    warning.code === 'a11y-img-redundant-alt' &&
    //    warning.message.includes('Screenreaders already announce')) {
    //  throw new Error(
    //    `Build failed: Image alt text contains redundant terms (${warning.filename})\n` +
    //    'Remove words like "image", "photo", or "picture" from alt text as screen readers already announce these.'
    //  );
    //}

    // Omit the warning about redundant alt text if we are on development mode
    if (warning.code === 'a11y-img-redundant-alt' &&
        warning.message.includes('Screenreaders already announce')) {
      return;
    }

    handler(warning);
  }
};

export default config;
