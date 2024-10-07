import path from 'path';
import matter from 'gray-matter';
import { promises as fs } from 'fs';

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
  return posts.sort((a, b) => new Date(b.meta.pub_date) - new Date(a.meta.pub_date));
}

/**
 * Format publication date.
 * @param {string} date - Date in ISO or recognizable format.
 * @returns {string} - Formatted date in "Month Day, Year".
 */
export function formattedPubDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Fetch author metadata.
 * @param {string} author - Author's name.
 * @returns {Promise<Object>} - Object containing author information.
 */
export async function fetchAuthorMetadata(author) {
  try {
    const metadataPath = path.join(process.cwd(), 'static', 'assets', 'authors', author, 'metadata.json');
    const metadataContent = await fs.readFile(metadataPath, 'utf-8');
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
 * Fetch all Markdown posts with their metadata.
 * @returns {Promise<Array>} - Array of post objects.
 */
export async function fetchMarkdownPostsMetadata() {
  const postsDir = path.join(process.cwd(), 'src', 'routes', 'blog');
  const markdownFiles = await getFilesRecursively(postsDir, '.md');

  const allPosts = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data: metadata, content } = matter(fileContent);

      if (!metadata.title || !metadata.author || !metadata.pub_date) {
        throw new Error(`File ${filePath} is missing required metadata.`);
      }

      // Extract the name of the post directory (slug)
      const slug = path.basename(path.dirname(filePath));

      return {
        meta: metadata,
        path: `/blog/${slug}`,
        //content, // we don't need the content of the posts for this
      };
    })
  );

  // Sort posts by publication date descending
  const sortedPosts = sortPostsByDate(allPosts);

  return sortedPosts;
}
