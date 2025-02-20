/**
 * Base metadata interface that all pages must implement
 */
export interface BaseMetadata {
  title: string;
  description: string;
  author: string;
  keywords: string | string[];
  url: string;
  image: string;
  site?: string;
  locale?: string;
  summary?: string;
}

/**
 * Article-specific metadata for blog posts
 */
export interface ArticleMetadata extends BaseMetadata {
  type: 'article';
  pub_date: string;           // YYYY-MM-DD format
  summary: string;            // Required for blog posts
  tags: string | string[];    // Can be either string or array
  category: string;           // Single category
  modified_date?: string;     // Optional, YYYY-MM-DD format
  prism?: boolean;           // Whether to load Prism syntax highlighting
}

/**
 * Website page metadata for non-article pages
 */
export interface WebsiteMetadata extends BaseMetadata {
  type: 'website';
}

/**
 * Union type for all possible metadata types
 */
export type PageMetadata = ArticleMetadata | WebsiteMetadata;

/**
 * Blog-specific configuration
 */
export interface BlogConfig {
  title: string;
  description: string;
  ogImage: string;
  pageSize: number;
}

/**
 * Configuration for site-wide metadata defaults
 */
export interface SiteMetadataConfig {
  title: string;
  description: string;
  author: string;
  keywords: string[];
  defaultImage: string;
  siteUrl: string;
  siteName: string;
  locale: string;
  blog: BlogConfig;
  social: {
    twitter?: string;
    github?: string;
    facebook?: string;
  };
}
