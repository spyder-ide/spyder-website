<script>
  import Blog from "$lib/blocks/Blog.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let pageNum, totalPages;

  $: pageNum = data.props.pageNum;
  $: totalPages = data.props.totalPages;
</script>

<Blog {data} {pageNum} {totalPages} />

