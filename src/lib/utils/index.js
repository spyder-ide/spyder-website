import { browser } from "$app/environment";

// Determine if a variable has a value (even `false` or `0`)
export const hasValue = (a) => a !== undefined && a !== null;

// Fetch all blog posts, sorted by date, optionally paginated
export const fetchMarkdownPosts = async (pageNum, pageSize) => {
  // Load all posts
  const allPostFiles = import.meta.glob("/src/routes/blog/**/*.md", {
    eager: true,
  });

  // Convert the object into an array
  const allPosts = Object.entries(allPostFiles).map(([path, module]) => {
    // Convert the object into an array
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

  // If we don't provide a page number/page size, return the full list
  if (!hasValue(pageNum) || !hasValue(pageSize)) return sortedPosts;

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
  posts.sort((a, b) => new Date(b.meta.pub_date) - new Date(a.meta.pub_date));

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
      mac: ["mac"],
      windows: ["win"],
      linux: ["linux"],
    };
    for (const key in os) {
      if (os[key].some((value) => userAgent.includes(value))) {
        return key;
      }
    }
  }
};

export const getOSButtons = (base, os) => {
  let osButtons = [{}];
  let str = "";

  if (os === "windows") {
    str = "for Windows 10+";
  } else if (os === "linux") {
    str = "for Linux";
  } else if (os === "mac") {
    str = "for macOS";
    const m1 = "14.0+ (M1)";
    const intel = "12.0+ (Intel)";
    osButtons = [
      {
        highlight: true,
        icon: `${os}`,
        text: `Download ${str} ${m1}`,
        href: `${base}/download?os=${os}&arch=arm64`,
      },
      {
        highlight: true,
        icon: `${os}`,
        text: `Download ${str} ${intel}`,
        href: `${base}/download?os=${os}&arch=x64`,
      },
    ];
  }

  if (os === "windows" || os === "linux") {
    osButtons = [
      {
        highlight: true,
        icon: `${os}`,
        text: `Download ${str}`,
        href: `${base}/download?os=${os}&arch=x64`,
      },
    ];
  }

  return osButtons;
};

// Load an icon dynamically
export async function getIcon(iconName) {
  try {
    const module = await import("svelte-icons-pack/bs");
    return module[iconName];
  } catch (error) {
    console.error(`Failed to load icon: ${iconName}`, error);
    return null;
  }
}
