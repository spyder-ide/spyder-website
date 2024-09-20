<script>
    import { metadata } from "$lib/store";

    import Header from "$lib/blocks/Header.svelte";
    import Footer from "$lib/blocks/Footer.svelte";

    import "../app.css";

    import {
        siteUrl,
        title as siteTitle,
        author as siteAuthor,
        description as siteDescription,
        keywords as siteKeywords,
        comment
    } from "$lib/config";

    // Allow pages to override default metadata
    export let data = {};

    $: title = data.title || `${siteTitle} | ${siteDescription}`;
    $: description = data.description || comment;
    $: keywords = data.keywords || siteKeywords.join(", ");
    $: image = data.image || "assets/media/website_screenshot.png";
    $: fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    $: metadata.setMetadata({
        title,
        description,
        keywords,
        author: siteAuthor,
        url: siteUrl,
        image: fullImageUrl
    });
</script>

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
    <meta property="og:site_name" content={siteTitle} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={$metadata.url} />
    <meta name="twitter:title" content={$metadata.title} />
    <meta name="twitter:description" content={$metadata.description} />
    <meta name="twitter:image" content={$metadata.image} />
    <meta name="twitter:image:alt" content={`${$metadata.title} | ${$metadata.description}`} />
</svelte:head>

<div class="layout grid h-full">
    <Header />
    <main class="grid grid-flow-row gap-16 xl:gap-32">
        <slot />
    </main>
    <Footer />
</div>

<style>
    .layout {
        grid-template-rows: auto 1fr auto;
    }
</style>
