import { browser } from "$app/environment";
import { blogPageSize, blogPageStart, releases } from "$lib/config";

const dataURL =
  "https://api.github.com/repos/spyder-ide/spyder/contributors?per_page=100";

// Only try to access env vars in browser or during SSR, not during build
const getGitHubToken = () => {
  try {
    return import.meta.env.VITE_GITHUB_TOKEN;
  } catch (e) {
    return undefined;
  }
};

// Ensure headers are always set if token is available
const getGitHubHeaders = () => {
  const token = getGitHubToken();
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };
  }
  return undefined;
};

/**
 * Determines if a variable has a value (even `false` or `0`)
 * @param {*} variable - The value to check
 * @returns {boolean} True if the value is neither undefined nor null
 */
export const hasValue = (variable) =>
  variable !== undefined && variable !== null;

/**
 * Fetches all blog posts, optionally paginated and sorted by date
 * @param {number} [pageNum] - The page number for pagination
 * @param {number} [pageSize] - Number of posts per page
 * @returns {Promise<Array<{meta: object, path: string}>|{posts: Array<{meta: object, path: string}>, pageNum: number, totalPages: number}>}
 */
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

/**
 * Formats a date string according to locale
 * @param {string|Date} date - The date to format
 * @param {string} [i18n="en-US"] - The locale identifier
 * @returns {string} Formatted date string
 */
export function formattedPubDate(date, i18n = "en-US") {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(i18n, options);
}

/**
 * Fetches metadata for a single author
 * @param {string} author - Author identifier
 * @param {Function} [customFetch] - Optional custom fetch function for testing
 * @returns {Promise<{src: string, name: string}|null>} Author metadata or null if fetch fails
 */
export async function fetchAuthorMetadata(author, customFetch) {
  try {
    // In the browser, use fetch
    const response = await (customFetch || fetch)(
      `/assets/authors/${author}/metadata.json`
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

/**
 * Fetches metadata for multiple authors
 * @param {string[]} authors - Array of author identifiers
 * @returns {Promise<Array<{src: string, name: string}|null>>} Array of author metadata
 */
export async function fetchAuthorsMetadata(authors) {
  if (!authors || !Array.isArray(authors)) {
    console.error("Invalid authors data:", authors);
    return [];
  }

  const metadataList = await Promise.all(
    authors.map((author) => fetchAuthorMetadata(author))
  );
  return metadataList.filter(Boolean); // Remove null entries
}

/**
 * Sorts posts by publication date in descending order
 * @param {Array<{meta: {pub_date: string|Date}}>} posts - Array of post objects
 * @returns {Array<{meta: {pub_date: string|Date}}>} Sorted posts array
 */
export const sortPostsByDate = (posts) =>
  posts.sort((a, b) => new Date(b.meta.pub_date) - new Date(a.meta.pub_date));

/**
 * Generates a random ID string
 * @param {number} [length=24] - Length of the ID to generate
 * @returns {string} Random ID string
 */
export const randomId = (length) =>
  Math.random()
    .toString(length || 24)
    .replace(/[^a-z]+/g, "");

/**
 * Determines the user's operating system from browser user agent
 * @returns {('mac'|'windows'|'linux')} Operating system identifier, defaults to 'windows' if unknown
 */
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
  return "windows";
};

/**
 * Gets the download buttons configuration for a specific operating system
 * @param {string} base - Base URL for download links
 * @param {('mac'|'windows'|'linux')} os - Operating system identifier
 * @returns {Array<{highlight: boolean, icon: string, version: string, href: string}>} Array of button configurations
 * @description Generates download button configurations based on OS and processor architecture.
 * For macOS, generates buttons for both ARM64 and x64 architectures. For Windows and Linux,
 * generates a single x64 button.
 */
export const getOSButtons = (base, os) => {
  let osButtons = [];
  let processorFamily = [];

  if (os === "mac") {
    processorFamily = ["arm64", "x64"];
  } else {
    processorFamily = ["x64"];
  }

  processorFamily.forEach((arch) => {
    osButtons.push({
      highlight: true,
      icon: `${os}`,
      text: releases[os][arch].name,
      href: `${base}/download?os=${os}&arch=${arch}`,
    });
  });

  return osButtons;
};

/**
 * Dynamically loads an icon from svelte-icons-pack
 * @param {string} iconName - Name of the icon to load
 * @returns {Promise<object|null>} Icon component or null if loading fails
 */
export async function getIcon(iconName) {
  try {
    const moduleLoader = iconThemes[iconTheme];
    if (!moduleLoader) {
      throw new Error(`Unknown icon theme: ${iconTheme}`);
    }
    const module = await moduleLoader();
    return module[iconName];
  } catch (error) {
    console.error(
      `Failed to load icon: ${iconName} from theme: ${iconTheme}`,
      error
    );
    return null;
  }
}

/**
 * Processes and merges different contributor lists
 * @param {Array<{id: string|number}>} current - Current contributors
 * @param {Array<{id: string|number}>} past - Past contributors
 * @param {Array<{id: string|number}>} all - All contributors
 * @returns {{updatedCurrent: Array<object>, updatedPast: Array<object>, remainingContributors: Array<object>}}
 */
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
      !past.some((p) => p.id === contributor.id)
  );

  return {
    updatedCurrent,
    updatedPast,
    remainingContributors,
  };
};

