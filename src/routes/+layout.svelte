<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { metadata } from '$lib/store/metadata';
  import { createWebsiteMetadata } from '$lib/metadata/utils';
  import { waitLocale } from "svelte-i18n";
  import Header from "$lib/blocks/Header.svelte";
  import Footer from "$lib/blocks/Footer.svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  import "../app.css";

  let loaded = false;

  // Initialize metadata with default website metadata
  onMount(() => {
    metadata.set(createWebsiteMetadata({
      url: $page.url.href
    }));
  });
</script>

<Metadata />

{#await waitLocale()}
  <div class="layout grid h-full">
    <Header />
    <main class="grid grid-flow-row gap-16 xl:gap-32">
      <Loader />
    </main>
    <Footer />
  </div>
{:then}
  <div class="layout grid h-full">
    <Header />
    <main class="grid grid-flow-row gap-16 xl:gap-32">
      <slot />
    </main>
    <Footer />
  </div>
{:catch error}
  <div class="layout grid h-full">
    <div class="flex items-center justify-center h-screen">
      <div>Error loading translations: {error.message}</div>
    </div>
  </div>
{/await}

<style>
  .layout {
    grid-template-rows: auto 1fr auto;
  }
</style>
