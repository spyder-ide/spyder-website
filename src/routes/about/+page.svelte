<script>
  export let data;
  let pageTitle = "About Spyder IDE";
</script>

<div class="container">
  <h1 class="text-4xl xl:tracking-tight xl:text-6xl text-center tracking-tight font-extralight text-mine-shaft-600 dark:text-mine-shaft-200 my-16 md:my-32">
    {pageTitle}
  </h1>
  <h2 class="text-center dark:text-neutral-200 text-2xl font-light mb-4">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo debitis eligendi dolorem optio adipisci voluptatem inventore eius recusandae reiciendis nisi aspernatur quas exercitationem nihil dolorum aliquam, ex aliquid qui distinctio.
  </h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-32">
    {#each data.contributors as contributor}
      <div class="flex items-center justify-center">
        <img src={contributor.avatar_url} alt={contributor.login} class="w-16 h-16 rounded-full mr-4" />
        <div>
          <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">{contributor.login}</a>
          <p class="text-neutral-400 text-sm">{contributor.contributions} contributions</p>
        </div>
      </div>
    {/each}
  </div>
</div>