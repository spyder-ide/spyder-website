<script>
  import { onMount } from "svelte";
  import { locale } from "svelte-i18n";
  import Button from "./Button.svelte";

  export let content = "";
  export let buttons = undefined;
  export let columns = true;
  
  // Reactive content that updates when locale changes
  let reactiveContent = content;
  
  // Helper function to check if an object is empty
  function isEmptyObject(obj) {
    return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
  }
  
  // Helper to check if content is effectively empty
  function hasContent(content) {
    if (!content) return false;
    if (isEmptyObject(content)) return false;
    if (typeof content === 'object') {
      // Check if it has any meaningful content properties
      return !!(content.title || content.text);
    }
    return true;
  }
  
  // Update content when locale or props change
  $: {
    if ($locale || content) {
      reactiveContent = typeof content === 'object' ? { ...content } : content;
    }
  }
  
  // Add listener for language changes to ensure updates
  onMount(() => {
    const handleLanguageChange = () => {
      // Force reactivity by creating a new object if it's an object
      reactiveContent = typeof content === 'object' ? { ...content } : content;
    };
    
    window.addEventListener("language-changed", handleLanguageChange);
    
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange);
    };
  });
</script>

{#if (hasContent(reactiveContent) || buttons)}
<div class={`${columns ? "col-span-full lg:col-span-4" : "col-span-full"} content-section`}>
  {#if hasContent(reactiveContent)}
    <div
      class={`prose prose-h2:text-lg prose-h1:text-xl prose-headings:font-light prose-headings:tracking-tight
        prose-headings:text-gray-700 prose-headings:dark:text-neutral-300
        prose-p:font-light prose-p:text-base prose-p:text-gray-700 prose-p:dark:text-gray-300
        ${columns ? "max-w-full" : "mt-8 md:mt-24 text-center max-w-2xl mx-auto"}`}
    >
      {#if typeof reactiveContent !== "object"}
        <slot />
      {:else}
        {#if reactiveContent.title}
          {#if reactiveContent.titleTag}
            <svelte:element this={reactiveContent.titleTag}>
              {reactiveContent.title}
            </svelte:element>
          {:else}
            <h2>{reactiveContent.title}</h2>
          {/if}
        {/if}
        {#if reactiveContent.text}
          {@html reactiveContent.text}
        {/if}
      {/if}
    </div>
  {/if}
  {#if buttons}
    {#if buttons.length > 1}
      <div
        class="grid grid-cols-1 gap-4 items-center mt-8 lg:mr-32"
      >
        {#each buttons as button}
          <Button {...button} />
        {/each}
      </div>
    {:else}
      <div class="mt-8 flex items-center justify-center lg:block lg:mr-20">
        {#each buttons as button}
          <Button {...button} />
        {/each}
      </div>
    {/if}
  {/if}
  </div>
{/if}
