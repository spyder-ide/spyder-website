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

export const prerender = true;
