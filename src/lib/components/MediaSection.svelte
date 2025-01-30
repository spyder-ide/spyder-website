<script>
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
</script>

<div class={columns ? "col-span-full lg:col-span-6" : "col-span-full"}>
  {#if videoId}
    <Youtube id={videoId} altThumb={true} --title-font-family="Silka" />
  {:else if videoSources}
    <VideoPlayer {videoSources} {videoPoster} />
  {:else if imgSrc}
    {#if imgLink}
      <a href={imgLink} target="_blank" rel="noopener noreferrer">
        <Image {imgSrc} {imgAlt} {caption} classes={imgClasses} />
      </a>
    {:else}
      <Image {imgSrc} {imgAlt} {caption} classes={imgClasses} />
    {/if}
  {:else if tabs}
    <Tabs {tabs} />
  {:else if innerColumns}
    <div
      class="max-w-2xl mx-auto flex flex-col gap-8 md:gap-16 mt-2 md:mt-0 md:grid md:grid-cols-2"
    >
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