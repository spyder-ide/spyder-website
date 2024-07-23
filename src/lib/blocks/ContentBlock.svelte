<script>
  import Youtube from "svelte-youtube-embed";

  import { randomId } from "$lib/utils";

  import Button from "$lib/components/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import Image from "$lib/components/Image.svelte";
  import Divider from "$lib/components/Divider.svelte";

  export let id = randomId();
  export let columns = true;
  export let border = false;
  export let video = false;
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

  let style = background ? `background-image: url(${background})` : "";
</script>

<section {id} class="bg-contain bg-no-repeat bg-origin-center bg-center" {style}>
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
      class:mt-24={boxed}
      class:mb-24={!boxed}
      class:text-white={boxed}
    >
      {@html title}
    </h1>
  {/if}
  <div
    class:py-8={!boxed}
    class:max-w-screen-xl={!boxed}
    class:max-w-screen-md={boxed}
    class:px-32={boxed}
    class:py-24={boxed}
    class:rounded-2xl={boxed}
    class:bg-quill-gray-100={boxed}
    class:dark:bg-neutral-900={boxed}
    class:gap-x-32={columns}
    class:lg:grid-cols-10={columns}
    class:border={border || boxed}
    class:border-mine-shaft-200={border || boxed}
    class:dark:border-mine-shaft-800={border || boxed}
    class="mx-auto grid grid-cols-1 gap-y-8 {classes}"
  >
    <div
      class="col-span-10"
      class:lg:col-span-4={columns}
      class:order-last={!columns}
    >
      <div
        class="prose
          prose-headings:font-light
          prose-headings:tracking-tight
          prose-headings:dark:text-neutral-400"
        class:prose-headings:text-neutral-500={!boxed}
        class:prose-a:text-red-berry-950={!boxed}
        class:dark:prose-invert={!boxed}
        class:max-w-full={columns}
        class:text-center={!columns}
        class:max-w-2xl={!columns}
        class:mx-auto={!columns}
      >
        <slot />
      </div>

      {#if buttons}
        <div class="flex gap-4 items-center mt-8" class:text-center={!columns}>
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

    {#if (video && videoId) || videoSources || tabs || imgSrc}
      <div class="col-span-10" class:lg:col-span-6={columns}>
        {#if video && videoId}
          <Youtube id={videoId} altThumb={true} --title-font-family="Silka" />
        {:else if videoSources}
          <VideoPlayer {videoSources} {videoPoster} />
        {:else if imgSrc}
          {#if imgLink}
            <a href={imgLink} target="_blank">
              <Image
                {imgSrc}
                {caption}
                icon={imgIcon}
                classes={imgClasses}
              />
            </a>
          {:else}
            <Image
              {imgSrc}
              {caption}
              icon={imgIcon}
              classes={imgClasses}
            />
          {/if}
        {:else if tabs}
          <Tabs {tabs} />
        {/if}
      </div>
    {/if}
  </div>

  {#if divider}
    <Divider stroke={true} />
  {/if}
</section>
