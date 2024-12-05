// Imports
import { dev } from "$app/environment";
import { base } from "$app/paths";
import { PUBLIC_SITE_URL } from '$env/static/public';
import yaml from 'js-yaml';
import content from './content.yaml?raw';

// Load configuration from YAML
const config = yaml.load(content);

//////////////////////////////////////////////////////////////////
// Site config
//////////////////////////////////////////////////////////////////

// Base URL
export const siteUrl = dev ? "http://localhost:5173" : PUBLIC_SITE_URL;

// Website metadata
export const title = config.title;
export const subtitle = config.subtitle;
export const comment = config.comment;
export const author = config.author;
export const description = config.description;
export const ogImage = `${siteUrl}assets/media/website_screenshot.png`;
export const keywords = config.keywords;

// Blog metadata
export const blogTitle = config.blogTitle;
export const blogDescription = config.blogDescription;
export const blogSlug = config.blogSlug;
export const ogSlug = config.ogSlug;
export const blogPageStart = config.blogPageStart;
export const blogPageSize = config.blogPageSize;
export const ogImageBlog = `${siteUrl}assets/media/blog_screenshot.png`;

// Navigation
export const navigation = config.navigation.map(section =>
  section.map(item => ({
    ...item,
    href: item.href.startsWith('http') ? item.href : `${base}${item.href}`
  }))
);

// Social links (for footer and others)
export const socials = {
  ...config.socials,
  rss: `${base}/${blogSlug}/feed.xml`
};

// Hero content
export const heroContent = config.heroContent;

// Images in hero
export const heroImages = {
  dark: `${base}${config.heroImages.dark}`,
  light: `${base}${config.heroImages.light}`,
};

// Github button
export const githubButton = config.githubButton;

// Download links
export const releases = config.releases;

// Footer title and content
export const footerTitle = config.footerTitle;
export const footerContent = config.footerContent;
