<script>
  import SvelteSeo from "svelte-seo";
  import { siteUrl } from "$lib/config";
  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";
  import { page } from "$app/stores";

  // Props from markdown
  // svelte-ignore unused-export-let
  export let data, form, title, author, tags, category, pub_date, summary;

  // Initialize variables
  let authorsMetadata = [];
  
  // Load authors metadata
  $: {
    let postAuthors = Array.isArray(author) ? author : (author ? [author] : []);
    if (postAuthors.length > 0) {
      fetchAuthorsMetadata(postAuthors).then(metadata => {
        authorsMetadata = metadata;
      });
    }
  }
</script>

<svelte:head>
  <title>Spyder | {title}</title>
  <meta property="og:title" content="Spyder | {title}" />
  <meta property="og:description" content={summary} />
  <meta property="og:image" content={$page.data.ogImage} />
  <meta property="og:url" content={`${siteUrl}/blog/${$page.data.slug}`} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Spyder" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@spyder_ide" />
  <meta name="twitter:title" content="Spyder | {title}" />
  <meta name="twitter:description" content={summary} />
  <meta name="twitter:image" content={$page.data.ogImage} />
</svelte:head>

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
