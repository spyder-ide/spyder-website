import { fetchAuthorMetadata } from '$lib/utils';
import { siteUrl, ogImageBlog } from '$lib/config';

export const load = async ({ params }) => {
  const slug = params.slug;
  const customOgImagePath = `${siteUrl}/assets/og/${slug}.png`;

  // Get the post data from the markdown module
  const post = await import(`../../../routes/blog/${slug}/+page.md`);
  const { metadata: postData } = post;

  // Fetch author metadata server-side
  let authorMetadata = [];
  if (postData.author) {
    const authors = Array.isArray(postData.author) ? postData.author : [postData.author];
    authorMetadata = await Promise.all(
      authors.map(async (author) => {
        const metadata = await fetchAuthorMetadata(author);
        return metadata;
      })
    );
  }

  // Prepare metadata for the page
  const pageMetadata = {
    title: `Spyder | ${postData.title}`,
    description: postData.summary,
    keywords: `${postData.tags}, ${postData.category}`,
    author: authorMetadata.map(a => a?.name).filter(Boolean).join(', ') || postData.author || '',
    url: `${siteUrl}/blog/${slug}`,
    image: customOgImagePath || ogImageBlog,
    isLoading: false
  };

  return {
    post: postData,
    metadata: pageMetadata,
    authorMetadata
  };
}; 