<script>
  import "../app.css";
  
  import { waitLocale } from "svelte-i18n";

  import Header from "$lib/blocks/Header.svelte";
  import Footer from "$lib/blocks/Footer.svelte";
  import Loader from "$lib/components/Loader.svelte";
</script>

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
