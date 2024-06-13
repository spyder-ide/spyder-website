<script>
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";
  import { metadata } from "$lib/store";
  import { formattedPubDate, fetchAuthorMetadata } from "$lib/utils";

  import {
    title as siteTitle,
    author as siteAuthor,
    blogTitle,
    description as blogDescription,
    keywords as blogKeywords,
  } from "$lib/config";

  import Loader from "$lib/components/Loader.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  export let data = {};
  export let pageNum = 0;
  export let totalPages = 1;

  let posts = [];
  let route = "blog"

  async function loadPosts() {
    const postPromises = data.props.posts.map(async (post) => {
      let authorMetadata = {};
      if (typeof window !== "undefined") {
        authorMetadata = await fetchAuthorMetadata(post.meta.author);
      }
      return { ...post, authorMetadata };
    });

    posts = await Promise.all(postPromises);
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;
  }

  onMount(() => {
    metadata.setMetadata({
      title: `${siteTitle} | ${blogTitle}`,
      description: blogDescription,
      keywords: blogKeywords.join(", "),
      author: siteAuthor,
    });
  });

  onDestroy(() => {
    metadata.reset();
  });

  $: if (pageNum) loadPosts();
</script>

<div class="container">
  <h1 class="text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-32">
    {blogTitle}
  </h1>

  <section class="container max-w-3xl">
    {#if posts.length !== 0}
      <div class="grid grid-flow-row gap-24">
        {#each posts as post}
          <article>
            <h2 class="text-3xl font-light">
              <a href="{base}/{route}/{post.path}" title={post.meta.title}>
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
            <p>{post.meta.summary}</p>
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
    {:else}
      <Loader classes="fill-black dark:fill-white" />
    {/if}
  </section>

</div>