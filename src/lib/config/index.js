import { dev } from "$app/environment";
import { PUBLIC_SITE_URL } from "$env/static/public";
import { loadYamlSafely } from "$lib/utils/yaml";

// Configuration options in YAML
import rawConfig from "./data/config.yaml?raw";
import rawContributors from "./data/contributors.yaml?raw";
import rawReleases from "./data/releases.yaml?raw";
import rawFrontPage from "./data/frontpage.yaml?raw";
import rawDonate from "./data/donate.yaml?raw";

// Site config
export const siteUrl = dev ? "http://localhost:5173" : PUBLIC_SITE_URL;
export const ogImage = `${siteUrl}/assets/media/website_screenshot.png`;
export const ogImageBlog = `${siteUrl}/assets/media/blog_screenshot.png`;
export const blogPageStart = 1;
export const blogPageSize = 10;

// Load configurations
export const config = loadYamlSafely(rawConfig, "config");
export const contributors = loadYamlSafely(rawContributors, "contributors");
export const releases = loadYamlSafely(rawReleases, "releases");
export const frontpage = loadYamlSafely(rawFrontPage, "frontpage");
export const donate = loadYamlSafely(rawDonate, "donate");
