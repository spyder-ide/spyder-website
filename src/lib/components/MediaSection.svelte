<script>
  import { onMount } from "svelte";
  import { locale } from "svelte-i18n";
  import Youtube from "svelte-youtube-embed";
  import Card from "./Card.svelte";
  import Image from "./Image.svelte";
  import Tabs from "./Tabs.svelte";
  import VideoPlayer from "./VideoPlayer.svelte";

  export let columns = true;
  export let videoId = "";
  export let videoSources = undefined;
  export let videoPoster = undefined;
  export let imgSrc = undefined;
  export let imgLink = "";
  export let imgAlt = "";
  export let imgClasses = "";
  export let caption = "";
  export let tabs = undefined;
  export let innerColumns = false;
  export let aspectRatio = "4:3";
  export let extraVerticalPadding = false;
  
  // Reactive variables for translations
  let reactiveTabs = tabs;
  let reactiveCaption = caption;
  let reactiveImgAlt = imgAlt;
  let innerColumnClasses = `max-w-screen-md mx-auto flex flex-col gap-8 md:gap-16 mt-2 md:mt-0 md:grid md:grid-cols-2 ${extraVerticalPadding ? "py-16" : ""}`;
  
  // Helper function to check if an object or array is empty
  function isEmpty(value) {
    if (!value) return true;
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return Object.keys(value).length === 0;
    }
    return value === "";
  }
  
  // Check if we have any media content to display
  function hasMediaContent() {
    return (
      videoId || 
      (videoSources && !isEmpty(videoSources)) ||
      imgSrc ||
      (reactiveTabs && !isEmpty(reactiveTabs)) ||
      (innerColumns && !isEmpty(innerColumns))
    );
  }
  
  // Update reactive values when locale changes
  $: {
    if ($locale) {
      reactiveTabs = tabs ? tabs.map(tab => ({ ...tab })) : undefined;
      reactiveCaption = caption;
      reactiveImgAlt = imgAlt;
    }
  }
  
  // Add listener for language changes to ensure updates
  onMount(() => {
    const handleLanguageChange = () => {
      // Force reactivity by creating deep copies
      reactiveTabs = tabs ? tabs.map(tab => ({ ...tab })) : undefined;
      reactiveCaption = caption;
      reactiveImgAlt = imgAlt;
    };
    
    window.addEventListener("language-changed", handleLanguageChange);
    
    return () => {
      window.removeEventListener("language-changed", handleLanguageChange);
    };
  });
</script>

{#if hasMediaContent()}
<div class={`${columns ? "col-span-full lg:col-span-6" : "col-span-full"} media-section`}>
  {#if videoId}
    <Youtube id={videoId} altThumb={true} --title-font-family="Silka" />
  {:else if videoSources}
    <VideoPlayer {videoSources} {videoPoster} {aspectRatio} />
  {:else if imgSrc}
    {#if imgLink}
      <a href={imgLink} target="_blank" rel="noopener noreferrer">
        <Image {imgSrc} imgAlt={reactiveImgAlt} caption={reactiveCaption} classes={imgClasses} />
      </a>
    {:else}
      <Image {imgSrc} imgAlt={reactiveImgAlt} caption={reactiveCaption} classes={imgClasses} />
    {/if}
  {:else if reactiveTabs}
    <Tabs tabs={reactiveTabs} />
  {:else if innerColumns}
    <div class={innerColumnClasses}>
      {#each innerColumns as innerColumn}
        {#if innerColumn.link}
          <a
            href={innerColumn.link}
            target="_blank"
            rel="noopener noreferrer"
            class="card-link md:grid w-full h-full items-center"
          >
            <Card
              {innerColumn}
              aspect={innerColumn.aspect}
              classes="w-52 md:h-32"
            />
          </a>
        {:else}
          <Card
            {innerColumn}
            aspect={innerColumn.aspect}
            classes="w-52 md:h-32"
          />
        {/if}
      {/each}
    </div>
  {/if}
</div>
{/if}