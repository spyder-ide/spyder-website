import { browser } from "$app/environment";

// Fetch all blog posts
export const fetchMarkdownPosts = async (pageNum, pageSize) => {
  // Load all posts
  const allPostFiles = import.meta.glob("/src/routes/blog/**/*.md", {
    eager: true,
  });

  // Convert the object into an array
  const iterablePostFiles = Object.entries(allPostFiles);

  // Create an array of posts
  const allPosts = iterablePostFiles.map(([path, module]) => {
    const { metadata } = module;

    // Format the path to get the slug
    const segments = path.split("/");
    segments.pop();
    const slug = segments.slice(-1).join("/");

    // Add the slug to the metadata and return it
    return {
      meta: metadata,
      path: slug,
    };
  });

  // Sort posts
  const sortedPosts = sortPostsByDate(allPosts);

  // Calculate start and end indices for the desired page
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;

  // Return the posts, pageNum, and totalPages
  const posts = sortedPosts.slice(start, end);
  const totalPages = Math.ceil(sortedPosts.length / pageSize);

  return {
    posts,
    pageNum,
    totalPages,
  };
};

// Format the date
export function formattedPubDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

// Fetch the author's metadata
export async function fetchAuthorMetadata(author) {
  try {
    const response = await fetch(`/assets/authors/${author}/metadata.json`);
    if (!response.ok) {
      throw new Error("Failed to load author metadata");
    }
    const metadata = await response.json();
    return {
      src: `/assets/authors/${author}/${metadata.image}`,
      name: metadata.name,
    };
  } catch (error) {
    console.error("Failed to load author metadata:", error);
    return null;
  }
}

// Sort posts by date
export const sortPostsByDate = (posts) =>
  posts.sort((a, b) => {
    return new Date(b.meta.pub_date) - new Date(a.meta.pub_date);
  });

// Generate random ID
export const randomId = (length) =>
  Math.random()
    .toString(length || 24)
    .replace(/[^a-z]+/g, "");

// Determine the operating system and return it
export const getOS = () => {
  if (browser) {
    const userAgent = navigator.userAgent.toLowerCase();
    const os = {
      mac: ["mac", "iphone", "ipad", "ipod"],
      windows: ["win"],
      linux: ["linux"],
    };
    for (const key in os) {
      if (os[key].some((value) => userAgent.includes(value))) {
        return key;
      }
    }
    return "unknown";
  }
};
