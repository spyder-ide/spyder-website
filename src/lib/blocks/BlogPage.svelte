<script>
  import { _ } from "svelte-i18n";
  import Blog from "$lib/blocks/Blog.svelte";

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

<Blog {data} {pageNum} {totalPages} />
