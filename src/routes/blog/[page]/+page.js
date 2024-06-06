import { fetchMarkdownPosts } from "$lib/utils";

export async function load({ params }) {
  const pageNum = parseInt(params.page, 10) || 1;
  const pageSize = 10;

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

export const prerender = true;
