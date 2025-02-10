<script>
  import DynamicIcon from "$lib/components/DynamicIcon.svelte";
  import Image from "$lib/components/Image.svelte";

  export let innerColumn;
  export let aspect = "";
  export let classes = "";
  export let size = 48;
</script>

<div
  class="text-red-berry-900 dark:text-neutral-300 flex flex-col items-center justify-center text-center {aspect}"
>
  {#if innerColumn.icon}
    <DynamicIcon icon={innerColumn.icon} {size} />
  {:else if innerColumn.imgSrc}
    <Image
      figure={false}
      imgSrc={innerColumn.imgSrc}
      imgSrcDark={innerColumn.imgSrcDark}
      imgAlt={innerColumn.imgAlt}
      contain={true}
      {classes}
    />
  {/if}
  {#if innerColumn.title}
    <h2 class="text-3xl mt-4">{innerColumn.title}</h2>
  {/if}
  {#if innerColumn.content}
    <p class="text-neutral-500 text-lg">
      {@html innerColumn.content}
    </p>
  {/if}
</div>
