import fs from "fs";
import path from "path";
import yaml from "js-yaml";
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
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);

      if (frontmatterMatch) {
        try {
          const frontmatter = yaml.load(frontmatterMatch[1]);

          if (frontmatter.title) {
            postTitle = frontmatter.title;
          }

          if (frontmatter.summary) {
            description = frontmatter.summary;
          }

          if (frontmatter.tags) {
            tags = frontmatter.tags;
          }
        } catch (e) {
          console.error(`Error parsing frontmatter for ${slug}:`, e);
        }
      }
    }
  } catch (error) {
    console.error('Error extracting markdown metadata:', error);
  }

  return { postTitle, description, tags };
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

  // Filter out pagination routes to prevent log messages
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
      console.log(`Skipping meta tag injection for ${url.pathname} - OG tags already present`);
      return html;
    }

    // Get metadata from markdown file
    const { postTitle, description, tags } = extractMarkdownMetadata(slug);

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
      finalDescription = `Spyder IDE blog post - ${title}`;
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

    console.log(`Injecting meta tags for ${url.pathname}`);

    const metaTags = `
    <!-- Start of meta tags -->
    <title>${safeTitle}</title>
    <link rel="canonical" href="${absoluteUrl}" />
    <meta name="description" content="${safeDescription}" />
    <meta name="keywords" content="${finalTags}" />
    <meta name="robots" content="index, follow" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Spyder_IDE" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${absoluteImageUrl}" />
    <meta name="twitter:image:alt" content="${safeTitle}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Spyder IDE" />
    <meta property="og:url" content="${absoluteUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${absoluteImageUrl}" />
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />
    <!-- End of meta tags -->
    `;

    // Inject meta tags into the head
    return html.replace("</head>", `${metaTags}\n</head>`);
  } catch (error) {
    console.error("Error injecting meta tags:", error);
    return html;
  }
} 
