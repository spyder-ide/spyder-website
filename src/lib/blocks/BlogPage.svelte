<script>
  import { page } from "$app/stores";
  import Blog from "$lib/blocks/Blog.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  import { config, ogImage } from "$lib/config";
  import { metadata } from "$lib/store";
  import { _ } from "svelte-i18n";

  /** @type {import('./$types').PageData} */
  export let data;

  // Page metadata
  let pageNum, totalPages;
  let title, subtitle, description, keywords;

  $: {
    // Extract page data
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;
    
    // Set blog-specific metadata
    title = $_("config.site.title");
    subtitle = "Blog";
    description = $_("config.site.description");
    keywords = config.site?.keywords ?? [];
    
    // Set complete metadata
    metadata.setMetadata({
      ...data.metadata,
      title: `${title} | ${subtitle}`,
      description: description,
      keywords: keywords.join(", "),
      url: $page.url.href,
      image: ogImage,
    });
  }
</script>

<Metadata />

<Blog {data} {pageNum} {totalPages} />
