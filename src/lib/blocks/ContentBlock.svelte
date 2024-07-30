<script>
  import Youtube from "svelte-youtube-embed";

  import { randomId } from "$lib/utils";

  import Button from "$lib/components/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import Image from "$lib/components/Image.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import DynamicIcon from "$lib/components/DynamicIcon.svelte";

  export let id = randomId();
  export let columns = true;
  export let innerColumns = false;
  export let border = false;
  export let videoId = "";
  export let videoSources = undefined;
  export let videoPoster = undefined;
  export let imgSrc = undefined;
  export let imgLink = "";
  export let imgClasses = "";
  export let imgIcon = false;
  export let caption = "";
  export let tabs = undefined;
  export let buttons = false;
  export let boxed = false;
  export let divider = false;
  export let title = "";
  export let classes = "";
  export let background = "";
  export let content = "";

  let style = background ? `background-image: url(${background})` : "";
</script>

<section
  class="bg-contain bg-no-repeat bg-origin-center bg-center"
  {id}
  {style}
>
  {#if title}
    <h1
      class="text-4xl
        font-semibold
        tracking-tight
        max-w-2xl
        mx-auto
        text-center"
      class:dark:text-neutral-400={!boxed}
      class:text-red-berry-900={!boxed}
      class:mb-24={!boxed}
    >
      {@html title}
    </h1>
  {/if}
  <div
    class="mx-auto grid grid-cols-1 gap-y-8 {classes}"
    class:py-8={!boxed}
    class:max-w-screen-xl={!boxed}
    class:max-w-screen-md={boxed}
    class:gap-x-32={columns}
    class:lg:grid-cols-10={columns}
    class:border
    class:border-mine-shaft-200={border}
    class:dark:border-mine-shaft-800={border}
  >
    {#if content || buttons}
      <div
        class="col-span-10"
        class:lg:col-span-4={columns}
        class:order-last={!columns}
      >
        {#if content}
          <div
            class="prose
              prose-headings:font-light
              prose-headings:tracking-tight
            prose-headings:dark:text-neutral-400"
            class:max-w-full={columns}
            class:text-center={!columns}
            class:max-w-2xl={!columns}
            class:mx-auto={!columns}
          >
            <slot />
          </div>
        {/if}
        {#if buttons}
          <div
            class="flex gap-4 items-center mt-8"
            class:text-center={!columns}
          >
            {#each buttons as button}
              <Button
                highlight={button.highlight}
                icon={button.icon}
                text={button.text}
                href={button.href}
              />
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    {#if videoId || videoSources || tabs || imgSrc || innerColumns}
      <div class="col-span-10" class:lg:col-span-6={columns}>
        {#if videoId}
          <Youtube id={videoId} altThumb={true} --title-font-family="Silka" />
        {:else if videoSources}
          <VideoPlayer {videoSources} {videoPoster} />
        {:else if imgSrc}
          {#if imgLink}
            <a href={imgLink} target="_blank">
              <Image {imgSrc} {caption} icon={imgIcon} classes={imgClasses} />
            </a>
          {:else}
            <Image {imgSrc} {caption} icon={imgIcon} classes={imgClasses} />
          {/if}
        {:else if tabs}
          <Tabs {tabs} />
        {:else if innerColumns}
          <div
            class="grid grid-cols-2 grid-rows-2 gap-16"
            class:mb-32={content}
            class:-my-16={!content}
          >
            {#each innerColumns as innerColumn}
              <a href={innerColumn.link} target="_blank">
                <div
                  class="text-red-berry-900 aspect-square flex flex-col items-center justify-center text-center"
                >
                  <DynamicIcon icon={innerColumn.icon} size="48" />
                  <h2 class="text-3xl">{innerColumn.title}</h2>
                  <p class="text-neutral-500">{@html innerColumn.content}</p>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>
