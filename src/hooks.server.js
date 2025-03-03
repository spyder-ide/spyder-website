import { building } from "$app/environment";
import { injectMetaTags } from "$lib/server/metaTagsInjector";
import { createReadStream, existsSync } from "fs";
import { join } from "path";
import { locale } from "svelte-i18n";

export default join;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = event.request.headers.get("accept-language")?.split(",")[0];
  if (lang) {
    locale.set(lang);
  }

  // Check for social media crawlers
  const userAgent = event.request.headers.get("user-agent") || "";
  const isSocialMediaCrawler =
    userAgent.includes("Twitterbot") ||
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("LinkedInBot");

  // Handle image requests for both development and crawlers
  if (
    (!building || isSocialMediaCrawler) &&
    event.url.pathname.startsWith("/blog/") &&
    event.url.pathname.match(
      /\.(png|jpe?g|gif|svg|webp|webm|mp4|ogv|mp3|ogg)$/i
    )
  ) {
    const imagePath = join(process.cwd(), "src", "routes", event.url.pathname);
    if (existsSync(imagePath)) {
      const stream = createReadStream(imagePath);
      return new Response(stream);
    }
  }

  // Get the response
  const response = await resolve(event);

  // Process HTML responses for social media crawlers or during prerendering
  if (
    (building || isSocialMediaCrawler) &&
    event.url.pathname.startsWith("/blog/")
  ) {
    // Skip pagination routes and wildcard route
    const pathSegments = event.url.pathname.split("/").filter(Boolean);

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
      //console.log(`Skipping meta tag injection for pagination route: ${event.url.pathname}`);
      return response;
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("text/html")) {
      // Clone the response to get its body as text
      const clonedResponse = response.clone();
      const html = await clonedResponse.text();

      // Inject meta tags for blog posts
      const transformedHtml = injectMetaTags(html, event.url);

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
