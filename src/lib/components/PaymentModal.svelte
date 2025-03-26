<script>
  import { onMount } from "svelte";

  import { Icon } from 'svelte-icons-pack';
  import { AiFillCloseCircle } from "svelte-icons-pack/ai";

  export let donationLinkID = "";
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

    const baseUrl = `https://app.hubspot.com/payments/${donationLinkID}?referrer=PAYMENT_LINK_EMBED&layout=embed-full`;
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
    
    // Add cross-origin attributes
    iframe.setAttribute("loading", "eager");
    iframe.setAttribute("importance", "high");
    iframe.setAttribute("crossorigin", "anonymous");
    
    // Create fallback message container
    const fallbackContainer = document.createElement("div");
    fallbackContainer.className = "fallback-message";
    fallbackContainer.style.display = "none";
    fallbackContainer.innerHTML = `
      <div class="p-4 text-center">
        <h2 class="text-xl font-semibold mb-2">Payment form was blocked</h2>
        <p class="mb-4">Your browser's Enhanced Tracking Protection may be blocking the payment form.</p>
        <p class="mb-4">You can:</p>
        <ul class="list-disc pl-6 mb-4 text-left">
          <li>Temporarily disable Enhanced Tracking Protection for this site</li>
          <li>Try using a different browser</li>
          <li>Visit <a href="https://app.hubspot.com/payments/${donationLinkID}" target="_blank" class="text-red-berry-900 underline">the payment page directly</a></li>
        </ul>
      </div>
    `;
    
    // Clear container and add iframe and fallback
    iframeContainer.innerHTML = "";
    iframeContainer.appendChild(iframe);
    iframeContainer.appendChild(fallbackContainer);

    // Handle iframe resizing
    messageHandler = (event) => {
      if (!/hubspot(?:qa)?\.com/.test(event.origin)) return;
      const data = event.data || event.message;
      if (data?.height) {
        iframe.style.height = `${data.height}px`;
      }
    };

    window.addEventListener("message", messageHandler);

    // Add error handling for iframe loading
    iframe.onerror = () => {
      console.error("Failed to load payment iframe");
      fallbackContainer.style.display = "block";
      iframe.style.display = "none";
    };

    // Force reload iframe if it doesn't load within 5 seconds
    const timeout = setTimeout(() => {
      try {
        // Check if iframe loaded properly
        if (!iframe.contentWindow || !iframe.contentDocument || 
            !iframe.contentDocument.body || 
            iframe.contentDocument.body.innerHTML === "") {
          console.log("Payment form might be blocked - showing fallback");
          fallbackContainer.style.display = "block";
          iframe.style.display = "none";
        }
      } catch (e) {
        // If we get a security error when trying to access iframe contents,
        // that indicates a cross-origin issue
        console.log("Security error accessing iframe - likely blocked by browser", e);
        fallbackContainer.style.display = "block";
        iframe.style.display = "none";
      }
    }, 5000);

    // Clean up timeout on iframe load
    iframe.onload = () => {
      clearTimeout(timeout);
      
      // Additional check after load to verify content is accessible
      try {
        // If we can access the iframe's location, it loaded successfully
        const testAccess = iframe.contentWindow.location.href;
        fallbackContainer.style.display = "none";
      } catch (e) {
        // If we get a security error, the content might have loaded but is
        // not accessible due to cross-origin restrictions
        console.log("Iframe loaded but content might be restricted", e);
        
        // Set a longer timeout to give time for the actual form to render
        // before showing fallback message
        setTimeout(() => {
          try {
            // One final check before showing fallback
            if (!iframe.contentWindow.document.body.innerHTML) {
              fallbackContainer.style.display = "block";
              iframe.style.display = "none";
            }
          } catch (e) {
            fallbackContainer.style.display = "block";
            iframe.style.display = "none";
          }
        }, 1000);
      }
    };
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
    // Use a longer delay for mobile browsers
    const delay = /Firefox/.test(navigator.userAgent) && /Android/.test(navigator.userAgent) ? 100 : 0;
    setTimeout(createPaymentIframe, delay);
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
  <div class="modal-container">
    <div
      role="button"
      tabindex="0"
      class="modal-backdrop"
      on:click={closeModal}
      on:keydown={handleKeydown}
      aria-label="Close modal"
    />
    <div class="modal">
      <button class="close-button" on:click={closeModal}>
        <Icon src={AiFillCloseCircle} />
      </button>
      <div class="modal-content">
        <div class="payments-iframe-container" bind:this={iframeContainer} />
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  .modal-backdrop {
    @apply fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-50 backdrop-blur-lg;
  }

  .modal-container {
    @apply fixed inset-0 z-50 overflow-hidden flex items-center justify-center;
  }

  .modal {
    @apply relative z-50 w-full h-full max-h-[90dvh] md:max-h-[70dvh] max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto flex flex-col overflow-hidden rounded-2xl bg-white md:px-3 py-3 pt-12;
  }

  .close-button {
    @apply absolute right-1 top-1 z-50 text-4xl text-red-900 hover:text-red-berry-800;
  }

  .modal-content {
    @apply flex-1 overflow-hidden;
  }

  .payments-iframe-container {
    @apply h-full w-full;
  }
</style>
