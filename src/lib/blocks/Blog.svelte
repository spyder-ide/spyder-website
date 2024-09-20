<script>
  import { base } from "$app/paths";
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
  const site = `@${socials.twitter.split('/').pop()}`;

  let postsWithAuthor = [];

  $: if (posts) {
    postsWithAuthor = Promise.all(posts.map(async (post) => {
      if (typeof window !== "undefined") {
        const authorMetadata = await fetchAuthorMetadata(post.meta.author);
        return { ...post, authorMetadata };
      }
      return post;
    }));
  }

  $: ({ posts, pageNum, totalPages } = data.props);
  $: image = data.image || "assets/media/blog_screenshot.png";
  $: fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  $: metadata.setMetadata({
    title: `${siteTitle} | ${blogTitle}`,
    description: blogDescription,
    keywords: blogKeywords.join(", "),
    author: siteAuthor,
    image: fullImageUrl,
    site,
    url
  });
</script>

<svelte:head>
  <link rel="canonical" href={siteUrl} />
  <link rel="alternate" type="application/rss+xml" title="Spyder's Blog" href="{siteUrl}feed.xml">
</svelte:head>

<div class="container">
  <h1 class="text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32">
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
              <a class="post-link" href="{base}/{route}/{post.path}" title={post.meta.title}>
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
            <p class="text-gray-700 dark:text-gray-300 font-light">{post.meta.summary}</p>
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