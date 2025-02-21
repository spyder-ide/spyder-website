import { existsSync, createReadStream } from "fs";
import { join } from "path";
import { locale } from 'svelte-i18n';
import { building } from '$app/environment';
import { metadata } from '$lib/store/metadata';
import { createWebsiteMetadata, createArticleMetadata } from '$lib/metadata/utils';
import { siteMetadata } from '$lib/metadata/config';
import { fetchMarkdownPosts } from '$lib/utils';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = event.request.headers.get('accept-language')?.split(',')[0];
  if (lang) {
    locale.set(lang);
  }

  // Ensure metadata is available during SSG
  if (building) {
    // Check if it's a blog post
    const isBlogPost = event.url.pathname.startsWith('/blog/') &&
                      !event.url.pathname.endsWith('/feed.xml') &&
                      !event.url.pathname.match(/\/\d+$/);

    // Set appropriate metadata based on route
    if (isBlogPost) {
      // Get the slug from the URL
      const slug = event.url.pathname.replace('/blog/', '').replace(/\/$/, '');

      // Get all posts
      const posts = await fetchMarkdownPosts();

      // Find the current post
      const currentPost = posts.find(post => post.path === slug);

      if (currentPost) {
        // Create metadata with the correct image path
        const customOgImagePath = `/assets/og/${slug}.png`;
        const defaultArticleMetadata = createArticleMetadata({
          title: `${siteMetadata.title} | ${currentPost.meta.title}`,
          description: currentPost.meta.summary,
          summary: currentPost.meta.summary,
          author: currentPost.meta.author,
          pub_date: currentPost.meta.pub_date,
          modified_date: currentPost.meta.modified_date,
          tags: currentPost.meta.tags,
          category: currentPost.meta.category,
          url: event.url.href,
          image: customOgImagePath,
          prism: true
        });
        event.locals.metadata = defaultArticleMetadata;
      } else {
        // Fallback to default metadata if post not found
        const defaultArticleMetadata = createArticleMetadata({
          title: siteMetadata.title,
          description: siteMetadata.description,
          author: siteMetadata.author,
          pub_date: new Date().toISOString().split('T')[0],
          summary: siteMetadata.description,
          category: 'Blog',
          tags: [],
          url: event.url.href
        });
        event.locals.metadata = defaultArticleMetadata;
      }
    } else {
      const defaultMetadata = createWebsiteMetadata({
        url: event.url.href
      });
      event.locals.metadata = defaultMetadata;
    }
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

  const response = await resolve(event);
  return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
  return {
    message: 'Internal Error',
    code: error?.code ?? 'UNKNOWN'
  };
}
