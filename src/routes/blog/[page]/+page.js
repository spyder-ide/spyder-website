import { fetchMarkdownPosts } from "$lib/utils";

let pageSize = 10;

export async function load({ params }) {
  const pageNum = parseInt(params.page, pageSize) || 1;
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
