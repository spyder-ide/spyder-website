import { fetchMarkdownPosts } from "$lib/utils";
import { metadata } from "$lib/store";
import {
  siteUrl,
  title,
  blogTitle as subtitle,
  blogDescription as description,
  keywords,
  author,
  ogImageBlog
} from "$lib/config";

const pageNum = 1;
const pageSize = 10;

export async function load() {
  // Set the metadata
  metadata.setMetadata({
    title: `${title} | ${subtitle}`,
    description,
    keywords: keywords.join(", "),
    author,
    url: siteUrl,
    image: ogImageBlog,
  });

  // Fetch the posts dynamically
  const { posts, totalPages } = await fetchMarkdownPosts(pageNum, pageSize);

  return {
    props: {
      posts,
      pageNum,
      totalPages,
    },
  };
}

export const prerender = true;
