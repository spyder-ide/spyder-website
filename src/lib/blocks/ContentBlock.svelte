<script>
  import { onMount, onDestroy } from "svelte";
  import Youtube from "svelte-youtube-embed";
  import { randomId } from "$lib/utils";
  import Card from "$lib/components/Card.svelte";
  import Button from "$lib/components/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import Image from "$lib/components/Image.svelte";
  import Divider from "$lib/components/Divider.svelte";

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
  export let buttons = false;
  export let boxed = false;
  export let divider = false;
  export let title = "";
  export let classes = "";
  export let background = "";
  export let content = "";
  export let extraContent = "";
  export let extraImage = "";
  export let extraImageAlt = "";
  export let extraImageLink = "";
  export let innerColumns = false;
  export let innerColumnCount = 2;
  export let innerColumnGap = 16;
  export let innerColumnsClasses = "";

  let style = "";
  let mobile = false;

  innerColumnsClasses = `grid xl:grid-flow-row xl:grid-cols-${innerColumnCount} gap-${innerColumnGap}`;

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  onMount(() => {
    const handleResize = debounce(() => {
      mobile = window.innerWidth < 1280;
      style = mobile ? "" : background ? `background-image: url(${background});` : "";
    }, 250);

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<section
  class="xl:bg-contain xl:bg-no-repeat xl:bg-origin-center xl:bg-center"
  {id}
  {style}
>
  {#if title}
    <h1
      class={`text-4xl font-semibold tracking-tight max-w-2xl mx-auto text-center text-red-berry-900 dark:text-neutral-400
        ${!boxed ? 'xl:mb-24' : ''}`}
    >
      {@html title}
    </h1>
  {/if}

  <div
    class={`mx-auto grid gap-8 px-8 ${classes}
      ${!boxed ? 'py-8 2xl:max-w-screen-xl' : 'max-w-screen-sm'}
      ${columns ? 'gap-x-8 xl:gap-x-32 xl:grid-cols-10' : ''}
      ${border ? 'border border-mine-shaft-200 dark:border-mine-shaft-800' : ''}`}
  >
    {#if content || buttons}
      <div class={columns ? 'xl:col-span-4' : ''}>
        {#if content}
          <div
            class={`prose prose-headings:font-light prose-headings:tracking-tight
              prose-p:font-light prose-a:no-underline prose-p:text-neutral-500 prose-p:dark:text-neutral-400
              prose-headings:text-neutral-500 prose-headings:dark:text-neutral-300
              ${columns ? 'max-w-full' : 'mt-4 text-center max-w-2xl mx-auto'}`}
          >
            <slot />
          </div>
        {/if}
        {#if buttons}
          <div
            class={`flex flex-col xl:flex-row gap-4 items-center mt-8
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
      <div class={columns ? 'xl:col-span-6' : ''}>
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
          <div class={innerColumnsClasses}>
            {#each innerColumns as innerColumn}
              {#if innerColumn.link}
                <a
                  href={innerColumn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="grid w-full h-full items-center"
                >
                  <Card
                    {innerColumn}
                    aspect={innerColumn.aspect}
                    classes="w-48 h-48 xl:h-24"
                  />
                </a>
              {:else}
                <Card
                  {innerColumn}
                  aspect={innerColumn.aspect}
                  classes="w-48 h-48 xl:h-24"
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
      class={`mt-8 prose prose-headings:font-light prose-headings:tracking-tight
        prose-p:font-light prose-p:text-neutral-500 prose-p:dark:text-neutral-400
        prose-headings:text-neutral-500 prose-headings:dark:text-neutral-400
        ${!columns ? 'order-first text-center max-w-2xl mx-auto' : ''}`}
    >
      {#if $$slots.extraContent}
        <slot name="extraContent" />
      {:else}
        <svelte:component this={extraContent} />
      {/if}
    </div>
  {/if}

  {#if extraImage}
    <div class={`col-span-10 text-center my-8 ${!columns ? 'max-w-2xl mx-auto' : 'max-w-full'}`}>
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
