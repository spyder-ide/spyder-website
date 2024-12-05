<script>
  import { socials, footerTitle } from "$lib/config";

  import Divider from "$lib/components/Divider.svelte";
  import Button from "$lib/components/Button.svelte";
  import FooterContent from "$lib/data/footer-content.md";

  const socialIcons = new Map(Object.entries(socials));

</script>

<!-- Footer -->
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
    <h2 class="text-red-berry-900 dark:text-neutral-400">{footerTitle}</h2>
    <div class="icon-bar mx-auto mt-4 mb-5 flex items-center justify-center gap-4">
      {#each socialIcons as [icon, href]}
        <Button {icon} {href} button={false} target="_blank" iconSize={24} />
      {/each}
    </div>
    <div class="max-w-md mx-auto text-sm">
      <FooterContent />
    </div>
  </div>
</footer>
