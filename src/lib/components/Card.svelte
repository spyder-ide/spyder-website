<script>
  import DynamicIcon from "$lib/components/DynamicIcon.svelte";
  import Image from "$lib/components/Image.svelte";

  export let aspect = "";
  export let innerColumn;
  export let classes = "";
</script>

<div
  class="text-red-berry-900 flex flex-col items-center justify-center text-center {aspect}"
>
  {#if innerColumn.icon}
    <DynamicIcon icon={innerColumn.icon} size="48" />
  {:else if innerColumn.imgSrc}
    <Image figure={false} imgSrc={innerColumn.imgSrc} contain={true} {classes} />
  {/if}
  {#if innerColumn.title}
    <h2 class="text-3xl mt-4">{innerColumn.title}</h2>
  {/if}
  {#if innerColumn.content}
    <p class="text-neutral-500">
      {@html innerColumn.content}
    </p>
  {/if}
</div>
