<script>
  import { _, waitLocale, locale } from "svelte-i18n";

  import { browser } from "$app/environment";
  import { base } from "$app/paths";

  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";

  import Loader from "$lib/components/Loader.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  import { config } from "$lib/config";

  /** @type {import('./$types').PageData} */
  export let data;

  export let pageNum, totalPages;

  let postsWithAuthor = [];
  let site, socials, posts;

  $: {
    socials = config.site.socials;
    site = `@${socials.twitter.split("/").pop()}`;
    ({ posts, pageNum, totalPages } = data.props);

    if (posts) {
      postsWithAuthor = (async () => {
        return Promise.all(
          posts.map(async (post) => {
            if (browser) {
              try {
                // Ensure post.meta.author is an array
                const authorsArray = Array.isArray(post.meta.author)
                  ? post.meta.author
                  : [post.meta.author];
                const authorMetadata = await fetchAuthorsMetadata(authorsArray);
                return { ...post, authorMetadata };
              } catch (error) {
                console.error($_("config.blog.metadataError"), error);
                return { ...post, authorMetadata: [] };
              }
            }
            return post;
          }),
        );
      })();
    }
  }
</script>

{#await waitLocale()}
  <Loader />
{:then}
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
      {$_("config.blog.title")}
    </h1>

    <section class="max-w-3xl mx-auto">
      {#await postsWithAuthor}
        <Loader classes="fill-black dark:fill-white" />
      {:then loadedPosts}
        <div class="grid grid-flow-row gap-24">
          {#each loadedPosts as post}
            <article>
              <h2
                class="text-xl md:text-2xl xl:text-3xl font-light text-balance"
              >
                <a
                  class="post-link"
                  href="{base}/blog/{post.path}"
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
                      {$_("config.blog.publishedOn")}
                      {formattedPubDate(post.meta.pub_date, $locale)}
                    </small>
                  </div>
                </div>
              {/if}
              <p class="text-gray-700 dark:text-gray-300 font-light">
                {post.meta.summary}
              </p>
              <a
                class="block text-right mt-4"
                href="{base}/blog/{post.path}"
                title={post.meta.title}
              >
                {$_("config.blog.readMore")}&hellip;
              </a>
            </article>
          {/each}
        </div>
        <Pagination {pageNum} {totalPages} route="blog" />
      {:catch error}
        <p>{$_("config.blog.error")}: {error.message}</p>
      {/await}
    </section>
  </div>
{/await}

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
