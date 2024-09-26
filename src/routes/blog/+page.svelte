<script>
  import { metadata } from "$lib/store";
  import { title } from "$lib/config";

  import Blog from "$lib/blocks/Blog.svelte";

  export let data;

  let pageNum, totalPages;

  $: pageNum = data.props.pageNum;
  $: totalPages = data.props.totalPages;
</script>

<Blog {data} {pageNum} {totalPages} />

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description} />
  <meta name="keywords" content={$metadata.keywords} />
  <meta name="author" content={$metadata.author} />
  <link rel="canonical" href={$metadata.url} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={$metadata.url} />
  <meta property="og:title" content={$metadata.title} />
  <meta property="og:description" content={$metadata.description} />
  <meta property="og:image" content={$metadata.image} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={title} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content={$metadata.site} />
  <meta name="twitter:url" content={$metadata.url} />
  <meta name="twitter:title" content={$metadata.title} />
  <meta name="twitter:description" content={$metadata.description} />
  <meta name="twitter:image" content={$metadata.image} />
  <meta name="twitter:image:alt" content={$metadata.title} />
</svelte:head>
