import { building } from "$app/environment";
import { injectMetaTags } from "$lib/server/metaTagsInjector";
import { createReadStream, existsSync, readdirSync } from "fs";
import { join } from "path";
import { locale } from "svelte-i18n";

export default join;

// Debug logging configuration - set to true to enable all debug logs
const DEBUG_LOGGING = true;

/**
 * Debug logger that only logs when DEBUG_LOGGING is enabled
 * @param {string} message The message to log
 */
function debugLog(...args) {
  if (DEBUG_LOGGING) {
    console.log(...args);
  }
}

/**
 * Handle image requests in development mode
 * @param {URL} url The request URL
 * @returns {Promise<Response|undefined>} A response with the image or undefined if not found
 */
async function handleImageRequest(url) {
  // Extract the path parts and get the full pathname
  const pathname = url.pathname;
  const pathParts = pathname.split("/").filter(Boolean);

  debugLog(`\n[Debug] 🔍 Image request for: ${pathname}`);
  debugLog(`[Debug] 📊 Path parts: ${JSON.stringify(pathParts)}`);

  // Early return if we don't have enough path parts
  if (pathParts.length < 2) {
    debugLog(`[Debug] ⚠️ Not enough path parts, skipping image handler`);
    return;
  }

  // Extract the image filename
  const imageFileName = pathParts[pathParts.length - 1];
  debugLog(`[Debug] 🖼️ Image filename: ${imageFileName}`);

  // Initialize the possible paths array
  const possiblePaths = [];

  // Case 1: Standard URL format - /blog/[slug]/[image.png]
  if (pathParts.length >= 3 && pathParts[0] === "blog") {
    const slug = pathParts[1];
    debugLog(`[Debug] 🎯 Using slug "${slug}" for image search`);

    // Check in source directory
    const primaryPath = join(
      process.cwd(),
      "src",
      "routes",
      "blog",
      slug,
      imageFileName
    );
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

    debugLog(`[Debug] 🎯 Primary path: ${primaryPath}`);

    // In case the image wasn't found with slug prefix, try as a global image
    possiblePaths.push(
      join(process.cwd(), "src", "routes", "blog", imageFileName)
    );
  }
  // Case 2: Direct URL format - /blog/[image.png]
  else if (pathParts.length === 2 && pathParts[0] === "blog") {
    debugLog(`[Debug] 🚀 Direct URL format detected: ${pathname}`);

    // First try to determine which blog post the request is for
    // Extract referrer to see if it contains a blog slug
    const referrer = url.headers?.get("referer");
    let refererSlug = null;

    if (referrer) {
      const refererUrl = new URL(referrer);
      const refererPathParts = refererUrl.pathname.split("/").filter(Boolean);
      if (refererPathParts.length >= 2 && refererPathParts[0] === "blog") {
        refererSlug = refererPathParts[1];
        debugLog(`[Debug] 🎯 Found slug from referrer: ${refererSlug}`);

        // Try the referrer slug first
        const slugPath = join(
          process.cwd(),
          "src",
          "routes",
          "blog",
          refererSlug,
          imageFileName
        );
        possiblePaths.push(slugPath);
        debugLog(`[Debug] 🔍 Checking referrer path: ${slugPath}`);
      }
    }

    // Check all blog post directories as a fallback
    const blogDir = join(process.cwd(), "src", "routes", "blog");
    let blogPosts = [];

    try {
      blogPosts = readdirSync(blogDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .filter(
          (dirent) => dirent.name !== "[page]" && dirent.name !== "feed.xml"
        )
        .map((dirent) => dirent.name);

      debugLog(`[Debug] 📚 Found blog posts: ${blogPosts.join(", ")}`);

      // For each blog post directory, check if it contains the requested image
      for (const blogPost of blogPosts) {
        // Skip if this is the referrer slug we already checked
        if (blogPost === refererSlug) continue;

        const potentialPath = join(blogDir, blogPost, imageFileName);
        debugLog(`[Debug] 🔍 Checking in blog post: ${blogPost}`);
        if (existsSync(potentialPath)) {
          debugLog(
            `[Debug] ✅ Found image in blog post directory: ${blogPost}`
          );
          possiblePaths.push(potentialPath);
          break; // Stop after finding the first match
        }
      }

      // Fallback - try in the base blog directory
      possiblePaths.push(join(blogDir, imageFileName));
    } catch (error) {
      console.error(`[Debug] ❌ Error accessing blog directories:`, error);
    }
  }

  // Add fallback paths
  possiblePaths.push(
    join(process.cwd(), "static", pathname),
    join(process.cwd(), "static", "blog", imageFileName)
  );

  // Try all possible paths
  debugLog(`[Debug] 🔎 Trying ${possiblePaths.length} possible paths...`);
  for (const imagePath of possiblePaths) {
    debugLog(`[Debug] 🔍 Checking path: ${imagePath}`);
    if (existsSync(imagePath)) {
      debugLog(`[Debug] ✅ Found image at: ${imagePath}`);
      const stream = createReadStream(imagePath);
      return new Response(stream);
    }
  }

  debugLog(`[Debug] ❌ No image found for: ${pathname}`);
  debugLog(
    `[Debug] 💡 Tip: Make sure the image file exists in the correct blog post directory.`
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
  const pathParts = url.pathname.split("/").filter(Boolean);
  if (pathParts.length < 2 || pathParts[0] !== "blog") {
    return html;
  }

  const slug = pathParts[1];
  debugLog(`[Debug] 🔄 Transforming image URLs in HTML for slug: ${slug}`);

  // Use regex to find <img> tags with relative paths
  return html.replace(
    /<img\s+([^>]*)src="([^"]+)"([^>]*)>/gi,
    (match, beforeSrc, src, afterSrc) => {
      // Skip external URLs and already prefixed paths
      if (
        src.startsWith("http") ||
        src.startsWith("/blog/") ||
        src.startsWith("/assets/")
      ) {
        return match;
      }

      // Clean the path
      const cleanPath = src.startsWith("./") ? src.slice(2) : src;

      // Create the new src with blog slug
      const newSrc = `/blog/${slug}/${cleanPath}`;

      debugLog(`[Debug] 🔄 Transforming HTML image: ${src} -> ${newSrc}`);
      return `<img ${beforeSrc}src="${newSrc}"${afterSrc}>`;
    }
  );
}

