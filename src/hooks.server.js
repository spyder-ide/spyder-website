import { building } from "$app/environment";
import { normalizeLocale } from "$lib/i18n";
import { injectMetaTags } from "$lib/server/metaTagsInjector";
import { createReadStream, existsSync, readdirSync } from "fs";
import { join } from "path";
import { locale } from "svelte-i18n";

/**
 * Configuration for the server hooks
 * @typedef {Object} ServerConfig
 * @property {boolean} logging - Whether to enable debug logging
 * @property {string[]} mediaExtensions - File extensions to consider as media files
 * @property {string[]} ignoredBlogDirs - Blog directories to ignore when scanning
 * @property {string[]} socialCrawlers - User agent strings for social media crawlers
 */

/** @type {ServerConfig} */
const CONFIG = {
  logging: false,
  mediaExtensions: [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "svg",
    "webp",
    "webm",
    "mp4",
    "ogv",
    "mp3",
    "ogg",
  ],
  ignoredBlogDirs: ["[page]", "feed.xml"],
  socialCrawlers: ["Twitterbot", "facebookexternalhit", "LinkedInBot"],
};

/**
 * Creates a media file regex pattern for matching URLs
 * @returns {RegExp} A regex pattern for matching media file extensions
 */
function getMediaFilePattern() {
  return new RegExp(`\\.(${CONFIG.mediaExtensions.join("|")})$`, "i");
}

/**
 * Debug logger that only logs when logging is enabled
 * @param {...any} args - Arguments to pass to console.log
 */
function debugLog(...args) {
  if (CONFIG.logging) {
    console.log(...args);
  }
}

/**
 * Gets the path to the blog directory
 * @returns {string} The absolute path to the blog directory
 */
function getBlogDirectoryPath() {
  return join(process.cwd(), "src", "routes", "blog");
}

/**
 * Gets a list of blog post directories
 * @returns {string[]} List of blog post directory names
 */
function getBlogPosts() {
  try {
    const blogDir = getBlogDirectoryPath();
    return readdirSync(blogDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => !CONFIG.ignoredBlogDirs.includes(dirent.name))
      .map((dirent) => dirent.name);
  } catch (error) {
    console.error("❌ Error reading blog directory:", error);
    return [];
  }
}

/**
 * Extract and normalize path segments from a URL pathname
 * @param {string} pathname - The URL pathname
 * @returns {string[]} Array of path segments
 */
function getPathSegments(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  // Normalize path segments (remove trailing slashes)
  if (segments.length > 1 && segments[1].endsWith("/")) {
    segments[1] = segments[1].slice(0, -1);
  }

  return segments;
}

/**
 * Checks if the URL is for a blog pagination route
 * @param {string[]} pathSegments - The URL path segments
 * @returns {boolean} Whether the URL is for a pagination route
 */
function isPaginationRoute(pathSegments) {
  return (
    // Check for /blog/* pattern (wildcard route)
    (pathSegments.length === 2 && pathSegments[1] === "*") ||
    // Check for /blog/1, /blog/2, etc. (pagination routes)
    (pathSegments.length === 2 && !isNaN(parseInt(pathSegments[1])))
  );
}

/**
 * Handle image requests in development mode
 * @param {URL} url The request URL
 * @returns {Promise<Response|undefined>} A response with the image or undefined if not found
 */
