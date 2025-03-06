<script>
  import { page } from "$app/stores";
  import { config, ogImage } from "$lib/config";
  import { metadata } from "$lib/store";
  import { _ } from "svelte-i18n";

  import BlogPage from "$lib/blocks/BlogPage.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  
  /** @type {import('./$types').PageData} */
  export let data;

  $: title = $_("config.site.title");
  $: description = $_("config.site.description");
  $: pageTitle = "Blog";
  $: keywords = config.site?.keywords ?? [];

  $: metadata.setMetadata({
    title: `${title} | ${pageTitle}`,
    description: description,
    keywords: keywords.join(", "),
    url: $page.url.href,
    image: ogImage,
  });
</script>

<Metadata />

<BlogPage {data} />
