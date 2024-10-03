<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { metadata } from "$lib/store";
  import { title as siteTitle, siteUrl, ogSlug, blogSlug, ogImageBlog } from "$lib/config";
  import { formattedPubDate, fetchAuthorMetadata } from "$lib/utils";
  import { base } from '$app/paths';

  import Metadata from "$lib/components/Metadata.svelte";

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
  const slug = $page.url.pathname.replace(`/${blogSlug}`, '').replaceAll('/', '');
  const customOgImagePath = `${siteUrl}assets/${ogSlug}/${slug}.png`;

  onMount(async () => {
    authorMetadata = await fetchAuthorMetadata(author);
  });

  $: metadata.setMetadata({
    title: `${siteTitle} | ${title}`,
    description: summary,
    keywords: `${tags}, ${category}`,
    author: authorMetadata.name || author,
    url: $page.url.href,
    image: customOgImagePath || ogImageBlog,
  });

  // Debugging, remove later
  console.log('Custom OG Image Path:', customOgImagePath);
  console.log('Page:', $page);
  console.log('Page URL:', $page.url.href);
</script>

<Metadata prism={true}/>

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
