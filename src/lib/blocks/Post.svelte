<script>
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { metadata } from "$lib/store";
  import { title as siteTitle, ogImageBlog, socials } from "$lib/config";
  import { formattedPubDate, fetchAuthorMetadata } from "$lib/utils";

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

  let authorMetadata = { src: "", name: "" };
  let site = `@${socials.twitter.split("/").pop()}`;

  onMount(async () => {
    authorMetadata = await fetchAuthorMetadata(author);
  });

  $: metadata.setMetadata({
    title: `${siteTitle} | ${title}`,
    description: summary,
    keywords: `${tags}, ${category}`,
    author: authorMetadata.name || author,
    url: $page.url.href,
    image: ogImageBlog,
  });
</script>

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description} />
  <meta name="keywords" content={$metadata.keywords} />
  <meta name="author" content={$metadata.author} />
  <link rel="canonical" href={$metadata.url} />
  <link
    rel="alternate"
    type="application/rss+xml"
    title="Spyder's Blog"
    href="{$metadata.url}feed.xml"
  />

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
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={$page.url.host} />
  <meta property="twitter:url" content={$metadata.url} />
  <meta name="twitter:site" content={$metadata.site} />
  <meta name="twitter:title" content={$metadata.title} />
  <meta name="twitter:description" content={$metadata.description} />
  <meta name="twitter:image" content={$metadata.image} />
  <meta name="twitter:image:alt" content={$metadata.title} />

  <!-- Nord stylesheet for code blocks with prism -->
  <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css" />
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
    <div class="max-w-[72ch] mx-auto flex flex-col items-center gap-4 mt-20">
      {#if authorMetadata.src}
        <img
          class="w-24 h-24 rounded-full object-cover"
          src={authorMetadata.src}
          alt={author}
        />
      {/if}
      <div class="font-light text-center">
        {authorMetadata.name || author}
        <div class="text-neutral-500 text-xs font-medium">
          {formattedPubDate(pub_date)}
        </div>
      </div>
    </div>
  </div>
  <div
    class="prose
    prose-lg
    dark:prose-invert
    prose-headings:font-medium
    prose-p:font-light
    max-w-[72ch]
    mx-auto"
  >
    <slot />
  </div>
</article>