/**
 * Fetches contributors data from GitHub API
 * @param {Function} [customFetch] - Optional custom fetch function
 * @param {string} [dataSrc] - GitHub API URL
 * @param {string} [token] - GitHub authentication token
 * @param {number} [startPage=1] - Starting page number
 * @param {number} [maxPages=3] - Maximum number of pages to fetch
 * @returns {Promise<{contributors: Array<object>, loading?: boolean, error: string|null}>}
 */
export const getContributors = async (
  customFetch = undefined,
  dataSrc = dataURL || "",
  token = getGitHubToken() || undefined,
  startPage = 1,
  maxPages = 3
) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      }
    : getGitHubHeaders();

  let contributors = [];

  try {
    // Fetch the contributors data with authentication
    for (let n = startPage; n <= maxPages; n++) {
      if (!dataSrc) throw new Error(`There is no data source to fetch!`);
      const url = `${dataSrc}&page=${n}`;

      const response = await (customFetch || fetch)(
        url,
        headers ? { headers } : undefined
      );

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

/**
 * Creates a map of contributors by their ID
 * @param {Array} contributors - Array of contributor objects
 * @returns {Map} Map of contributors with ID as key
 */
export const createContributorsMap = (contributors) => {
  const map = new Map();
  contributors.forEach((element) => map.set(element.id, element));
  return map;
};

/**
 * Merges contributor data with translations
 * @param {Array} rawContributors - Raw contributor data
 * @param {Map} translationsMap - Map of translated contributor data
 * @returns {Array} Merged contributor data
 */
export const mergeContributorData = (rawContributors, translationsMap) => {
  return rawContributors.map((element) => ({
    ...element,
    ...translationsMap.get(element.id),
  }));
};

/**
 * Shared loader function for blog pages
 * @param {number} [page] - Page number to load (optional)
 * @returns {Promise<{props: {posts: Array, pageNum: number, totalPages: number}}>}
 */
export async function loadBlogPage(page = blogPageStart) {
  const pageSize = blogPageSize;
  const { posts, totalPages } = await fetchMarkdownPosts(page, pageSize);

  return {
    props: {
      posts,
      pageNum: page,
      totalPages,
    },
  };
}

/**
 * Generate static routes for blog pages
 * @returns {Promise<Array<{page: string}>>}
 */
export async function generateBlogEntries() {
  const { _, totalPages } = await fetchMarkdownPosts(1, blogPageSize);
  return Array.from({ length: totalPages }, (_, i) => ({ page: `${i + 1}` }));
}

/**
 * Gets the correct image URL for a blog post image regardless of trailing slash configuration
 * @param {string} slug - The blog post slug
 * @param {string} imagePath - The relative image path (e.g., "./image.png" or "image.png")
 * @returns {string} The properly formatted image URL
 */
export function getBlogImageUrl(slug, imagePath) {
  if (!slug || !imagePath) return "";

  // Handle absolute URLs (http://, https://, etc.)
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Handle absolute paths
  if (imagePath.startsWith("/")) {
    return imagePath;
  }

  // Handle relative paths with or without leading ./
  const cleanPath = imagePath.startsWith("./") ? imagePath.slice(2) : imagePath;

  // Create an absolute path that works with trailingSlash 'never'
  return `/blog/${slug}/${cleanPath}`;
}

/**
 * Converts HSL color values to RGB
 * @param {number} h - Hue value in degrees (0-360)
 * @param {number} s - Saturation value in percentage (0-100)
 * @param {number} l - Lightness value in percentage (0-100)
 * @returns {number[]} Array of RGB values [r, g, b] where each value is 0-255
 */
export function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return [f(0), f(8), f(4)];
}

/**
 * Color Harmony System
 *
 * This approach creates visually appealing color combinations using
 * established color harmony principles from color theory:
 *
 * - Complementary: Colors opposite on the color wheel (high contrast)
 * - Analogous: Colors adjacent on the color wheel (harmonious)
 * - Triadic: Three colors evenly spaced on the color wheel (balanced)
 * - Split-Complementary: Base color + two colors adjacent to its complement (dynamic but harmonious)
 *
 * For each harmony type, we also adjust the line count and stroke weight
 * to create visually distinct patterns that complement the colors.
 */
// Generate a color palette based on color harmony
export const createHarmoniousPalette = () => {
  // Start with a random hue
  const baseHue = Math.floor(Math.random() * 360);

  // Create color harmonies (options: complementary, analogous, triadic, etc.)
  const harmonies = {
    complementary: [(baseHue + 180) % 360],
    analogous: [(baseHue + 30) % 360, (baseHue - 30 + 360) % 360],
    triadic: [(baseHue + 120) % 360, (baseHue + 240) % 360],
    split: [(baseHue + 150) % 360, (baseHue + 210) % 360],
  };

  // Pick a random harmony type
  const harmonyTypes = Object.keys(harmonies);
  const selectedHarmony =
    harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)];
  const harmonyHues = [baseHue, ...harmonies[selectedHarmony]];

  // Generate color objects with varied saturations and lightnesses
  const baseColor = {
    hue: baseHue,
    saturation: 70 + Math.floor(Math.random() * 30),
    lightness: 45 + Math.floor(Math.random() * 15),
  };

  // For light mode: lighter background, darker accent
  const lightBg = hslToRgb(baseColor.hue, baseColor.saturation * 0.3, 90);
  const lightFgHue = harmonyHues[1] || harmonyHues[0];
  const lightFg = hslToRgb(lightFgHue, baseColor.saturation, 35);

  // For dark mode: deeper background, brighter accent
  const darkBg = hslToRgb(baseColor.hue, baseColor.saturation * 0.8, 15);
  const darkFgHue = harmonyHues[1] || harmonyHues[0];
  const darkFg = hslToRgb(darkFgHue, baseColor.saturation, 65);

  // Create a uniqueness factor for this palette - adjust line count and stroke weight
  // based on the harmony type to get varied effects
  let lineCount = 5;
  let strokeWeight = 1;

  switch (selectedHarmony) {
    case "complementary":
      lineCount = 7 + Math.floor(Math.random() * 5); // 7-11 lines
      strokeWeight = 1.5;
      break;
    case "analogous":
      lineCount = 10 + Math.floor(Math.random() * 5); // 10-14 lines
      strokeWeight = 1;
      break;
    case "triadic":
      lineCount = 4 + Math.floor(Math.random() * 3); // 4-6 lines
      strokeWeight = 2;
      break;
    case "split":
      lineCount = 6 + Math.floor(Math.random() * 4); // 6-9 lines
      strokeWeight = 1.2;
      break;
  }

  // Return in the format expected by the component
  return {
    bgColors: {
      light: lightBg,
      dark: darkBg,
    },
    fgColors: {
      light: lightFg,
      dark: darkFg,
    },
    effectParams: {
      linesCount: lineCount,
      stroke: strokeWeight,
      // Randomize stroke alpha for additional variability
      strokeAlpha: 60 + Math.floor(Math.random() * 40), // 60-100
    },
    type: selectedHarmony, // for debugging/info
  };
};
