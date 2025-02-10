<script>
  import { _, json } from "svelte-i18n"
  import { metadata } from "$lib/store";
  import { siteUrl, ogImageBlog, config } from "$lib/config";
  import Blog from "$lib/blocks/Blog.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  // Page metadata
  let pageNum, totalPages, title, subtitle, description, keywords, author;

  $: {
    // Extract page data
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;

    // Load page metadata
    title = $_('config.site.title');
    subtitle = $_('config.site.subtitle');
    description = $_('config.site.description');
    keywords = config.site.keywords;
    author = $_('config.site.author');

    // Update metadata
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
