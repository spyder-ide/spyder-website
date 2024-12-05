<script>
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { metadata } from "$lib/store";
  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";

  import Loader from "$lib/components/Loader.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  import {
    siteUrl,
    title as siteTitle,
    author as siteAuthor,
    blogTitle,
    description as blogDescription,
    keywords as blogKeywords,
    blogPublishedOn,
    blogReadMore,
    blogError,
    blogMetadataError,
    blogSlug,
    ogImageBlog,
    socials
  } from "$lib/config";

  export let data, pageNum, totalPages;

  let postsWithAuthor = [];
  const site = `@${socials.twitter.split("/").pop()}`;

  $: metadata.setMetadata({
    title: `${siteTitle} | ${blogTitle}`,
    description: blogDescription,
    keywords: blogKeywords.join(", "),
    author: siteAuthor,
    image: ogImageBlog,
    site,
    url: siteUrl,
  });

  $: ({ posts, pageNum, totalPages } = data.props);

  $: if (posts) {
    postsWithAuthor = (async () => {
      return Promise.all(
        posts.map(async (post) => {
          if (browser) {
            try {
              // Ensure post.meta.author is an array
              const authorsArray = Array.isArray(post.meta.author) ? post.meta.author : [post.meta.author];
              const authorMetadata = await fetchAuthorsMetadata(authorsArray);
              return { ...post, authorMetadata };
            } catch (error) {
              console.error(blogMetadataError, error);
              return { ...post, authorMetadata: [] };
            }
          }
          return post;
        }),
      );
    })();
  }
</script>

<Metadata/>

<div class="container">
  <h1
    class="text-4xl
      xl:tracking-tight
      xl:text-6xl
      text-center
      tracking-tight
      font-extralight
      text-mine-shaft-600
      dark:text-mine-shaft-200
      my-16 md:my-32"
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
            <h2 class="text-xl md:text-2xl xl:text-3xl font-light text-balance">
              <a
                class="post-link"
                href="{base}/{blogSlug}/{post.path}"
                title={post.meta.title}
              >
                {post.meta.title}
              </a>
            </h2>
            {#if post.authorMetadata}
              <div class="flex gap-4 items-center my-4">
                {#each post.authorMetadata as author}
                  <img
                    class="w-12 h-12 rounded-full object-cover bg-white"
                    src={author.src}
                    alt={author.name}
                  />
                {/each}
                <div>
                  <div class="flex gap-2 names">
                    {#each post.authorMetadata as author}
                      <p>{author.name}</p>
                    {/each}
                  </div>
                  <small>
                    {blogPublishedOn} {formattedPubDate(post.meta.pub_date)}
                  </small>
                </div>
              </div>
            {/if}
            <p class="text-gray-700 dark:text-gray-300 font-light">
              {post.meta.summary}
            </p>
            <a
              class="block text-right mt-4"
              href="{base}/{blogSlug}/{post.path}"
              title={post.meta.title}
            >
              {blogReadMore}&hellip;
            </a>
          </article>
        {/each}
      </div>
      <Pagination {pageNum} {totalPages} route={blogSlug} />
    {:catch error}
      <p>{blogError}: {error.message}</p>
    {/await}
  </section>
</div>

<style>
  .names p::after {
    content: ", ";
  }
  .names p:nth-last-child(2)::after {
    content: " & ";
  }
  .names p:last-child::after {
    content: "";
  }
</style>