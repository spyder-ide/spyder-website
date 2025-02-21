<script lang="ts">
  import "../app.css";

  import { waitLocale, _ } from "svelte-i18n";

  import { siteUrl, ogImage } from "$lib/config";

  import Header from "$lib/blocks/Header.svelte";
  import Footer from "$lib/blocks/Footer.svelte";
  import Loader from "$lib/components/Loader.svelte";
</script>

<svelte:head>
  <title>{$_('config.site.title') || 'Spyder'} | {$_('config.site.subtitle') || 'The Python IDE that scientists and data analysts deserve'}</title>
  <meta name="description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta name="keywords" content={'Python, IDE, Scientific Computing, Data Analysis, Spyder, Jupyter, PyCharm, VSCode'} />
  <meta name="author" content={$_('config.site.author') || 'Spyder Website Contributors'} />
  <link rel="canonical" href={siteUrl} />
  <meta property="og:title" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:site_name" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={ogImage} />
  {#if ogImage.startsWith('https')}
    <meta property="og:image:secure_url" content={ogImage} />
  {/if}
  <meta property="og:image:alt" content={$_('config.site.title') || 'Spyder'} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@spyder_ide" />
  <meta name="twitter:creator" content="@spyder_ide" />
  <meta name="twitter:title" content={$_('config.site.title') || 'Spyder'} />
  <meta name="twitter:description" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={$_('config.site.description') || 'Get the ease of use of Jupyter along with many advanced features found in PyCharm and VSCode in a single programming environment'} />
</svelte:head>

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
