<script>
  import BlogPage from "$lib/blocks/BlogPage.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Metadata />

<BlogPage {data} />
