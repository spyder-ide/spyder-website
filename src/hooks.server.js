import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';
import { building } from '$app/environment';
import { injectMetaTags } from "$lib/server/metaTagsInjector";

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

  // Get the response
  const response = await resolve(event);
  
  // Only process HTML responses during prerendering for blog posts
  if (building && event.url.pathname.startsWith('/blog/')) {
    // Skip pagination routes and wildcard route
    const pathSegments = event.url.pathname.split('/').filter(Boolean);
    const isPageRoute = 
      // Check for /blog/* pattern (wildcard route)
      (pathSegments.length === 2 && pathSegments[1] === '*') ||
      // Check for /blog/1, /blog/2, etc. (pagination routes)
      (pathSegments.length === 2 && !isNaN(parseInt(pathSegments[1])));
    
    if (isPageRoute) {
      //console.log(`Skipping meta tag injection for pagination route: ${event.url.pathname}`);
      return response;
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      // Clone the response to get its body as text
      const clonedResponse = response.clone();
      const html = await clonedResponse.text();
      
      // Inject meta tags for blog posts
      const transformedHtml = injectMetaTags(html, event.url);
      
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
