import yaml from 'js-yaml';

import { dev } from "$app/environment";
import { base } from "$app/paths";
import { PUBLIC_SITE_URL } from '$env/static/public';

// Load default config for SSR
const defaultConfig = yaml.load(await import('./content.yaml?raw').then(m => m.default));

//////////////////////////////////////////////////////////////////
// Site config
//////////////////////////////////////////////////////////////////

// Non-translatable configs
export const siteUrl = dev ? "http://localhost:5173" : PUBLIC_SITE_URL;
export const ogImage = `${siteUrl}/assets/media/website_screenshot.png`;
export const ogImageBlog = `${siteUrl}/assets/media/blog_screenshot.png`;

// Export default values for SSR
export const title = defaultConfig.title;
export const subtitle = defaultConfig.subtitle;
export const description = defaultConfig.description;
export const keywords = defaultConfig.keywords;
export const author = defaultConfig.author;
export const comment = defaultConfig.comment;
export const blogTitle = defaultConfig.blogTitle;
export const blogDescription = defaultConfig.blogDescription;
export const blogSlug = defaultConfig.blogSlug;
export const ogSlug = defaultConfig.ogSlug;
export const blogPageStart = defaultConfig.blogPageStart;
export const blogPageSize = defaultConfig.blogPageSize;
export const blogPublishedOn = defaultConfig.blogPublishedOn;
export const blogReadMore = defaultConfig.blogReadMore;
export const blogError = defaultConfig.blogError;
export const blogMetadataError = defaultConfig.blogMetadataError;

// Navigation
export const navigation = defaultConfig.navigation.map(section =>
  section.map(item => ({
    ...item,
    href: item.href.startsWith('http') ? item.href : `${base}${item.href}`
  }))
);

// Social links
export const socials = {
  ...defaultConfig.socials,
  rss: `${base}/${blogSlug}/feed.xml`
};

// Hero content
export const heroContent = defaultConfig.heroContent;

// Images in hero
export const heroImages = {
  dark: `${base}${defaultConfig.heroImages.dark}`,
  light: `${base}${defaultConfig.heroImages.light}`,
};

// Github button
export const githubButton = defaultConfig.githubButton;

// Download links
export const releases = defaultConfig.releases;

// Footer
export const footerTitle = defaultConfig.footerTitle;
export const footerContent = defaultConfig.footerContent;
