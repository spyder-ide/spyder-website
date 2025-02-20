import { dev } from "$app/environment";
import { PUBLIC_SITE_URL } from "$env/static/public";
import type { SiteMetadataConfig } from "./types";
import { config } from "$lib/config";
import { normalizeKeywords } from "./validation";

/**
 * Default site-wide metadata configuration
 */
export const siteMetadata: SiteMetadataConfig = {
  title: "Spyder IDE",
  description: "Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment",
  author: "Spyder Project Contributors",
  keywords: config.site.keywords || [],
  defaultImage: "/assets/og/default.png",
  siteUrl: dev ? "http://localhost:5173" : PUBLIC_SITE_URL,
  siteName: "Spyder IDE",
  locale: "en_US",
  blog: {
    title: "Welcome to Spyder's Blog",
    description: "Latest news and updates from the Spyder IDE team",
    ogImage: "/assets/og/blog.png",
    pageSize: 10
  },
  social: {
    twitter: config.site.socials?.twitter || "",
    github: config.site.socials?.github || "",
  }
};

/**
 * Creates a full URL for metadata images
 */
export function createMetadataImageUrl(imagePath: string): string {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${siteMetadata.siteUrl}${imagePath}`;
}

/**
 * Creates a full URL for metadata URLs
 */
export function createMetadataUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${siteMetadata.siteUrl}${url}`;
}

/**
 * Utility function to ensure metadata values are properly formatted
 */
export function sanitizeMetadata<T extends Record<string, any>>(metadata: T): T {
  return {
    ...metadata,
    url: metadata.url ? createMetadataUrl(metadata.url) : siteMetadata.siteUrl,
    image: metadata.image ? createMetadataImageUrl(metadata.image) : createMetadataImageUrl(siteMetadata.defaultImage),
    keywords: normalizeKeywords(metadata.keywords),
    locale: metadata.locale || siteMetadata.locale,
    site: metadata.site || siteMetadata.siteName,
  };
}
