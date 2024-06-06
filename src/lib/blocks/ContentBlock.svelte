<script>
  import Youtube from "svelte-youtube-embed";

  import { randomId } from "$lib/utils";

  import Button from "$lib/components/Button.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";

  export let id = randomId();
  export let border = false;
  export let video = false;
  export let videoId = "";
  export let videoSources = undefined;
  export let videoPoster = undefined;
  export let tabs = undefined;
  export let button = false;
  export let buttonText = "";
  export let buttonIcon = "";
  export let buttonHref = "";
  export let buttonTarget = "";
  export let buttonHighlight = false;
</script>

<section
  {id}
  class:border
  class:border-mine-shaft-200={border}
  class:dark:border-mine-shaft-800={border}
  class="bg-spring-wood-50 dark:bg-mine-shaft-950 container grid grid-cols-1 lg:grid-cols-10 gap-24 py-8"
>
  <div class="col-span-1 lg:col-span-4">
    <div
      class="prose
      prose-h1:text-4xl
      prose-headings:font-light
      prose-headings:tracking-tight
      prose-a:text-red-berry-950
      prose-headings:text-neutral-600
      prose-h1:text-red-berry-950
      dark:prose-headings:text-neutral-500
      dark:prose-invert"
    >
      <slot />
    </div>

    {#if button}
      <div class="mt-8">
        <Button
          text={buttonText}
          icon={buttonIcon}
          href={buttonHref}
          target={buttonTarget}
          highlight={buttonHighlight}
        />
      </div>
    {/if}
  </div>

  {#if (video && videoId ) || videoSources || tabs}
    <div class="col-span-1 lg:col-span-6">
      {#if video && videoId}
        <Youtube id={videoId} altThumb={true} --title-font-family="Silka"/>
      {:else if videoSources !== undefined}
        <VideoPlayer {videoSources} {videoPoster} />
      {:else}
        <Tabs {tabs} />
      {/if}
    </div>
  {/if}
</section>
