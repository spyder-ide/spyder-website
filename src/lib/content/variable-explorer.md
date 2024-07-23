<script>
    import VideoPlayer from "$lib/components/VideoPlayer.svelte";

    const videoPoster = "https://sveltejs.github.io/assets/caminandes-llamigos.jpg";
    const videoSources = [
        {
            src: "https://sveltejs.github.io/assets/caminandes-llamigos.mp4",
            type: "video/mp4"
        }
    ];
</script>

<VideoPlayer {videoSources} info={false} />
