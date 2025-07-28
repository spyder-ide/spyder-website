<script>
  import { browser } from "$app/environment";
  import { fetchAuthorsMetadata, formattedPubDate } from "$lib/utils";
  import { onMount } from "svelte";
  import { Icon } from "svelte-icons-pack";
  import { BsChevronLeft } from "svelte-icons-pack/bs";

  export let data, title, pub_date, author;
  export const form = data;

  let authorsMetadata = [];
  let backToBlogUrl = "/blog";

  onMount(async () => {
    const postAuthors = author || [];
    authorsMetadata = await fetchAuthorsMetadata(postAuthors);

    // Determine the correct "back to blog" URL
    if (browser) {
      // Method 1: Check URL parameters first (most reliable)
      const urlParams = new URLSearchParams(window.location.search);
      const fromPage = urlParams.get("from");

      if (fromPage) {
        // Validate that it's a valid blog page
        if (fromPage === "blog" || /^blog\/\d+$/.test(fromPage)) {
          backToBlogUrl = `/${fromPage}`;
        }
      } else {
        // Method 2: Check referrer
        const referrer = document.referrer;

        if (referrer) {
          try {
            const referrerUrl = new URL(referrer);
            const referrerPath = referrerUrl.pathname;

            // Check if referrer is from a blog page
            if (referrerPath.startsWith("/blog")) {
              // If it's a paginated blog page (e.g., /blog/2, /blog/3)
              const blogPageMatch = referrerPath.match(/^\/blog\/(\d+)$/);
              if (blogPageMatch) {
                const pageNum = parseInt(blogPageMatch[1]);
                if (pageNum > 1) {
                  backToBlogUrl = `/blog/${pageNum}`;
                } else {
                  backToBlogUrl = "/blog";
                }
              } else if (referrerPath === "/blog") {
                backToBlogUrl = "/blog";
              }
            }
          } catch (error) {
            console.warn("Error parsing referrer URL:", error);
          }
        }
      }
    }
  });

  // Function to handle back button click
  function handleBackClick(event) {
    if (browser) {
      // If we have a specific back URL, use it
      if (backToBlogUrl !== "/blog") {
        // Let the normal link behavior work
        return;
      }

      // Otherwise, try to go back in history
      if (window.history.length > 1) {
        window.history.back();
        event.preventDefault();
      }
    }
  }
</script>

<article class="container mx-auto max-w-6xl">
  <div class="my-20 xl:mt-32 xl:mb-20">
    <a
      href={backToBlogUrl}
      on:click={handleBackClick}
      class="flex items-center justify-center md:justify-start gap-1 button py-1 text-red-berry-900 dark:text-spring-wood-400 hover:text-red-berry-800 dark:hover:text-spring-wood-200 border-b border-spring-wood-300 pb-2 mb-8"
    >
      <Icon src={BsChevronLeft} />
      Back to blog
    </a>
    <h1
      class="text-3xl
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
              <img class="w-24 h-24 rounded-full object-cover bg-spring-wood-50" src={authorMeta.src} alt={authorMeta.name} />
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
