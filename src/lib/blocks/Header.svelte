<script>
  import { base } from "$app/paths";
  import { onMount } from 'svelte';

  import { title, description, navigation } from "$lib/config";

  import ColourSwitch from "$lib/components/ColourSwitch.svelte";
  import Logo from "$lib/components/Logo.svelte";

  let mobile = false;

  onMount(() => {
    const handleResize = () => {
      mobile = window.innerWidth < 1024;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

</script>

<header class="flex items-center text-mine-shaft-500 dark:text-mine-shaft-300">
  <div class="container flex items-center justify-between">

    <!-- Logo -->
    <a href="{base}/" class="title h-20 flex items-center">
      <Logo compact={mobile} />
      <span class="sr-only">{title} {description}</span>
    </a>

    <!-- Navigation -->
    <nav class="menu-container flex items-center gap-2 lg:gap-8 xl:gap-12">
      {#each navigation as menu}
        <ul class="menu flex items-center gap-2 lg:gap-4 xl:gap-6">
          {#each menu as item}
            <li class="menu-item">
              <a
                class="menu-link h-20 grid items-center uppercase text-sm tracking-wider before:h-1 before:hover:bg-red-berry-900"
                href={item.href}
                target={item.target}>{item.text}</a
              >
            </li>
          {/each}
        </ul>
      {/each}

      <!-- Theme switch (dark/light) -->
      <ColourSwitch />
    </nav>

  </div>
</header>

<style>
  .menu-link {
    grid-template-rows: auto 1fr auto;
  }

  .menu-link::before,
  .menu-link::after {
    content: "";
  }
</style>
