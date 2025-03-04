import { config, siteUrl } from "$lib/config";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

/**
 * Configuration for meta tags injector
 * @typedef {Object} InjectorConfig
 * @property {boolean} logging - Whether to enable debug logging
 */

/** @type {InjectorConfig} */
const INJECTOR_CONFIG = {
  logging: true,
};

/**
 * Debug logger that only logs when logging is enabled
 * @param {...any} args - Arguments to pass to console.log
 */
function debugLog(...args) {
  if (INJECTOR_CONFIG.logging) {
    console.log(...args);
  }
}

/**
 * Extracts metadata from a markdown file
 * @param {string} slug - The slug/identifier for the blog post
 * @returns {Object} - Object containing extracted metadata
 */
function extractMarkdownMetadata(slug) {
  let postTitle = "";
  let description = "";
  let tags = "";
  let author = "";
  let pubDate = "";

  try {
    const markdownPath = path.join(
      process.cwd(),
      "src",
      "routes",
      "blog",
      slug,
      "+page.md"
    );

    if (fs.existsSync(markdownPath)) {
      const fileContent = fs.readFileSync(markdownPath, "utf8");

      // Use gray-matter to parse frontmatter, consistent with fetchMarkdownPostsMetadata
      const { data: metadata } = matter(fileContent);

      // Check for required fields, similar to fetchMarkdownPostsMetadata validation
      if (!metadata.title) {
        console.warn(
          `Warning: File ${markdownPath} is missing title metadata.`
        );
      }

      if (!metadata.author) {
        console.warn(
          `Warning: File ${markdownPath} is missing author metadata.`
        );
      }

      if (!metadata.pub_date) {
        console.warn(
          `Warning: File ${markdownPath} is missing pub_date metadata.`
        );
      }

      postTitle = metadata.title || "";
      description = metadata.summary || "";
      tags = metadata.tags || "";
      author = metadata.author || "";
      pubDate = metadata.pub_date || "";
    } else {
      console.warn(`Blog post file not found for slug: ${slug}`);
    }
  } catch (error) {
    console.error("Error extracting markdown metadata:", error);
  }

  return { postTitle, description, tags, author, pubDate };
}

/**
 * Truncates a string to a specified character limit while preserving whole words
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum character length
 * @param {string} [ellipsis="..."] - The ellipsis to append to truncated text
 * @returns {string} - The truncated string
 */
function truncateByWords(text, maxLength, ellipsis = "...") {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const words = text.split(" ");
  let result = "";
  let currentLength = 0;

  // Add words one by one until we reach close to the limit
  for (const word of words) {
    // +1 for the space character
    if (currentLength + word.length + 1 <= maxLength - ellipsis.length) {
      result += (result ? " " : "") + word;
      currentLength += word.length + (result ? 1 : 0);
    } else {
      break;
    }
  }

  debugLog(
    `Truncated text from ${text.length} to ${
      result.length + ellipsis.length
    } chars`
  );
  return result + ellipsis;
}

/**
 * Safely escapes text for use in HTML attributes
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
function escapeHtmlAttribute(text) {
  return text.replace(/"/g, "&quot;");
}

/**
 * Injects meta tags into the HTML head for blog posts during prerendering
 * @param {string} html - The HTML to transform
 * @param {URL} url - The URL of the request
 * @returns {string} - Transformed HTML with meta tags
 */
