<script>
  import BlogPage from "$lib/blocks/BlogPage.svelte";
  import Metadata from "$lib/components/Metadata.svelte";
  import { _ } from "svelte-i18n";
  import { siteUrl, ogImageBlog } from "$lib/config";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Metadata
  title="Spyder | Blog"
  description={$_("config.blog.description") || "Official blog of the Spyder IDE project with announcements, tutorials, and development updates."}
  keywords="Python, IDE, Scientific Programming, Data Science, Development, Spyder IDE"
  author="Spyder Team"
  url={`${siteUrl}/blog`}
  image={ogImageBlog}
/>

<BlogPage {data} />
