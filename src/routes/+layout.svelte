<script>
	import { onMount, onDestroy } from "svelte";
	import { metadata } from "$lib/store";
	import {
		title as siteTitle,
    author as siteAuthor,
    description as siteDescription,
    keywords as siteKeywords,
  } from "$lib/config";

	import Header from '$lib/blocks/Header.svelte'
	import Footer from '$lib/blocks/Footer.svelte'
  import "../app.css";

	onMount(() => {
    metadata.setMetadata({
      title: `${siteTitle} | ${siteDescription}`,
      description: siteDescription,
      keywords: siteKeywords.join(", "),
      author: siteAuthor,
    });
	});

	onDestroy(() => {
    metadata.reset();
  });
</script>

<svelte:head>
  <title>{$metadata.title}</title>
  <meta name="description" content={$metadata.description}>
  <meta name="keywords" content={$metadata.keywords}>
  <meta name="author" content={$metadata.author}>
</svelte:head>

<div class="layout grid h-full">
  <!-- Header -->
	<Header />
  <!-- End Header -->

	<!-- Main content -->
	<main class="grid grid-flow-row gap-20 lg:gap-40">
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
