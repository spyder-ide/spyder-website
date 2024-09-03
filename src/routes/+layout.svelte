<script>
    import { onMount, onDestroy } from "svelte";
    import { metadata } from "$lib/store";

    import {
        title as siteTitle,
        author as siteAuthor,
        description as siteDescription,
        keywords as siteKeywords,
    } from "$lib/config";

    import Header from "$lib/blocks/Header.svelte";
    import Footer from "$lib/blocks/Footer.svelte";
    import "../app.css";

    onMount(() => {
        metadata.setMetadata({
            title: `${siteTitle} | ${siteDescription}`,
            description: siteDescription,
            keywords: siteKeywords.join(", "),
            author: siteAuthor,
        });
    });
</script>

<svelte:head>
    <title>{$metadata.title}</title>
    <meta name="description" content={$metadata.description} />
    <meta name="keywords" content={$metadata.keywords} />
    <meta name="author" content={$metadata.author} />
    <meta name="og:locale" property="og:locale" content="en_US">
    <meta name="og:site_name" property="og:site_name" content={siteTitle}>
    <meta name="og:title" property="og:title" content={$metadata.title}>
    <meta name="og:updated_time" property="og:updated_time" content="1714338554">
    <meta name="og:type" property="og:type" content="website">
    <meta name="og:image" property="og:image" content="https://www.spyder-ide.org/assets/media/website_screenshot.webp">
    <meta name="og:image:width" property="og:image:width" content="1920">
    <meta name="og:image:height" property="og:image:height" content="995">
    <meta name="og:url" property="og:url" content="https://www.spyder-ide.org/">
    <meta name="og:description" property="og:description" content={$metadata.description}>
</svelte:head>

<div class="layout grid h-full">
    <!-- Header -->
    <Header />
    <!-- End Header -->

    <!-- Main content -->
    <main class="grid grid-flow-row gap-16 xl:gap-32">
        <slot />
    </main>
    <!-- End Main content -->

    <!-- Footer -->
    <Footer />
    <!-- End Footer -->
</div>

<style>
    .layout {
        grid-template-rows: auto 1fr auto;
    }
</style>