export function injectMetaTags(html, url) {
  // Skip if not a blog post URL
  if (!url.pathname.startsWith("/blog/") || url.pathname === "/blog/") {
    debugLog(`[Injector] Skipping non-blog URL: ${url.pathname}`);
    return html;
  }

  // Filter out pagination routes
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const isPaginationRoute =
    (pathSegments.length === 2 && pathSegments[1] === "*") ||
    (pathSegments.length === 2 && !isNaN(parseInt(pathSegments[1])));

  if (isPaginationRoute) {
    debugLog(`[Injector] Skipping pagination route: ${url.pathname}`);
    return html;
  }

  try {
    // Extract the slug from the URL and normalize it (remove trailing slash)
    let slug = pathSegments[1];

    // Remove trailing slash if present
    if (slug && slug.endsWith("/")) {
      slug = slug.slice(0, -1);
    }

    debugLog(`[Injector] Processing blog post: ${slug}`);

    // Check if the HTML already has OpenGraph tags
    if (
      html.includes('<meta property="og:type" content="website" />') ||
      html.includes('<meta property="og:type" content="website">')
    ) {
      debugLog(
        `[Injector] Skipping - OpenGraph tags already present for: ${slug}`
      );
      return html;
    }

    // Get metadata from markdown file
    const { postTitle, description, tags, author, pubDate } =
      extractMarkdownMetadata(slug);

    // If we couldn't find the title in frontmatter, try extracting from h1
    let title = postTitle;
    if (!title) {
      // Look for h1 with class that matches the blog post title
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        title = h1Match[1].trim().replace(/<\/?[^>]+(>|$)/g, "");
        debugLog(`[Injector] Extracted title from H1: ${title}`);
      }
    }

    // If still no title, extract from the page title
    if (!title) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      title = titleMatch ? titleMatch[1].replace("Spyder | ", "") : "";
      debugLog(`[Injector] Extracted title from title tag: ${title}`);
    }

    // Set the final title with proper format
    title = title
      ? `Spyder | ${title}`
      : `Spyder | The Python IDE that scientists and data analysts deserve`;

    // If still no description, look for the first paragraph in the prose section
    let finalDescription = description;
    if (!finalDescription) {
      const proseSectionMatch = html.match(
        /<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      );
      if (proseSectionMatch) {
        const proseContent = proseSectionMatch[1];
        const firstParagraphMatch = proseContent.match(/<p>([\s\S]*?)<\/p>/i);
        if (firstParagraphMatch) {
          // Strip HTML tags for plain text
          finalDescription = firstParagraphMatch[1].replace(
            /<\/?[^>]+(>|$)/g,
            ""
          );
          debugLog(`[Injector] Extracted description from first paragraph`);
        }
      }
    }

    // Fallback description if still empty
    if (!finalDescription) {
      finalDescription = title;
      debugLog(`[Injector] Using title as fallback for description`);
    }

    // Fallback tags if still empty
    let finalTags = tags;
    if (!finalTags) {
      finalTags = config.site.siteKeywords;
      debugLog(`[Injector] Using default site keywords for tags`);
    }

    // Generate image URL
    const customOgImagePath = slug
      ? `/assets/og/${slug}.png`
      : "/assets/media/website_screenshot.png";

    // Verify image exists, fall back to default if not
    let finalImagePath = customOgImagePath;
    const localImagePath = path.join(
      process.cwd(),
      "static",
      customOgImagePath
    );

    if (!fs.existsSync(localImagePath)) {
      console.warn(`Warning: OG image not found for ${slug}. Using default.`);
      finalImagePath = "/assets/media/website_screenshot.png";
    }

    // Make sure the image URL is absolute and doesn't have any special characters
    const absoluteImageUrl = `${siteUrl}${finalImagePath.replace(
      /\s/g,
      "%20"
    )}`;

    // Generate absolute URL for the post - ensure no trailing slash
    const absoluteUrl = `${siteUrl}/blog/${slug}`;

    // Create the meta tag string - with escaping for special characters
    // Enforce Twitter character limits using word-based truncation
    const limitedTitle = truncateByWords(title, 70, "...");
    const limitedDescription = truncateByWords(finalDescription, 200, "...");

    const safeTitle = escapeHtmlAttribute(limitedTitle);
    const safeDescription = escapeHtmlAttribute(limitedDescription);

    // Log for actual blog posts
    console.log(`🏗️ [Injector] working on post: ${slug}`);

    // Format publication date for meta tags if available
    const formattedDate = pubDate ? new Date(pubDate).toISOString() : "";

    const metaTags = `<!-- Start of SEO meta tags -->
<title>${title}</title>
<link rel="canonical" href="${absoluteUrl}" />
<meta name="description" content="${safeDescription}" />
<meta name="keywords" content="${finalTags}" />
<meta name="robots" content="index, follow" />
${
  formattedDate
    ? `<meta name="article:published_time" content="${formattedDate}" />`
    : ""
}

<!-- Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@Spyder_IDE" />
<meta name="twitter:creator" content="@Spyder_IDE" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDescription}" />
<meta name="twitter:image" content="${absoluteImageUrl}" />
<meta name="twitter:image:alt" content="${safeTitle}" />
<meta name="twitter:domain" content="${siteUrl.replace(/^https?:\/\//, "")}" />

<!-- Open Graph / Facebook tags -->
<meta property="og:type" content="article" />
<meta property="og:site_name" content="Spyder IDE" />
<meta property="og:url" content="${absoluteUrl}" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:image" content="${absoluteImageUrl}" />
<meta property="og:image:secure_url" content="${absoluteImageUrl}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
${
  formattedDate
    ? `<meta property="article:published_time" content="${formattedDate}" />`
    : ""
}
<!-- End of SEO meta tags -->`;

    // Inject meta tags into the head
    const result = html.replace("<head>", `<head>\n${metaTags}\n`);
    debugLog(`[Injector] Successfully injected meta tags for: ${slug}`);
    return result;
  } catch (error) {
    console.error("Error injecting meta tags:", error, error.stack);
    return html;
  }
}
