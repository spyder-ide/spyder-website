<script>
  import { _, json } from "svelte-i18n"

  import { metadata } from "$lib/store/metadata";
  import { siteUrl, ogImageBlog, config } from "$lib/config";

  import BlogPage from "$lib/blocks/BlogPage.svelte";
  import { createWebsiteMetadata } from "$lib/metadata/utils";

  /** @type {import('./$types').PageData} */
  export let data;

  let pageNum, totalPages, title, subtitle, description, keywords, author;

  $: {
    pageNum = data.props.pageNum;
    totalPages = data.props.totalPages;
    title = $_('config.site.title');
    subtitle = $_('config.site.subtitle');
    description = $_('config.site.description');
    author = $_('config.site.author');
    keywords = config.site.keywords;

    metadata.set(createWebsiteMetadata({
      title: `${title} | ${subtitle}`,
      description,
      keywords: keywords.join(", "),
      author,
      url: siteUrl,
      image: ogImageBlog,
    }));
  }
</script>

<BlogPage {data} />
