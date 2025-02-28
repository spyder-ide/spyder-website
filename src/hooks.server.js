import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';
import { building } from '$app/environment';
import { siteUrl, ogImageBlog } from "$lib/config";
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default join;

/**
 * Injects meta tags into the HTML head for blog posts during prerendering
 * @param {string} html - The HTML to transform
 * @param {URL} url - The URL of the request
 * @returns {string} - Transformed HTML with meta tags
 */
async function injectMetaTags(html, url) {
  // Only process blog posts
  if (!url.pathname.startsWith('/blog/') || url.pathname === '/blog/' || url.pathname.match(/\/blog\/\[page\]\/?$/)) {
    return html;
  }

  try {
    // Extract the slug from the URL
    const slug = url.pathname.split('/').filter(Boolean).pop();
    
    // Check if the HTML already has OpenGraph tags
    if (html.includes('<meta property="og:type" content="website" />') || 
        html.includes('<meta property="og:type" content="website">')) {
      console.log(`Skipping meta tag injection for ${url.pathname} - OG tags already present`);
      return html;
    }
    
    // Try to read the markdown file directly to get frontmatter
    let postTitle = '';
    let description = '';
    
    const markdownPath = path.join(process.cwd(), 'src', 'routes', 'blog', slug, '+page.md');
    
    if (fs.existsSync(markdownPath)) {
      const fileContent = fs.readFileSync(markdownPath, 'utf8');
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
        } catch (e) {
          console.error(`Error parsing frontmatter for ${slug}:`, e);
        }
      }
    }
    
    // If we couldn't find the title in frontmatter, try extracting from h1
    if (!postTitle) {
      // Look for h1 with class that matches the blog post title
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        postTitle = h1Match[1].trim().replace(/<\/?[^>]+(>|$)/g, '');
      }
    }
    
    // If still no title, extract from the page title
    if (!postTitle) {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      postTitle = titleMatch ? titleMatch[1].replace('Spyder | ', '') : '';
    }
    
    // Set the final title with proper format
    const title = postTitle ? `Spyder | ${postTitle}` : 'Spyder | Blog Post';
    
    // If we couldn't find the description from frontmatter, try other methods
    if (!description) {
      // Try to find meta description
      const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);
      if (metaDescMatch && metaDescMatch[1] && !metaDescMatch[1].startsWith('Spyder |')) {
        description = metaDescMatch[1];
      }
    }
    
    // If still no description, look for the first paragraph in the prose section
    if (!description) {
      const proseSectionMatch = html.match(/<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
      if (proseSectionMatch) {
        const proseContent = proseSectionMatch[1];
        const firstParagraphMatch = proseContent.match(/<p>([\s\S]*?)<\/p>/i);
        if (firstParagraphMatch) {
          // Strip HTML tags for plain text
          description = firstParagraphMatch[1].replace(/<\/?[^>]+(>|$)/g, '');
          // Limit to reasonable size for meta description
          if (description.length > 160) {
            description = description.substring(0, 157) + '...';
          }
        }
      }
    }
    
    // If we still don't have a description, try to find the first paragraph anywhere
    if (!description) {
      const firstPMatch = html.match(/<p>([\s\S]*?)<\/p>/i);
      if (firstPMatch) {
        description = firstPMatch[1].replace(/<\/?[^>]+(>|$)/g, '');
        if (description.length > 160) {
          description = description.substring(0, 157) + '...';
        }
      }
    }
    
    // Fallback description if still empty
    if (!description) {
      description = `Spyder IDE blog post - ${title}`;
    }
    
    // Generate image URL
    const customOgImagePath = slug ? `/assets/og/${slug}.png` : '';
    const absoluteImageUrl = customOgImagePath 
      ? `${siteUrl}${customOgImagePath}` 
      : ogImageBlog;
    
    // Generate absolute URL for the post
    const absoluteUrl = `${siteUrl}/blog/${slug}`;
    
    // Create the meta tag string - with escaping for special characters
    const safeDescription = description.replace(/"/g, '&quot;');
    const safeTitle = title.replace(/"/g, '&quot;');
    
    console.log(`Injecting meta tags for ${url.pathname}`);
    
    const metaTags = `
    <meta name="robots" content="index, follow" />
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${absoluteUrl}" />
    
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
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Spyder_IDE" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${absoluteImageUrl}" />
    <meta name="twitter:image:alt" content="${safeTitle}" />
    `;
    
    // Inject meta tags into the head
    return html.replace('</head>', `${metaTags}\n</head>`);
  } catch (error) {
    console.error('Error injecting meta tags:', error);
    return html;
  }
}

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  // Only handle image requests in development mode
  if (
    !building &&
    event.url.pathname.startsWith("/blog/") &&
    event.url.pathname.match(/\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i)
  ) {
    const imagePath = join(process.cwd(), "src", "routes", event.url.pathname);
    if (existsSync(imagePath)) {
      const stream = createReadStream(imagePath);
      return new Response(stream);
    }
  }

  // Get the response
  const response = await resolve(event);
  
  // Only process HTML responses during prerendering for blog posts
  if (building && event.url.pathname.startsWith('/blog/')) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      // Clone the response to get its body as text
      const clonedResponse = response.clone();
      const html = await clonedResponse.text();
      
      // Inject meta tags for blog posts
      const transformedHtml = await injectMetaTags(html, event.url);
      
      // Return the transformed response
      return new Response(transformedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }
  }

  return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
  return {
    message: 'Internal Error',
    code: error?.code ?? 'UNKNOWN'
  };
}
