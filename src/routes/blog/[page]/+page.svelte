<script>
  import { _, json } from "svelte-i18n"

  import { metadata } from "$lib/store";
  import { siteUrl, ogImageBlog } from "$lib/config";

  import Blog from "$lib/blocks/Blog.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let pageNum, totalPages, title, subtitle, description, keywords, author;

  $: {
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;
    title = $_('config.site.title');
    subtitle = $_('config.site.subtitle');
    description = $_('config.site.description');
    keywords = $json('config.site.keywords');
    author = $_('config.site.author');

    metadata.setMetadata({
      title: `${title} | ${subtitle}`,
      description,
      keywords: keywords.join(", "),
      author,
      url: siteUrl,
      image: ogImageBlog,
    });
  }
</script>

<Blog {data} {pageNum} {totalPages} />
