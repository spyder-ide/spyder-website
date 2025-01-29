import { dev } from "$app/environment";
import { PUBLIC_SITE_URL } from '$env/static/public';
import yaml from 'js-yaml';
import rawConfig from "./config.yaml?raw";

//////////////////////////////////////////////////////////////////
// Site config
//////////////////////////////////////////////////////////////////

export const siteUrl = dev ? "http://localhost:5173" : PUBLIC_SITE_URL;
export const ogImage = `${siteUrl}/assets/media/website_screenshot.png`;
export const ogImageBlog = `${siteUrl}/assets/media/blog_screenshot.png`;
export const blogPageStart = 1;
export const blogPageSize = 10;
export const config = yaml.load(rawConfig);
