<script>
  import { _ } from "svelte-i18n";

  import { base } from "$app/paths";
  import Button from "./Button.svelte";

  export let pageNum;
  export let totalPages;
  export let route;
</script>

<nav class="flex items-center justify-evenly m-16">
  {#if pageNum > 1}
    <Button
      icon="chevronLeft"
      href="{base}/{route}/{pageNum - 1}"
      text="{$_('config.blog.previous')}"
      iconPosition="left"
      highlight={true}
    />
  {/if}
  {#if pageNum < totalPages}
    <Button
      icon="chevronRight"
      href="{base}/{route}/{pageNum + 1}"
      text="{$_('config.blog.next')}"
      iconPosition="right"
      highlight={true}
    />
  {/if}
</nav>
