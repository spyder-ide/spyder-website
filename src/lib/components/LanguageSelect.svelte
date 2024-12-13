<script>
  import { locale } from 'svelte-i18n';

  const languages = [
    { code: 'en', name: 'Eng' },
    { code: 'es', name: 'Esp' }
  ];
</script>

<div>
  {#each languages as { code, name }}
    <button class="uppercase text-sm opacity-60" on:click={() => locale.set(code)}>{name}</button>
  {/each}
</div>

<style>
  button:hover {
    @apply opacity-100
  }
  button::after {
    content: "/";
    @apply mx-1
  }
  button:last-child::after {
    content: none;
  }
</style>
