import fs from 'fs/promises';
import path from 'path';

/**
 * Server-only function to fetch author metadata from the filesystem
 * @param {string} author - Author identifier
 * @returns {Promise<{src: string, name: string}>} Author metadata
 */
export async function fetchAuthorMetadataFromServer(author) {
  try {
    const basePath = process.cwd();
    const filePath = path.join(basePath, 'static', 'assets', 'authors', author, 'metadata.json');
    
    const data = await fs.readFile(filePath, 'utf-8');
    const metadata = JSON.parse(data);
    
    return {
      src: `/assets/authors/${author}/${metadata.image}`,
      name: metadata.name,
    };
  } catch (error) {
    console.error(`Server-side author metadata loading error for ${author}:`, error);
    
    // Return fallback data
    return {
      src: `/assets/authors/${author}/profile.jpg`, // Default image name
      name: author // Use author ID as name
    };
  }
}

/**
 * Server-only function to fetch metadata for multiple authors
 * @param {string[]} authors - Array of author identifiers
 * @returns {Promise<Array<{src: string, name: string}>>} Array of author metadata
 */
export async function fetchAuthorsMetadataFromServer(authors) {
  if (!authors || !Array.isArray(authors)) {
    console.error("Invalid authors data:", authors);
    return [];
  }

  const metadataList = await Promise.all(
    authors.map((author) => fetchAuthorMetadataFromServer(author))
  );
  
  return metadataList;
} 