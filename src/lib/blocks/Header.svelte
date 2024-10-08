<script>
  import { Icon } from "svelte-icons-pack";
  import { BiMenu } from "svelte-icons-pack/bi";
  import { AiOutlineClose } from "svelte-icons-pack/ai";

  import { base } from "$app/paths";
  import { title, description, navigation } from "$lib/config";

  import ColourSwitch from "$lib/components/ColourSwitch.svelte";
  import Logo from "$lib/components/Logo.svelte";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="flex items-center text-mine-shaft-500 dark:text-mine-shaft-300">
  <div class="container flex items-center justify-between">
    <!-- Logo -->
    <a href="{base}/" class="title h-20 flex items-center">
      <Logo />
      <span class="sr-only">{title} {description}</span>
    </a>

    <!-- Navigation (desktop) -->
    <div class="flex items-center md:gap-12 justify-end">
      <!-- Navigation (links) -->
      <nav class="hidden md:flex items-center gap-8 xl:gap-12">
        {#each navigation as menu}
          <ul class="menu flex items-center gap-4 xl:gap-6">
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
      </nav>

      <!-- Theme switch (dark/light) -->
      <ColourSwitch />

      <!-- Hamburger menu button (visible on mobile) -->
      <button
        class="md:hidden"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <Icon src={BiMenu} size="24" />
      </button>
    </div>
  </div>
</header>

<!-- Mobile menu (shown when isMenuOpen is true) -->
{#if isMenuOpen}
  <div class="md:hidden fixed inset-0 z-50 bg-spring-wood-50 text-gray-700 dark:bg-mine-shaft-950 dark:text-spring-wood-50">
    <div class="container py-5 text-right">
      <button class="mb-8 pt-2" on:click={toggleMenu} aria-label="Close menu">
        <Icon src={AiOutlineClose} size="24" />
      </button>
      <nav class="text-center">
        {#each navigation as menu}
          <ul class="menu">
            {#each menu as item}
              <li>
                <a
                  class="menu-link mobile block py-8 uppercase text-2xl tracking-wider no-underline"
                  href={item.href}
                  target={item.target}
                  on:click={toggleMenu}>{item.text}</a
                >
              </li>
            {/each}
          </ul>
        {/each}
      </nav>
    </div>
  </div>
{/if}

<style>
  .menu-link {
    grid-template-rows: auto 1fr auto;
  }

  .menu-link::before:not(.mobile),
  .menu-link::after:not(.mobile) {
    content: "";
  }
</style>
