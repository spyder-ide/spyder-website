import { siteUrl } from '$lib/config';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
  const slug = url.pathname.replace(`/blog`, '').replaceAll('/', '');
  const customOgImagePath = `${siteUrl}/assets/og/${slug}.png`;

  return {
    ogImage: customOgImagePath,
    slug
  };
} 
