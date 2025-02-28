import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { config, siteUrl, ogImageBlog } from "$lib/config";

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
        console.warn(`Warning: File ${markdownPath} is missing title metadata.`);
      }
      
      if (!metadata.author) {
        console.warn(`Warning: File ${markdownPath} is missing author metadata.`);
      }
      
      if (!metadata.pub_date) {
        console.warn(`Warning: File ${markdownPath} is missing pub_date metadata.`);
      }

      postTitle = metadata.title || "";
      description = metadata.summary || "";
      tags = metadata.tags || "";
      author = metadata.author || "";
    } else {
      console.warn(`Blog post file not found for slug: ${slug}`);
    }
  } catch (error) {
    console.error('Error extracting markdown metadata:', error);
  }

  return { postTitle, description, tags, author };
}

/**
 * Injects meta tags into the HTML head for blog posts during prerendering
 * @param {string} html - The HTML to transform
 * @param {URL} url - The URL of the request
 * @returns {string} - Transformed HTML with meta tags
 */
export function injectMetaTags(html, url) {
  if (!url.pathname.startsWith('/blog/') || url.pathname === '/blog/') {
    return html;
  }

  // Filter out pagination routes
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const isPaginationRoute = 
    (pathSegments.length === 2 && pathSegments[1] === '*') || 
    (pathSegments.length === 2 && !isNaN(parseInt(pathSegments[1])));
    
  if (isPaginationRoute) {
    return html;
  }
  
  try {
    // Extract the slug from the URL
    const slug = pathSegments[1];
    
    // Check if the HTML already has OpenGraph tags
    if (html.includes('<meta property="og:type" content="website" />') || 
        html.includes('<meta property="og:type" content="website">')) {
      // Silently skip without logging
      return html;
    }

    // Get metadata from markdown file
    const { postTitle, description, tags, author } = extractMarkdownMetadata(slug);

    // If we couldn't find the title in frontmatter, try extracting from h1
    let title = postTitle;
    if (!title) {
      // Look for h1 with class that matches the blog post title
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        title = h1Match[1].trim().replace(/<\/?[^>]+(>|$)/g, "");
      }
    }

    // If still no title, extract from the page title
    if (!title) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      title = titleMatch ? titleMatch[1].replace("Spyder | ", "") : "";
    }

    // Set the final title with proper format
    title = title ? `Spyder | ${title}` : `Spyder | The Python IDE that scientists and data analysts deserve`;

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
          finalDescription = firstParagraphMatch[1].replace(/<\/?[^>]+(>|$)/g, "");
          // Limit to reasonable size for meta description
          if (finalDescription.length > 160) {
            finalDescription = finalDescription.substring(0, 157) + "...";
          }
        }
      }
    }

    // Fallback description if still empty
    if (!finalDescription) {
      finalDescription = title;
    }

    // Fallback tags if still empty
    let finalTags = tags;
    if (!finalTags) {
      finalTags = config.site.siteKeywords;
    }

    // Generate image URL
    const customOgImagePath = slug
      ? `/assets/og/${slug}.png`
      : "/assets/media/website_screenshot.png";
    const absoluteImageUrl = customOgImagePath
      ? `${siteUrl}${customOgImagePath}`
      : ogImageBlog;

    // Generate absolute URL for the post
    const absoluteUrl = `${siteUrl}/blog/${slug}`;

    // Create the meta tag string - with escaping for special characters
    const safeDescription = finalDescription.replace(/"/g, "&quot;");
    const safeTitle = title.replace(/"/g, "&quot;");

    // Only log for actual blog posts, not pagination routes
    console.log(`Injecting meta tags for blog post: ${slug}`);

    const metaTags = `<!-- Start of SEO meta tags -->
<title>${safeTitle}</title>
<link rel="canonical" href="${absoluteUrl}" />
<meta name="description" content="${safeDescription}" />
<meta name="keywords" content="${finalTags}" />
<meta name="robots" content="index, follow" />

<!-- Twitter Card tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@Spyder_IDE" />
<meta name="twitter:title" content="${safeTitle}" />
<meta name="twitter:description" content="${safeDescription}" />
<meta name="twitter:image" content="${absoluteImageUrl}" />
<meta name="twitter:image:alt" content="${safeTitle}" />

<!-- Open Graph / Facebook tags -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Spyder IDE" />
<meta property="og:url" content="${absoluteUrl}" />
<meta property="og:title" content="${safeTitle}" />
<meta property="og:description" content="${safeDescription}" />
<meta property="og:image" content="${absoluteImageUrl}" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="en_US" />
<!-- End of SEO meta tags -->`;

    // Inject meta tags into the head
    return html.replace("<head>", `<head>\n${metaTags}\n`);
  } catch (error) {
    console.error("Error injecting meta tags:", error);
    return html;
  }
}
