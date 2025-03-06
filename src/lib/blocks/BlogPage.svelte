<script>
  import Blog from "$lib/blocks/Blog.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  // Page metadata
  let pageNum, totalPages;

  $: {
    // Extract page data
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;
  }
</script>

<Metadata {...data.metadata} />

<Blog {data} {pageNum} {totalPages} />
