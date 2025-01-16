import { fetchMarkdownPosts } from "$lib/utils";
import { blogPageStart, blogPageSize } from "$lib/config";

const pageNum = blogPageStart;
const pageSize = blogPageSize;

// Fetch the posts dynamically
export async function load() {
  const { posts, totalPages } = await fetchMarkdownPosts(pageNum, pageSize);
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
