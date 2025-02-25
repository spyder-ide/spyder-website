import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';
import { building } from '$app/environment';
import { fetchAuthorsMetadataFromServer } from '$lib/utils/author.server';
import { siteUrl, ogImageBlog } from "$lib/config";

export default join;

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

  // Transform the response for blog post pages
  const response = await resolve(event, {
    transformPageChunk: async ({ html, done }) => {
      // Only process complete HTML documents at the end of the transform
      if (!done) return html;
      
      // Make sure we're on a blog post page and not the blog listing
      const path = event.url.pathname;
      if (!path.startsWith('/blog/') || path === '/blog/' || path.match(/\/blog\/\d+$/)) {
        return html;
      }

      // Check if OG tags are missing
      if (!html.includes('og:image') || !html.includes('twitter:card')) {
        console.log(`Adding OG metadata for ${path}`);
        
        try {
          // Get the blog post slug from the path
          const slug = path.split('/').filter(Boolean).pop();
          
          // Try to extract metadata from the HTML content
          const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/s);
          const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : 'Spyder Blog';
          
          // Extract summary/description from meta description if it exists
          let description = '';
          const descMatch = html.match(/<meta name="description" content="([^"]*)">/);
          if (descMatch) {
            description = descMatch[1];
          } else {
            // Try to get the first paragraph as description
            const paragraphMatch = html.match(/<p[^>]*>(.*?)<\/p>/s);
            description = paragraphMatch 
              ? paragraphMatch[1].replace(/<[^>]*>/g, '').substring(0, 160)
              : 'Spyder IDE blog post';
          }
          
          // Check if an OG image exists for this post
          const customOgImagePath = `/assets/og/${slug}.png`;
          const ogImage = customOgImagePath || ogImageBlog;
          const absoluteImageUrl = `${siteUrl}${ogImage}`;
          
          // Prepare OG tags to inject
          const ogTags = `
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Spyder IDE" />
    <meta property="og:url" content="${siteUrl}/blog/${slug}" />
    <meta property="og:title" content="Spyder | ${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${absoluteImageUrl}" />
    <meta property="og:image:type" content="image/png">
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Spyder_IDE" />
    <meta name="twitter:title" content="Spyder | ${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${absoluteImageUrl}" />
    <meta name="twitter:image:alt" content="${title}" />`;
          
          // Insert OG tags after the title tag
          html = html.replace('</title>', '</title>\n' + ogTags);
        } catch (error) {
          console.error(`Error adding OG metadata for ${path}:`, error);
        }
      }
      
      return html;
    }
  });

  return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
  return {
    message: 'Internal Error',
    code: error?.code ?? 'UNKNOWN'
  };
}
