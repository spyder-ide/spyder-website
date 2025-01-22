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
    // Get the metadata from the module
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
export function formattedPubDate(date, i18n = "en-US") {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(i18n, options);
}

// Fetch the author's metadata
export async function fetchAuthorMetadata(author, customFetch) {
  try {
    const response = await (customFetch || fetch)(
      `/assets/authors/${author}/metadata.json`,
    );
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

export async function fetchAuthorsMetadata(authors) {
  if (!authors || !Array.isArray(authors)) {
    console.error("Invalid authors data:", authors);
    return [];
  }

  const metadataList = await Promise.all(
    authors.map((author) => fetchAuthorMetadata(author)),
  );
  return metadataList;
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

// Process contributors lists
export const processContributors = (current, past, all) => {
  // Update current/past contributors from GitHub with custom data
  const updateContributor = (contributor, allContributors) => {
    const match = allContributors.find((c) => c.id === contributor.id);
    return match ? { ...match, ...contributor } : contributor;
  };

  const updatedCurrent = current.map((contributor) =>
    updateContributor(contributor, all)
  );
  const updatedPast = past.map((contributor) =>
    updateContributor(contributor, all)
  );

  // Get the remaining contributors that are not in the current/past lists
  const remainingContributors = all.filter(
    (contributor) =>
      !current.some((c) => c.id === contributor.id) &&
      !past.some((p) => p.id === contributor.id),
  );

  return {
    updatedCurrent,
    updatedPast,
    remainingContributors,
  };
};

// Get contributors object from GiHub
const dataURL =
  "https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100";
let githubToken;

if (import.meta.env.VITE_GITHUB_TOKEN) {
  githubToken = import.meta.env.VITE_GITHUB_TOKEN;
}

export const getContributors = async (
  customFetch = undefined,
  dataSrc = dataURL || "",
  token = githubToken || undefined,
  startPage = 1,
  maxPages = 3,
) => {
  let headers, response;
  let contributors = [];

  if (token) {
    headers = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }

  try {
    // Fetch the contributors data with authentication
    for (let n = startPage; n <= maxPages; n++) {
      if (!dataSrc) throw new Error(`There is no data source to fetch!`);
      if (headers) {
        response = await (customFetch || fetch)(`${dataSrc}&page=${n}`, {
          headers,
        });
      } else {
        response = await (customFetch || fetch)(`${dataSrc}&page=${n}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      contributors.push(...data);
    }

    return {
      contributors,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
    return {
      contributors: [],
      error: error.message,
    };
  }
};
