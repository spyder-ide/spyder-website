import { fetchMarkdownPosts } from "$lib/utils";
import { siteUrl, blogTitle, description, comment } from "$lib/config";

export async function GET() {
  const posts = await fetchMarkdownPosts();

  if (!Array.isArray(posts) || posts.length === 0) {
    console.error('No posts found or invalid posts data');
    return new Response('Error generating RSS feed', { status: 500 });
  }

  const feedItems = posts.map(post => `
    <item>
      <title>${post.meta.title}</title>
      <link>${siteUrl}blog/${post.path}</link>
      <description>${post.meta.summary || ''}</description>
      <category>${post.meta.category || ''}</category>
      <pubDate>${new Date(post.meta.pub_date).toUTCString()}</pubDate>
    </item>
  `).join('');

  const rss = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${blogTitle}</title>
        <link>${siteUrl}blog</link>
        <description>${description} | ${comment}</description>
        <atom:link href="${siteUrl}blog/feed.xml" rel="self" type="application/rss+xml"/>
        ${feedItems}
      </channel>
    </rss>
  `.trim();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

export const prerender = true
