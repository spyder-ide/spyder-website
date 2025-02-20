import type { ArticleMetadata, PageMetadata } from './types';

/**
 * Validates a date string is in YYYY-MM-DD format
 */
export function isValidDateFormat(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

/**
 * Ensures tags are in a consistent array format
 */
export function normalizeTags(tags: string | string[] | undefined): string[] {
  if (!tags) return [];
  if (typeof tags === 'string') {
    // Split by comma and trim whitespace
    return tags.split(',').map(tag => tag.trim()).filter(Boolean);
  }
  return tags;
}

/**
 * Ensures keywords are in a consistent array format
 */
export function normalizeKeywords(keywords: string | string[] | undefined): string[] {
  return normalizeTags(keywords); // Same logic as tags
}

/**
 * Validates article metadata
 * @throws {Error} if validation fails
 */
export function validateArticleMetadata(metadata: Partial<ArticleMetadata>): void {
  const requiredFields: (keyof ArticleMetadata)[] = [
    'title',
    'description',
    'author',
    'pub_date',
    'summary',
    'category'
  ];

  // Check required fields
  for (const field of requiredFields) {
    if (!metadata[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate date formats
  if (metadata.pub_date && !isValidDateFormat(metadata.pub_date)) {
    throw new Error('Invalid pub_date format. Expected YYYY-MM-DD');
  }

  if (metadata.modified_date && !isValidDateFormat(metadata.modified_date)) {
    throw new Error('Invalid modified_date format. Expected YYYY-MM-DD');
  }

  // Validate URL if present
  if (metadata.url) {
    try {
      new URL(metadata.url);
    } catch {
      throw new Error('Invalid URL format');
    }
  }
}

/**
 * Type guard to check if metadata is ArticleMetadata
 */
export function isArticleMetadata(metadata: PageMetadata): metadata is ArticleMetadata {
  return metadata.type === 'article';
}

/**
 * Formats a date string to a human-readable format
 */
export function formatDate(date: string): string {
  if (!isValidDateFormat(date)) {
    throw new Error('Invalid date format. Expected YYYY-MM-DD');
  }
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Creates a URL-friendly slug from a string
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Ensures all metadata URLs are absolute
 */
export function ensureAbsoluteUrls(metadata: PageMetadata, baseUrl: string): PageMetadata {
  const ensureAbsolute = (url: string) => {
    if (!url) return url;
    try {
      return new URL(url, baseUrl).toString();
    } catch {
      return url;
    }
  };

  return {
    ...metadata,
    url: ensureAbsolute(metadata.url),
    image: ensureAbsolute(metadata.image)
  };
}