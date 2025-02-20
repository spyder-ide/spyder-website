import type { ArticleMetadata, BaseMetadata, PageMetadata, WebsiteMetadata } from './types';
import { siteMetadata, sanitizeMetadata } from './config';

/**
 * Creates metadata for a regular website page
 */
export function createWebsiteMetadata(metadata: Partial<WebsiteMetadata>): WebsiteMetadata {
  return sanitizeMetadata({
    type: 'website',
    title: metadata.title || siteMetadata.title,
    description: metadata.description || siteMetadata.description,
    author: metadata.author || siteMetadata.author,
    keywords: metadata.keywords || siteMetadata.keywords,
    url: metadata.url || siteMetadata.siteUrl,
    image: metadata.image || siteMetadata.defaultImage,
    site: metadata.site || siteMetadata.siteName,
    locale: metadata.locale || siteMetadata.locale,
  });
}

/**
 * Creates metadata for a blog post or article
 */
export function createArticleMetadata(metadata: Partial<ArticleMetadata>): ArticleMetadata {
  const now = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format

  // Ensure image URL is absolute
  const image = metadata.image || siteMetadata.blog.ogImage;
  const absoluteImage = image.startsWith('http') ? image : `${siteMetadata.siteUrl}${image}`;

  // Ensure URL is absolute
  const url = metadata.url || siteMetadata.siteUrl;
  const absoluteUrl = url.startsWith('http') ? url : `${siteMetadata.siteUrl}${url}`;

  return sanitizeMetadata({
    type: 'article',
    title: metadata.title || siteMetadata.title,
    description: metadata.description || siteMetadata.description,
    author: metadata.author || siteMetadata.author,
    keywords: metadata.keywords || metadata.tags || siteMetadata.keywords,
    url: absoluteUrl,
    image: absoluteImage,
    site: metadata.site || siteMetadata.siteName,
    locale: metadata.locale || siteMetadata.locale,
    pub_date: metadata.pub_date || now,
    modified_date: metadata.modified_date,
    summary: metadata.summary || metadata.description || siteMetadata.description,
    tags: metadata.tags || [],
    category: metadata.category || 'Uncategorized',
    prism: metadata.prism || false
  });
}

/**
 * Extracts metadata from markdown frontmatter for blog posts
 */
export function extractMetadataFromFrontmatter(frontmatter: Record<string, any>): Partial<ArticleMetadata> {
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    summary: frontmatter.summary || frontmatter.description,
    author: frontmatter.author,
    pub_date: frontmatter.pub_date,
    modified_date: frontmatter.modified_date,
    tags: frontmatter.tags || [],
    category: frontmatter.category,
    image: frontmatter.image
  };
}

/**
 * Validates that required metadata fields are present
 */
export function validateMetadata(metadata: PageMetadata): boolean {
  const requiredFields: (keyof BaseMetadata)[] = ['title', 'description', 'url', 'image'];
  return requiredFields.every(field => Boolean(metadata[field]));
}
