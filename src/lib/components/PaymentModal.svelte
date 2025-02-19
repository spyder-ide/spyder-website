<script>
  import { onMount } from "svelte";

  export let donationLink = "";
  export let showModal = false;

  let iframeContainer;
  let messageHandler;

  function generateUtk() {
    const crypto = window.crypto || window.msCrypto;
    if (crypto && crypto.getRandomValues && window.Uint16Array) {
      const array = new Uint16Array(8);
      crypto.getRandomValues(array);
      const formatNum = (num) => {
        let hex = num.toString(16);
        while (hex.length < 4) hex = `0${hex}`;
        return hex;
      };
      return array.reduce((acc, val) => acc + formatNum(val), "");
    }

    const timestamp = new Date().getTime();
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const rand = (timestamp + 16 * Math.random()) % 16 | 0;
      return (char === "x" ? rand : (3 & rand) | 8).toString(16);
    });
  }

  function getOrSetHubSpotUtk() {
    let utk = window.__hsUserToken;
    if (!utk) {
      const cookies = document.cookie.split(";");
      const utkCookie = cookies.find((c) => c.trim().startsWith("hubspotutk="));
      utk = utkCookie ? utkCookie.split("=")[1] : null;
    }
    if (!utk) {
      utk = generateUtk();
      window.__hsUserToken = utk;
    }
    return utk;
  }

  function createPaymentIframe() {
    if (!iframeContainer) return;

    const baseUrl = donationLink;
    const params = new URLSearchParams({
      referrer: "PAYMENT_LINK_EMBED",
      layout: "",
      parentPageUrl: `${window.location.origin}${window.location.pathname}`,
      parentHubspotUtk: getOrSetHubSpotUtk(),
    });

    if (window.hsVars) {
      params.append("hsVars", JSON.stringify(window.hsVars));
    }

    const iframe = document.createElement("iframe");
    iframe.src = `${baseUrl}&${params.toString()}`;
    iframe.style.width = "100%";
    iframe.style.minWidth = "320px";
    iframe.style.minHeight = "500px";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.allow = "payment *";
    iframe.title = "HubSpot Payment Form";

    // Clear container and add new iframe
    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);

    // Handle iframe resizing
    messageHandler = (event) => {
      if (!/hubspot(?:qa)?\.com/.test(event.origin)) return;
      const data = event.data || event.message;
      if (data?.height) {
        iframe.style.height = `${data.height}px`;
      }
    };

    window.addEventListener("message", messageHandler);
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && showModal) {
      closeModal();
    }
  }

  function closeModal() {
    showModal = false;
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      if (messageHandler) {
        window.removeEventListener("message", messageHandler);
      }
    };
  });

  $: if (showModal) {
    // Use setTimeout to ensure the container is mounted
    setTimeout(createPaymentIframe, 0);
  }
</script>

<svelte:head>
  {#if showModal}
    <style>
      main {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

{#if showModal}
  <div
    role="button"
    tabindex="0"
    class="modal-backdrop"
    on:click={closeModal}
    on:keydown={handleKeydown}
    aria-label="Close modal"
  />
  <div class="modal">
    <button class="close-button" on:click={closeModal}>×</button>
    <div class="modal-content">
      <div class="payments-iframe-container" bind:this={iframeContainer} />
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    @apply fixed inset-0 z-40 cursor-pointer bg-black bg-opacity-50 backdrop-blur-lg;
  }

  .modal {
    @apply fixed inset-8 z-50 flex flex-col overflow-hidden rounded-2xl bg-white p-4 pt-12 md:inset-20 lg:inset-40;
  }

  .close-button {
    @apply absolute right-4 top-1 z-10 text-4xl text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200;
  }

  .modal-content {
    @apply flex-1 overflow-hidden;
  }

  .payments-iframe-container {
    @apply h-full w-full;
  }
</style>
