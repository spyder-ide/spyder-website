<script>
  import Button from "./Button.svelte";

  export let content = "";
  export let buttons = undefined;
  export let columns = true;
</script>

<div class={columns ? "col-span-full lg:col-span-4" : "col-span-full"}>
  {#if content}
    <div
      class={`prose prose-h2:text-lg prose-h1:text-xl prose-headings:font-light prose-headings:tracking-tight
        prose-headings:text-gray-700 prose-headings:dark:text-neutral-300
        prose-p:font-light prose-p:text-base prose-p:text-gray-700 prose-p:dark:text-gray-300
        ${columns ? "max-w-full" : "mt-8 md:mt-24 text-center max-w-2xl mx-auto"}`}
    >
      {#if typeof content !== "object"}
        <slot />
      {:else}
        {#if content.title}
          {#if content.titleTag}
            <svelte:element this={content.titleTag}>
              {content.title}
            </svelte:element>
          {:else}
            <h2>{content.title}</h2>
          {/if}
        {/if}
        {#if content.text}
          {@html content.text}
        {/if}
      {/if}
    </div>
  {/if}
  {#if buttons}
    {#if buttons.length > 1}
      <div
        class={`grid grid-cols-1 gap-4 items-center mt-8 mr-32 ${!columns ? "text-center" : ""}`}
      >
        {#each buttons as button}
          <Button {...button} />
        {/each}
      </div>
    {:else}
      <div class={`mt-8 mr-32 ${!columns ? "text-center" : ""}`}>
        {#each buttons as button}
          <Button {...button} />
        {/each}
      </div>
    {/if}
  {/if}
</div>