async function handleImageRequest(url) {
  // Extract the path parts and get the full pathname
  const pathname = url.pathname;
  const pathParts = getPathSegments(pathname);

  debugLog("🔍 Image request for:", pathname);
  debugLog("📊 Path parts:", JSON.stringify(pathParts));

  // Early return if we don't have enough path parts
  if (pathParts.length < 2) {
    debugLog("⚠️ Not enough path parts, skipping image handler");
    return;
  }

  // Extract the image filename
  const imageFileName = pathParts[pathParts.length - 1];
  debugLog("🖼️ Image filename:", imageFileName);

  // Initialize the possible paths array
  const possiblePaths = [];

  // Case 1: Standard URL format - /blog/[slug]/[image.png]
  if (pathParts.length >= 3 && pathParts[0] === "blog") {
    const slug = pathParts[1];
    debugLog("🎯 Using slug", slug, "for image search");

    // Check in source directory
    const primaryPath = join(getBlogDirectoryPath(), slug, imageFileName);
    possiblePaths.push(primaryPath);

    // Check in build output locations (added to be compatible with our Vite plugins)
    possiblePaths.push(
      join(process.cwd(), "build", "blog", slug, imageFileName)
    );
    possiblePaths.push(
      join(
        process.cwd(),
        ".svelte-kit",
        "output",
        "client",
        "blog",
        slug,
        imageFileName
      )
    );

    debugLog("🎯 Primary path:", primaryPath);

    // In case the image wasn't found with slug prefix, try as a global image
    possiblePaths.push(join(getBlogDirectoryPath(), imageFileName));
  }
  // Case 2: Direct URL format - /blog/[image.png]
  else if (pathParts.length === 2 && pathParts[0] === "blog") {
    debugLog("🚀 Direct URL format detected:", pathname);

    // First try to determine which blog post the request is for
    // Extract referrer to see if it contains a blog slug
    const referrer = url.headers?.get("referer");
    let refererSlug = null;

    if (referrer) {
      const refererUrl = new URL(referrer);
      const refererPathParts = getPathSegments(refererUrl.pathname);
      if (refererPathParts.length >= 2 && refererPathParts[0] === "blog") {
        refererSlug = refererPathParts[1];
        debugLog("🎯 Found slug from referrer:", refererSlug);

        // Try the referrer slug first
        const slugPath = join(
          getBlogDirectoryPath(),
          refererSlug,
          imageFileName
        );
        possiblePaths.push(slugPath);
        debugLog("🔍 Checking referrer path:", slugPath);
      }
    }

    // Check all blog post directories as a fallback
    const blogDir = getBlogDirectoryPath();
    const blogPosts = getBlogPosts();

    debugLog("📚 Found blog posts:", blogPosts.join(", "));

    // For each blog post directory, check if it contains the requested image
    for (const blogPost of blogPosts) {
      // Skip if this is the referrer slug we already checked
      if (blogPost === refererSlug) continue;

      const potentialPath = join(blogDir, blogPost, imageFileName);
      debugLog("🔍 Checking in blog post:", blogPost);
      if (existsSync(potentialPath)) {
        debugLog("✅ Found image in blog post directory:", blogPost);
        possiblePaths.push(potentialPath);
        break; // Stop after finding the first match
      }
    }

    // Fallback - try in the base blog directory
    possiblePaths.push(join(blogDir, imageFileName));
  }

  // Add fallback paths
  possiblePaths.push(
    join(process.cwd(), "static", pathname),
    join(process.cwd(), "static", "blog", imageFileName)
  );

  // Try all possible paths
  debugLog("🔎 Trying", possiblePaths.length, "possible paths...");
  for (const imagePath of possiblePaths) {
    debugLog("🔍 Checking path:", imagePath);
    if (existsSync(imagePath)) {
      debugLog("✅ Found image at:", imagePath);
      const stream = createReadStream(imagePath);
      return new Response(stream);
    }
  }

  debugLog("❌ No image found for:", pathname);
  debugLog(
    "💡 Tip: Make sure the image file exists in the correct blog post directory."
  );
  return;
}

/**
 * Transforms HTML content to fix image URLs in development mode
 * This is a fallback for images that might not be caught by the mdsvex plugin
 * @param {string} html The HTML content to transform
 * @param {URL} url The request URL
 * @returns {string} The transformed HTML
 */
function transformImageUrls(html, url) {
  // Only process blog posts
  const pathParts = getPathSegments(url.pathname);
  if (pathParts.length < 2 || pathParts[0] !== "blog") {
    debugLog("⏭️ Not a blog post, skipping image URL transformation");
    return html;
  }

  const slug = pathParts[1];
  debugLog("🔄 Transforming image URLs in HTML for slug:", slug);

  // Debug: Check if any IMG tags exist
  const imgTagCount = (html.match(/<img[^>]*>/gi) || []).length;
  debugLog(`📊 Found ${imgTagCount} total image tags in HTML`);

  // Use regex to find <img> tags with relative paths
  const result = html.replace(
    /<img\s+([^>]*)src="([^"]+)"([^>]*)>/gi,
    (match, beforeSrc, src, afterSrc) => {
      // Debug: Log all found image sources
      debugLog("🔍 Found image with src:", src);

      // Skip external URLs and already prefixed paths
      if (
        src.startsWith("http") ||
        src.startsWith("/blog/") ||
        src.startsWith("/assets/")
      ) {
        debugLog("⏭️ Skipping prefixed or external image:", src);
        return match;
      }

      // Clean the path
      const cleanPath = src.startsWith("./") ? src.slice(2) : src;

      // Create the new src with blog slug
      const newSrc = `/blog/${slug}/${cleanPath}`;

      debugLog("🔄 Transforming HTML image:", src, "->", newSrc);
      return `<img ${beforeSrc}src="${newSrc}"${afterSrc}>`;
    }
  );

  // Debug: Check if any transformations were made
  if (result === html) {
    debugLog("⚠️ No image transformations were applied to HTML");
  } else {
    debugLog("✅ HTML was transformed with new image paths");
  }

  return result;
}

