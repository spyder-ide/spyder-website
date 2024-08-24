<script>
  import { onMount, onDestroy } from "svelte";
  import { base } from "$app/paths";
  import { metadata } from "$lib/store";
  import { title as siteTitle } from "$lib/config";
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
  export let src = "";
  export let name = "";

  // Fetch the author's metadata dynamically
  onMount(async () => {
    const fetchedMetadata = await fetchAuthorMetadata(author);
    metadata.setMetadata({
      title: `${siteTitle} | ${title}`,
      description: summary,
      keywords: `${tags}, ${category}`,
      author: fetchedMetadata ? fetchedMetadata.name : "",
    });
    src = fetchedMetadata.src;
    name = fetchedMetadata.name;
  });

  // Resets the metadata when the component is destroyed
  onDestroy(() => {
    metadata.reset();
  });
</script>

<svelte:head>
  <!-- Load Prism for syntax highlighting -->
  <link rel="stylesheet" href="{base}/assets/vendor/prism/prism-nord.css">
</svelte:head>

<article class="container">
  <div class="my-20 xl:mt-32 xl:mb-20">
    <h1
      class="text-2xl md:text-4xl lg:tracking-tight xl:text-6xl text-center font-light md:font-extralight tracking-tight text-mine-shaft-600 dark:text-mine-shaft-200"
    >
      {title}
    </h1>
    <div class="max-w-[72ch] mx-auto flex flex-col items-center gap-4 mt-20">
      <img class="w-24 h-24 rounded-full object-cover" {src} alt={author} />
      <div class="font-light text-center">
        {name}
        <div class="text-neutral-500 text-xs font-medium">
          {formattedPubDate(pub_date)}
        </div>
      </div>
    </div>
  </div>
  <div
    class="prose prose-lg dark:prose-invert prose-headings:font-medium prose-p:font-light max-w-[72ch] mx-auto"
  >
    <slot />
  </div>
</article>
