<script>
  import { socials } from "$lib/config";

  import Divider from "$lib/components/Divider.svelte";
  import Button from "$lib/components/Button.svelte";
  import FooterContent from "$lib/content/footer-content.md";

  const socialIcons = new Map(Object.entries(socials));
</script>

<!-- Footer -->
<footer
  class="relative
    mt-28
    pt-28
    pb-14
    text-sm
    text-center
  text-mine-shaft-500
  dark:text-mine-shaft-300
  bg-quill-gray-200
  dark:bg-mine-shaft-900"
>
  <div class="container">
    <Divider />
    <h2 class="text-red-berry-900">Connect with us on</h2>
    <div class="icon-bar mx-auto mt-4 mb-5 flex items-center justify-center gap-4">
      {#each socialIcons as [icon, href]}
        <Button {icon} {href} button={false} target="_blank" />
      {/each}
    </div>
    <div class="max-w-md mx-auto text-xs">
      <FooterContent />
    </div>
  </div>
</footer>
