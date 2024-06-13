import { fetchMarkdownPosts } from "$lib/utils";

const pageNum = 1;
const pageSize = 10;

export async function load() {
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
