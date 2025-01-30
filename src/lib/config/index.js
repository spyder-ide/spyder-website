import { dev } from "$app/environment";
import { PUBLIC_SITE_URL } from '$env/static/public';
import { loadYamlSafely } from '$lib/utils/yaml';

// Configuration options in YAML
import rawConfig from "./config.yaml?raw";
import rawContributors from "./contributors.yaml?raw"
import rawReleases from "./releases.yaml?raw"
import rawFrontPage from "./frontpage.yaml?raw"

// Site config
export const siteUrl = dev ? "http://localhost:5173" : PUBLIC_SITE_URL;
export const ogImage = `${siteUrl}/assets/media/website_screenshot.png`;
export const ogImageBlog = `${siteUrl}/assets/media/blog_screenshot.png`;
export const blogPageStart = 1;
export const blogPageSize = 10;

// Load configurations
export const config = loadYamlSafely(rawConfig, 'config');
export const contributors = loadYamlSafely(rawContributors, 'contributors');
export const releases = loadYamlSafely(rawReleases, 'releases');
export const frontpage = loadYamlSafely(rawFrontPage, 'frontpage');
