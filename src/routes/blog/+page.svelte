<script>
  import BlogPage from "$lib/blocks/BlogPage.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<BlogPage {data} />
