import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { visit } from "unist-util-visit";
import figures from "rehype-figure";
import classNames from "rehype-class-names";
//import lazyLoadPlugin from "rehype-plugin-image-native-lazy-loading";

const classNamesOptions = {
  h2: "section",
  h3: "subsection",
  h4: "subsubsection",
  a: "link",
};

const figuresOptions = {
  className: "figure text-center",
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

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  rehypePlugins: [
    [figures, figuresOptions],
    [classNames, classNamesOptions],
    blogImages,
    //lazyLoadPlugin,
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
      handleMissingId: "warn",
      entries: ["*"],
    },
    /*
    paths: {
      base: process.env.NODE_ENV === "production" ? "/sveltekit-gh-pages" : "",
    },
    */
  },
  extensions: [".svelte", ".md"],
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
};

export default config;
