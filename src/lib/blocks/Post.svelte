<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from "svelte";

  import { page } from "$app/stores";

  import { metadata } from "$lib/store";
  import { siteUrl, ogImageBlog } from "$lib/config";
  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";

  import Metadata from "$lib/components/Metadata.svelte";

  /** @type {import('./$types').PageData} */
  // svelte-ignore unused-export-let
  export let data;
  // svelte-ignore unused-export-let
  export let form;

  // Props from markdown
  export let title;
  export let pub_date;
  export let author;
  export let tags;
  export let category;
  export let summary;

  // Initialize variables
  let siteTitle;
  let authorsMetadata = [];

  const slug = $page.url.pathname.replace(`/blog`, '').replaceAll('/', '');
  const customOgImagePath = `${siteUrl}/assets/og/${slug}.png`;

  onMount(async () => {
    const postAuthors = Array.isArray(author) ? author : (author ? [author] : []);
    authorsMetadata = await fetchAuthorsMetadata(postAuthors);
  });

  $: {
    siteTitle = $_('config.site.title');
    metadata.setMetadata({
      title: `${siteTitle} | ${title}`,
      description: summary,
      keywords: `${tags}, ${category}`,
      author: authorsMetadata.map(a => a.name).join(', ') || (author || ''),
      url: $page.url.href,
      image: customOgImagePath || ogImageBlog,
    });
  }

</script>

<article class="container">
  <div class="my-20 xl:mt-32 xl:mb-20">
    <h1
      class="text-2xl
      md:text-4xl
      lg:tracking-tight
      xl:text-6xl
      text-center
      font-light
      md:font-extralight
      tracking-tight
      text-balance
      text-mine-shaft-600
      dark:text-mine-shaft-200"
    >
      {title}
    </h1>
    <div class="text-neutral-500 text-center text-xl mt-4">
      {formattedPubDate(pub_date)}
    </div>
    <div class="max-w-[72ch] mx-auto flex flex-col items-center gap-4 mt-20">
      <div class="flex gap-8">
        {#each authorsMetadata as author}
          <div class="flex flex-col items-center gap-2">
            {#if author.src}
              <img class="w-24 h-24 rounded-full object-cover" src={author.src} alt={author.name} />
            {/if}
            <div class="font-light text-center w-36">
              {author.name}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div
    class="prose
    prose-lg
    prose-headings:text-red-berry-900
    dark:prose-headings:text-mine-shaft-200
    dark:prose-invert
    prose-headings:font-medium
    prose-p:font-light
    prose-p:text-pretty
    prose-li:font-light
    max-w-[72ch]
    mx-auto"
  >
    <slot />
  </div>
</article>
