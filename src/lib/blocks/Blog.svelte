<script>
  import { base } from "$app/paths";
  import { browser } from "$app/environment";
  import { metadata } from "$lib/store";
  import { formattedPubDate, fetchAuthorMetadata } from "$lib/utils";

  import Loader from "$lib/components/Loader.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  import {
    socials,
    siteUrl,
    title as siteTitle,
    author as siteAuthor,
    blogTitle,
    description as blogDescription,
    keywords as blogKeywords,
  } from "$lib/config";

  export let data, pageNum, totalPages;

  const route = "blog";
  const url = `${siteUrl}${route}`;
  const site = `@${socials.twitter.split("/").pop()}`;

  let postsWithAuthor = [];

  $: image = data.image || "assets/media/blog_screenshot.png";
  $: fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  $: metadata.setMetadata({
    title: `${siteTitle} | ${blogTitle}`,
    description: blogDescription,
    keywords: blogKeywords.join(", "),
    author: siteAuthor,
    image: fullImageUrl,
    site,
    url,
  });

  $: ({ posts, pageNum, totalPages } = data.props);
  $: if (posts) {
    postsWithAuthor = Promise.all(
      posts.map(async (post) => {
        if (browser) {
          const authorMetadata = await fetchAuthorMetadata(post.meta.author);
          return { ...post, authorMetadata };
        }
        return post;
      }),
    );
  }
</script>

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description} />
  <meta name="keywords" content={$metadata.keywords} />
  <meta name="author" content={$metadata.author} />
  <link rel="canonical" href={$metadata.url} />
  <link rel="alternate" type="application/rss+xml" title="Spyder's Blog" href="{$metadata.url}feed.xml" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$metadata.url} />
  <meta property="og:title" content={$metadata.title} />
  <meta property="og:description" content={$metadata.description} />
  <meta property="og:image" content={$metadata.image} />
  <meta property="og:image:secure_url" content={$metadata.image} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={site} />

  <!-- Twitter -->
  <meta property="twitter:card" name="twitter:card" content="summary_large_image" />
  <meta property="twitter:site" name="twitter:site" content={$metadata.site} />
  <meta property="twitter:url" name="twitter:url" content={$metadata.url} />
  <meta property="twitter:title" name="twitter:title" content={$metadata.title} />
  <meta property="twitter:description" name="twitter:description" content={$metadata.description} />
  <meta property="twitter:image" name="twitter:image" content={$metadata.image} />
  <meta property="twitter:image:alt" name="twitter:image:alt" content={$metadata.title} />
</svelte:head>

<div class="container">
  <h1
    class="text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32"
  >
    {blogTitle}
  </h1>

  <section class="max-w-3xl mx-auto">
    {#await postsWithAuthor}
      <Loader classes="fill-black dark:fill-white" />
    {:then loadedPosts}
      <div class="grid grid-flow-row gap-24">
        {#each loadedPosts as post}
          <article>
            <h2 class="text-xl md:text-2xl xl:text-3xl font-light">
              <a
                class="post-link"
                href="{base}/{route}/{post.path}"
                title={post.meta.title}
              >
                {post.meta.title}
              </a>
            </h2>
            {#if post.authorMetadata}
              <div class="flex gap-4 items-center my-4">
                <img
                  class="w-12 h-12 rounded-full object-cover bg-white"
                  src={post.authorMetadata.src}
                  alt={post.authorMetadata.name}
                />
                <div>
                  <p>{post.authorMetadata.name}</p>
                  <small>
                    Published on {formattedPubDate(post.meta.pub_date)}
                  </small>
                </div>
              </div>
            {/if}
            <p class="text-gray-700 dark:text-gray-300 font-light">
              {post.meta.summary}
            </p>
            <a
              class="block text-right mt-4"
              href="{base}/{route}/{post.path}"
              title={post.meta.title}
            >
              Read More&hellip;
            </a>
          </article>
        {/each}
      </div>
      <Pagination {pageNum} {totalPages} {route} />
    {:catch error}
      <p>Error loading posts: {error.message}</p>
    {/await}
  </section>
</div>
