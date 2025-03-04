export const load = async ({ url, route }) => {
  const path = url.pathname;
  const segments = path.split("/").filter(Boolean);
  let slug = segments.pop();

  // Remove trailing slash if present
  if (slug && slug.endsWith("/")) {
    slug = slug.slice(0, -1);
  }

  return {
    url: url.href,
    slug,
    baseUrl: `/blog/${slug}`,
  };
};
