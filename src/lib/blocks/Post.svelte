<script>
  import { onMount } from "svelte";
  import { formattedPubDate, fetchAuthorsMetadata } from "$lib/utils";

  export let data, title, pub_date, author;
  export const form = data;

  let authorsMetadata = [];

  onMount(async () => {
    const postAuthors = author || [];
    authorsMetadata = await fetchAuthorsMetadata(postAuthors);
  });
</script>

<article class="container">
  <div class="my-20 xl:mt-32 xl:mb-20">
    <h1
      class="text-2xl
      md:text-4xl
      lg:tracking-tight
      xl:text-6xl
      text-center
      font-light
      md:font-extralight
      tracking-tight
      text-balance
      text-mine-shaft-600
      dark:text-mine-shaft-200"
    >
      {title}
    </h1>
    <div class="text-neutral-500 text-center text-xl mt-4">
      {formattedPubDate(pub_date)}
    </div>
    <div class="max-w-[72ch] mx-auto flex flex-col items-center gap-4 mt-20">
      <div class="flex gap-8">
        {#each authorsMetadata as authorMeta}
          <div class="flex flex-col items-center gap-2">
            {#if authorMeta.src}
              <img class="w-24 h-24 rounded-full object-cover" src={authorMeta.src} alt={authorMeta.name} />
            {/if}
            <div class="font-light text-center w-36">
              {authorMeta.name}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div
    class="prose
    prose-lg
    prose-headings:text-red-berry-900
    dark:prose-headings:text-mine-shaft-200
    dark:prose-invert
    prose-headings:font-medium
    prose-p:font-light
    prose-p:text-pretty
    prose-li:font-light
    max-w-[72ch]
    mx-auto"
  >
    <slot />
  </div>
</article>
