import path from "path";
import matter from "gray-matter";
import { promises as fs } from "fs";

/**
 * Determines if a given string's length is less than or equal to a specified quantity.
 * @param {string} text - The string to evaluate.
 * @param {number} qty - The length to compare against.
 * @returns {boolean} - Returns true if the string's length is less than or equal to the specified quantity, otherwise false.
 */
export function testLength(text, qty) {
  return text.length <= qty;
}

/**
 * Checks if a given path exists.
 * @param {string} pathToCheck - Path to verify.
 * @returns {Promise<boolean>} - True if exists, false otherwise.
 */
export async function exists(pathToCheck) {
  try {
    await fs.access(pathToCheck, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Async function to recursively get all files with a specific extension.
 * @param {string} dir - Directory to start searching from.
 * @param {string} ext - File extension to search for (e.g., '.md').
 * @returns {Promise<string[]>} - Array of file paths.
 */
export async function getFilesRecursively(dir, ext) {
  let files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nestedFiles = await getFilesRecursively(fullPath, ext);
      files = files.concat(nestedFiles);
    } else if (path.extname(entry.name).toLowerCase() === ext) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Sort posts by publication date in descending order.
 * @param {Array} posts - Array of post objects.
 * @returns {Array} - Sorted array of posts.
 */
export function sortPostsByDate(posts) {
  return posts.sort((a, b) =>
    new Date(b.meta.pub_date) - new Date(a.meta.pub_date)
  );
}

/**
 * Format publication date.
 * @param {string} date - Date in ISO or recognizable format.
 * @returns {string} - Formatted date in "Month Day, Year".
 */
export function formattedPubDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

/**
 * Fetch author metadata.
 * @param {string} author - Author's name.
 * @returns {Promise<Object>} - Object containing author information.
 */
export async function fetchAuthorMetadata(author) {
  try {
    const metadataPath = path.join(
      process.cwd(),
      "static",
      "assets",
      "authors",
      author,
      "metadata.json",
    );
    const metadataContent = await fs.readFile(metadataPath, "utf-8");
    const metadata = JSON.parse(metadataContent);

    return {
      src: `/assets/authors/${author}/${metadata.image}`,
      name: metadata.name,
    };
  } catch (error) {
    console.error(`Failed to load metadata for author "${author}":`, error);
    return null;
  }
}

/**
 * Fetches metadata for multiple authors.
 * @param {Array<string>} authors - An array of authors' names.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects containing authors' information.
 */
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

/**
 * Fetch all Markdown posts with their metadata.
 * @returns {Promise<Array>} - Array of post objects.
 */
export async function fetchMarkdownPostsMetadata() {
  const postsDir = path.join(process.cwd(), "src", "routes", "blog");
  const markdownFiles = await getFilesRecursively(postsDir, ".md");

  const allPosts = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, "utf-8");

      // We discard the content and keep the metadata
      const { data: metadata, _ } = matter(fileContent);

      if (!metadata.title || !metadata.author || !metadata.pub_date) {
        throw new Error(`File ${filePath} is missing required metadata.`);
      }

      // Extract the name of the post directory (slug)
      const slug = path.basename(path.dirname(filePath));

      // Return metadata and post path
      return {
        meta: metadata,
        path: `/blog/${slug}`,
      };
    }),
  );

  // Sort posts by publication date descending
  const sortedPosts = sortPostsByDate(allPosts);

  return sortedPosts;
}
