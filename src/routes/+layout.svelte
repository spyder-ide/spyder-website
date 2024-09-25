<script>
  import Header from "$lib/blocks/Header.svelte";
  import Footer from "$lib/blocks/Footer.svelte";

  import "../app.css";
</script>

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
