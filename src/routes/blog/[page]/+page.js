import { fetchMarkdownPosts } from "$lib/utils";
import { metadata } from "$lib/store";
import {
  siteUrl,
  title,
  blogTitle as subtitle,
  blogDescription as description,
  keywords,
  author,
  ogImageBlog,
  blogPageStart,
  blogPageSize
} from "$lib/config";

let pageSize = blogPageSize;

export async function load({ params }) {
  // Set the metadata
  metadata.setMetadata({
    title: `${title} | ${subtitle}`,
    description,
    keywords: keywords.join(", "),
    author,
    url: siteUrl,
    image: ogImageBlog,
  });

  const pageNum = parseInt(params.page, pageSize) || blogPageStart;
  const { posts, totalPages } = await fetchMarkdownPosts(pageNum, pageSize);

  // Fetch the posts dynamically
  return {
    props: {
      posts,
      pageNum,
      totalPages,
    },
  };
}

export async function entries() {
  // Generate a static route for each blog page (/blog/1, /blog/2, etc.)
  const { _, totalPages } = await fetchMarkdownPosts(1, pageSize);
  const entries = Array.from({ length: totalPages }, (_, i) => ({
    page: `${i + 1}`,
  }));

  return entries;
}

export const prerender = true;