/**
 * Checks if a request is from a social media crawler
 * @param {Request} request - The original request
 * @returns {boolean} Whether the request is from a social media crawler
 */
function isSocialCrawler(request) {
  const userAgent = request.headers.get("user-agent") || "";
  return CONFIG.socialCrawlers.some((crawler) => userAgent.includes(crawler));
}

/**
 * Process HTML responses for social media crawlers or during prerendering
 * @param {Request} request The original request
 * @param {Response} response The response to process
 * @param {URL} url The request URL
 * @returns {Response} The processed response
 */
async function transformHtml(request, response, url) {
  const isSocialMediaCrawler = isSocialCrawler(request);

  // Skip pagination routes
  const pathSegments = getPathSegments(url.pathname);
  if (isPaginationRoute(pathSegments)) {
    return response;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("text/html")) {
    // Clone the response to get its body as text
    const clonedResponse = response.clone();
    const html = await clonedResponse.text();

    let transformedHtml = html;

    // Only transform image URLs in development mode
    if (!building) {
      debugLog("🛠️ Development mode: transforming relative image URLs");
      transformedHtml = transformImageUrls(transformedHtml, url);
    }

    // Only inject meta tags during build or for social media crawlers
    if (building || isSocialMediaCrawler) {
      debugLog("🏗️ injecting meta tags in route:", url.pathname);
      transformedHtml = injectMetaTags(transformedHtml, url);
    } else {
      debugLog(
        "⏭️ Development mode for normal browser: skipping meta tag injection"
      );
    }

    // Skip returning a modified response if we didn't change anything
    if (transformedHtml === html) {
      debugLog("↩️ No transformations applied, returning original response");
      return response;
    }

    // Create a new Response with proper caching headers for social media
    const newHeaders = new Headers(response.headers);
    if (isSocialMediaCrawler) {
      newHeaders.set("Cache-Control", "public, max-age=3600");
    }

    // Return the transformed response
    debugLog("✅ Returning transformed HTML response");
    return new Response(transformedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}

/**
 * Sets the locale based on the Accept-Language header
 * @param {Request} request - The original request
 */
function handleLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Extract language preferences with their quality values
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, quality] = lang.trim().split(";q=");
        return {
          code: code.trim(),
          quality: quality ? parseFloat(quality) : 1.0,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    // Use the highest quality language that we can normalize
    if (languages.length > 0) {
      const preferredLocale = normalizeLocale(languages[0].code);
      locale.set(preferredLocale);
    }
  } else {
    // Default to en-US if no Accept-Language header
    locale.set("en-US");
  }
}

/**
 * SvelteKit server hook to handle requests
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
  // 1. Set locale based on Accept-Language header
  handleLocale(event.request);

  // 2. Handle image requests in development mode
  if (
    !building &&
    event.url.pathname.startsWith("/blog/") &&
    event.url.pathname.match(getMediaFilePattern())
  ) {
    debugLog("🔍 Handling potential image request");
    const imageResponse = await handleImageRequest(event.url);
    if (imageResponse) {
      return imageResponse;
    }
  }

  // 3. Process the request with the SvelteKit middleware
  const response = await resolve(event);

  // 4. Process HTML responses for blog posts
  if (event.url.pathname.startsWith("/blog/")) {
    return transformHtml(event.request, response, event.url);
  }

  return response;
}

/**
 * SvelteKit server error handler
 * @type {import('@sveltejs/kit').HandleServerError}
 */
export function handleError({ error }) {
  return {
    message: "Internal Error",
    code: error?.code ?? "UNKNOWN",
  };
}