/**
 * Process HTML responses for social media crawlers or during prerendering
 * @param {Request} request The original request
 * @param {Response} response The response to process
 * @param {URL} url The request URL
 * @returns {Response} The processed response
 */
async function handleMetaTags(request, response, url) {
  const userAgent = request.headers.get("user-agent") || "";
  const isSocialMediaCrawler =
    userAgent.includes("Twitterbot") ||
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("LinkedInBot");

  // Skip if not building and not a social media crawler
  if (!building && !isSocialMediaCrawler) {
    // Check if this is a HTML response for a blog post
    const contentType = response.headers.get("content-type");
    if (
      contentType &&
      contentType.includes("text/html") &&
      url.pathname.startsWith("/blog/") &&
      !building
    ) {
      // In development mode, transform image URLs in HTML responses
      const clonedResponse = response.clone();
      const html = await clonedResponse.text();
      const transformedHtml = transformImageUrls(html, url);

      return new Response(transformedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }

    return response;
  }

  // Skip pagination routes and wildcard route
  const pathSegments = url.pathname.split("/").filter(Boolean);

  // Normalize path segments (remove trailing slashes)
  if (pathSegments.length > 1 && pathSegments[1].endsWith("/")) {
    pathSegments[1] = pathSegments[1].slice(0, -1);
  }

  const isPageRoute =
    // Check for /blog/* pattern (wildcard route)
    (pathSegments.length === 2 && pathSegments[1] === "*") ||
    // Check for /blog/1, /blog/2, etc. (pagination routes)
    (pathSegments.length === 2 && !isNaN(parseInt(pathSegments[1])));

  if (isPageRoute) {
    return response;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("text/html")) {
    // Clone the response to get its body as text
    const clonedResponse = response.clone();
    const html = await clonedResponse.text();

    // First transform image URLs, then inject meta tags
    let transformedHtml = transformImageUrls(html, url);
    transformedHtml = injectMetaTags(transformedHtml, url);

    // Create a new Response with proper caching headers for social media
    const newHeaders = new Headers(response.headers);
    if (isSocialMediaCrawler) {
      newHeaders.set("Cache-Control", "public, max-age=3600");
    }

    // Return the transformed response
    return new Response(transformedHtml, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  }

  return response;
}

/**
 * Handle locale setting
 * @param {Request} request The original request
 */
function handleLocale(request) {
  const lang = request.headers.get("accept-language")?.split(",")[0];
  if (lang) {
    locale.set(lang);
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // 1. Set locale based on Accept-Language header
  handleLocale(event.request);

  // 2. Handle image requests in development mode
  if (
    !building &&
    event.url.pathname.startsWith("/blog/") &&
    event.url.pathname.match(
      /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i
    )
  ) {
    const imageResponse = await handleImageRequest(event.url);
    if (imageResponse) {
      return imageResponse;
    }
  }

  // 3. Process the request with the SvelteKit middleware
  const response = await resolve(event);

  // 4. Process HTML responses for meta tags
  if (event.url.pathname.startsWith("/blog/")) {
    return handleMetaTags(event.request, response, event.url);
  }

  return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
  return {
    message: "Internal Error",
    code: error?.code ?? "UNKNOWN",
  };
}
