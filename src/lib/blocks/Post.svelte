<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from "svelte";

  import { siteUrl } from "$lib/config";
  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";

  /** @type {import('./$types').PageData} */
  // svelte-ignore unused-export-let
  export let data;
  // svelte-ignore unused-export-let
  export let form;

  // Props from markdown
  export let title = "";
  export let author = [];
  export let tags = [];
  export let category = "";
  export let pub_date = "";
  export let summary = "";
  export let slug = "";

  // Initialize variables
  let authorsMetadata = [];

  const customOgImagePath = `${siteUrl}/assets/og/${slug}.png`;

  onMount(async () => {
    const postAuthors = Array.isArray(author) ? author : (author ? [author] : []);
    authorsMetadata = await fetchAuthorsMetadata(postAuthors);
  });
</script>

<svelte:head>
  <title>Spyder | {title}</title>
  <meta name="description" content={summary} />
  <meta name="keywords" content={tags} />
  <meta name="author" content={Array.isArray(author) ? author.join(', ') : author} />

  <!-- OpenGraph -->
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Spyder | {title}" />
  <meta property="og:description" content={summary} />
  <meta property="og:url" content={`${siteUrl}/blog/${slug}`} />
  <meta property="og:image" content={customOgImagePath} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {#if customOgImagePath.startsWith('https')}
    <meta property="og:image:secure_url" content={customOgImagePath} />
  {/if}
  <meta property="og:site_name" content="Spyder IDE" />
  <meta property="og:locale" content="en_US" />
  <meta property="article:published_time" content={pub_date} />
  <meta property="article:section" content={category} />
  {#each tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@spyder_ide" />
  <meta name="twitter:creator" content="@spyder_ide" />
  <meta name="twitter:title" content="Spyder | {title}" />
  <meta name="twitter:description" content={summary} />
  <meta name="twitter:image" content={customOgImagePath} />
  <meta name="twitter:image:alt" content={title} />

  <!-- Canonical and RSS -->
  <link rel="canonical" href={`${siteUrl}/blog/${slug}`} />
  <link rel="alternate" type="application/rss+xml" title="Spyder's Blog" href={`${siteUrl}/blog/feed.xml`} />
  <link rel="stylesheet" href="/assets/vendor/prism/prism-nord.css" />

  <!-- JSON-LD Structured Data -->
  {@html `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${title}",
        "description": "${summary}",
        "image": "${customOgImagePath}",
        "datePublished": "${pub_date}",
        "author": ${JSON.stringify(Array.isArray(author) ? author.map(a => ({
          "@type": "Person",
          "name": a
        })) : [{ "@type": "Person", "name": author }])},
        "publisher": {
          "@type": "Organization",
          "name": "Spyder IDE",
          "logo": {
            "@type": "ImageObject",
            "url": "${siteUrl}/assets/images/spyder-logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${siteUrl}/blog/${slug}"
        }
      }
    </script>
  `}
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
