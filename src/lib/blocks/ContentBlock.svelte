<script>
  import { onMount } from "svelte";
  import Youtube from "svelte-youtube-embed";

  import { randomId } from "$lib/utils";
  import { colourScheme, osStore } from '$lib/store';

  import Card from "$lib/components/Card.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Image from "$lib/components/Image.svelte";
  import Button from "$lib/components/Button.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";

  export let id = randomId();
  export let columns = true;
  export let border = false;
  export let videoId = "";
  export let videoSources = undefined;
  export let videoPoster = undefined;
  export let imgSrc = undefined;
  export let imgLink = "";
  export let imgClasses = "";
  export let caption = "";
  export let tabs = undefined;
  export let buttons = undefined;
  export let boxed = false;
  export let divider = false;
  export let title = "";
  export let classes = "";
  export let background = "";
  export let backgroundDark = "";
  export let content = "";
  export let extraContent = "";
  export let extraImage = "";
  export let extraImageAlt = "";
  export let extraImageLink = "";
  export let innerColumns = false;

  let style = "";
  let mobile = false;

  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  $: currentBg = $colourScheme === 'dark' && backgroundDark ? backgroundDark : background;

  onMount(() => {
    const handleResize = debounce(() => {
      mobile = window.innerWidth < 768;
      style = mobile ? "" : currentBg ? `background-image: url(${currentBg});` : "";
    }, 250);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });

  $: style = mobile ? "" : currentBg ? `background-image: url(${currentBg});` : "";

  osStore.subscribe(data => {
    if (!data.loading && buttons && imgSrc) {
      buttons = [...data.osButtons];
      imgSrc = `/assets/media/${data.os}.webp`
    }
  });
</script>

<section
  class="md:bg-contain md:bg-no-repeat md:bg-origin-center md:bg-center"
  {id}
  {style}
>
  {#if title}
    <h1
      class={`text-4xl font-semibold tracking-tight max-w-2xl px-8 mx-auto text-center text-red-berry-900 dark:text-neutral-400
        ${!boxed ? 'lg:mb-24' : ''}`}
    >
      {@html title}
    </h1>
  {/if}

  <div
    class={`mx-auto grid gap-8 px-8 ${classes}
      ${!boxed ? 'py-8 max-w-screen-lg 2xl:max-w-screen-xl' : 'max-w-screen-md'}
      ${columns ? 'gap-x-8 lg:gap-x-16 xl:gap-x-32 lg:grid-cols-10' : ''}
      ${border ? 'border border-mine-shaft-200 dark:border-mine-shaft-800' : ''}`}
  >
    {#if content || buttons}
      <div class={columns ? 'col-span-full lg:col-span-4' : 'col-span-full'}>
        {#if content}
          <div
            class={`prose prose-h2:text-lg prose-h1:text-xl prose-headings:font-light prose-headings:tracking-tight
              prose-headings:text-gray-700 prose-headings:dark:text-neutral-300
              prose-p:font-light prose-p:text-base prose-p:text-gray-700 prose-p:dark:text-gray-300
              ${columns ? 'max-w-full' : 'mt-8 md:mt-24 text-center max-w-2xl mx-auto'}`}
          >
            <slot />
          </div>
        {/if}
        {#if buttons}
          <div
            class={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center mt-8
              ${!columns ? 'text-center' : ''}`}
          >
            {#each buttons as button}
              <Button {...button} />
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if videoId || videoSources || tabs || imgSrc || innerColumns}
      <div class={columns ? 'col-span-full lg:col-span-6' : 'col-span-full'}>
        {#if videoId}
          <Youtube id={videoId} altThumb={true} --title-font-family="Silka" />
        {:else if videoSources}
          <VideoPlayer {videoSources} {videoPoster} />
        {:else if imgSrc}
          {#if imgLink}
            <a href={imgLink} target="_blank" rel="noopener noreferrer">
              <Image {imgSrc} {caption} classes={imgClasses} />
            </a>
          {:else}
            <Image {imgSrc} {caption} classes={imgClasses} />
          {/if}
        {:else if tabs}
          <Tabs {tabs} />
        {:else if innerColumns}
          <div class="max-w-2xl mx-auto flex flex-col gap-8 md:gap-16 mt-2 md:mt-0 md:grid md:grid-cols-2">
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
  </div>

  {#if $$slots.extraContent || extraContent}
    <div
      class={`text-center max-w-2xl mx-auto px-8 mt-8 prose prose-h2:text-xl prose-headings:font-light prose-headings:tracking-tight
              prose-headings:text-neutral-700 prose-headings:dark:text-neutral-300
              prose-p:font-light prose-p:text-base prose-p:text-gray-700 prose-p:dark:text-gray-300
        ${columns ? 'order-first' : ''}`}
    >
      {#if $$slots.extraContent}
        <slot name="extraContent" />
      {:else}
        <svelte:component this={extraContent} />
      {/if}
    </div>
  {/if}

  {#if extraImage}
    <div class={`col-span-10 text-center px-8 mt-8 mb-16 ${!columns ? 'max-w-2xl mx-auto' : 'max-w-full'}`}>
      {#if extraImageLink}
        <a href={extraImageLink} target="_blank" rel="noopener noreferrer">
          <Image figure={false} imgSrc={extraImage} imgAlt={extraImageAlt} />
        </a>
      {:else}
        <Image figure={false} imgSrc={extraImage} imgAlt={extraImageAlt} />
      {/if}
    </div>
  {/if}

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>
