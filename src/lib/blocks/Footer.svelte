<script>
  import { _, waitLocale } from "svelte-i18n";

  import Loader from "$lib/components/Loader.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import SocialIcons from "$lib/components/SocialIcons.svelte";

  let footerTitle, footerContent;

  $: {
    footerTitle = $_("config.site.footer.title");
    footerContent = $_("config.site.footer.content");
  }
</script>

<!-- Footer -->
{#await waitLocale()}
  <Loader />
{:then}
  <footer
    class="relative
    mt-28
    pb-14
    text-md
    text-center
    text-mine-shaft-500
    dark:text-mine-shaft-300
    bg-quill-gray-200
    dark:bg-mine-shaft-900"
  >
    <Divider />
    <div class="container mt-14">
      <h2 class="text-red-berry-900 dark:text-neutral-400">
        {footerTitle}
      </h2>
      <SocialIcons />
      <div class="max-w-md mx-auto text-sm">
        {@html footerContent}
      </div>
    </div>
  </footer>
{/await}
