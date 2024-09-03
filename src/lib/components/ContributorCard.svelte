<script>
  export let contributor;
</script>

<div class="flex items-center justify-center">
  <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
    <img
      src={contributor.avatar_url}
      alt={contributor.login}
      class="w-16 h-16 rounded-full mr-4"
    />
  </a>
  <div>
    <a href={contributor.html_url} target="_blank" rel="noopener noreferrer"
      >{contributor.login}</a
    >
    <p class="text-gray-400 text-sm">
      {contributor.contributions} contributions
    </p>
  </div>
</div>
