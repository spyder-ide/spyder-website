<script>
  import { _ } from "svelte-i18n";
  import { onMount } from "svelte";
  import { metadata, colourScheme } from "$lib/store";
  import { page } from "$app/stores";
  import { ogImage } from "$lib/config";
  import { Icon } from "svelte-icons-pack";
  import { BsPersonFill } from "svelte-icons-pack/bs";
  import { BsCalendar } from "svelte-icons-pack/bs";
  import { BsCash } from "svelte-icons-pack/bs";
  import { Doughnut } from "svelte-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from "chart.js";

  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  import Button from "$lib/components/Button.svelte";
  import Metadata from "$lib/components/Metadata.svelte";

  export let data;

  const { project } = data;
  let showModal = false;

  // Colors for light/dark modes
  const colors = {
    light: ['#bebdb3', '#a4a093'],
    dark: ['#888888', '#5d5d5d']
  };

  $: metadata.setMetadata({
    title: `${$_("config.site.title")} | Support project ${project.title}`,
    description: project.content,
    url: $page.url.href,
    image: project.image || ogImage,
  });

  function toggleModal() {
    showModal = !showModal;
  }

  // Close modal with escape key
  function handleKeydown(event) {
    if (event.key === "Escape" && showModal) {
      toggleModal();
    }
  }

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
      return array.reduce((acc, val) => acc + formatNum(val), '');
    }

    const timestamp = new Date().getTime();
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (char) => {
      const rand = (timestamp + 16 * Math.random()) % 16 | 0;
      return (char === "x" ? rand : (3 & rand | 8)).toString(16);
    });
  }

  function getOrSetHubSpotUtk() {
    let utk = window.__hsUserToken;
    if (!utk) {
      const cookies = document.cookie.split(';');
      const utkCookie = cookies.find(c => c.trim().startsWith('hubspotutk='));
      utk = utkCookie ? utkCookie.split('=')[1] : null;
    }
    if (!utk) {
      utk = generateUtk();
      window.__hsUserToken = utk;
    }
    return utk;
  }

  function createPaymentIframe() {
    if (!iframeContainer) return;

    const baseUrl = project.donationLink;
    const params = new URLSearchParams({
      referrer: 'PAYMENT_LINK_EMBED',
      layout: 'embed-full',
      parentPageUrl: `${window.location.origin}${window.location.pathname}`,
      parentHubspotUtk: getOrSetHubSpotUtk()
    });

    if (window.hsVars) {
      params.append('hsVars', JSON.stringify(window.hsVars));
    }

    const iframe = document.createElement('iframe');
    iframe.src = `${baseUrl}&${params.toString()}`;
    iframe.style.width = '100%';
    iframe.style.minWidth = '320px';
    iframe.style.minHeight = '500px';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'payment *';
    iframe.title = 'HubSpot Payment Form';

    // Clear container and add new iframe
    iframeContainer.innerHTML = '';
    iframeContainer.appendChild(iframe);

    // Handle iframe resizing
    messageHandler = (event) => {
      if (!/hubspot(?:qa)?\.com/.test(event.origin)) return;
      const data = event.data || event.message;
      if (data?.height) {
        iframe.style.height = `${data.height}px`;
      }
    };

    window.addEventListener('message', messageHandler);
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      if (messageHandler) {
        window.removeEventListener('message', messageHandler);
      }
    };
  });

  $: if (showModal) {
    // Use setTimeout to ensure the container is mounted
    setTimeout(createPaymentIframe, 0);
  }

  // Progress bar
  $: progress = Math.min(project.donations.progress, 100);

  // Generate supporter icons
  $: supporterIcons = project.donations?.deals.length;

  // Chart.js data with reactive colors
  $: chartData = {
    labels: ["Monthly", "One-time"],
    datasets: [
      {
        data: [
          project.donations?.monthly || 0,
          project.donations?.oneTime || 0,
        ],
        backgroundColor: $colourScheme === 'dark' ? colors.dark : colors.light,
        borderWidth: 0,
      },
    ],
  };

  $: chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `$${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "40%",
  };
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

<Metadata />

<div class="container mt-32">
  <div class="max-w-4xl mx-auto">
    <div class="project-header mb-16">
      <div class="image-container relative mb-8 overflow-hidden rounded-2xl">
        <img
          class="w-full aspect-square md:aspect-video object-cover"
          src={project.image}
          alt={project.title}
        />
        <h1 class="title z-10 absolute bottom-0 left-0">
          {project.title}
        </h1>
      </div>
      <div class="font-light text-lg md:text-xl">
        Current donations: <strong class="font-bold"
          >${project.donations.total.toLocaleString()}</strong
        >
        {#if project.donationGoal}
          of <strong class="font-bold"
            >${project.donationGoal.toLocaleString()}</strong
          >
          <div class="progress-bar-container relative">
            <div class="progress-bar mt-4">
              <div
                class="progress"
                style="width: {progress}%"
              />
            </div>
            <div class="progress-bar-text" style="left: calc({progress}% - 32px)">
              {progress}%
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="md:flex space-y-16 md:space-y-0 md:gap-24">
      <div class="md:w-2/3">
        {#if project.content}
          <div class="content mb-16">
            <p class="text-lg font-light">{project.content}</p>
          </div>
          <div class="flex justify-center md:justify-start">
            <Button
              text={project.button.text}
              highlight={true}
              icon="donate"
              iconSize={32}
              fontSize={18}
            isLink={false}
              on:click={toggleModal}
            />
          </div>
        {/if}
      </div>
      <div class="md:w-1/3">
        {#if project.donations}
          <div class="donations md:-mt-4">
            <div class="donation-breakdown space-y-8">
              <div class="pie-chart-container">
                <Doughnut data={chartData} options={chartOptions} />
                <div class="flex justify-between mt-4 text-xs">
                  <div class="flex items-center">
                    <Icon src={BsCalendar} className="mr-2" size="2em" />
                    <span
                      >{$_('donate.page.monthly')}: ${project.donations.monthly.toLocaleString()}</span
                    >
                  </div>
                  <div class="flex items-center">
                    <Icon src={BsCash} className="mr-2" size="2em" />
                    <span
                      >{$_('donate.page.oneTime')}: ${project.donations.oneTime.toLocaleString()}</span
                    >
                  </div>
                </div>
              </div>

              <div class="supporters-container">
                <div class="flex items-center justify-center gap-1">
                    {#each Array(supporterIcons) as _, i}
                      <Icon
                        src={BsPersonFill}
                        size="1.2em"
                      />
                    {/each}
                </div>
                <p class="text-sm font-light mt-2">
                  {$_('donate.page.supporters')}: {project.donations.deals.length}
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

{#if showModal}
  <button
    type="button"
    class="modal-backdrop"
    on:click={toggleModal}
    on:keydown={handleKeydown}
    aria-label="Close modal"
  />
  <div class="modal">
    <button class="close-button" on:click={toggleModal}>×</button>
    <div class="modal-content">
      <div
        class="payments-iframe-container"
        bind:this={iframeContainer}
      ></div>
    </div>
  </div>
{/if}

<style>
  .title {
    @apply font-extralight text-5xl md:text-7xl text-red-berry-900 bg-white/60 backdrop-blur-sm w-full md:w-auto md:rounded-tr-2xl p-6;
  }

  .progress-bar {
    @apply w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-spring-wood-200;
  }

  .progress-bar-text {
    @apply absolute top-5 left-0 text-sm text-center w-16;
  }

  .progress {
    @apply h-full bg-red-berry-800 dark:bg-red-berry-900 transition-all duration-500;
  }

  .pie-chart-container {
    @apply max-w-60 mx-auto;
  }

  .modal-backdrop {
    @apply fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 z-40;
  }

  .modal {
    @apply fixed inset-8 md:inset-20 lg:inset-40 max-w-2xl mx-auto p-4 pt-12 bg-white rounded-2xl z-50
           flex flex-col overflow-hidden;
  }

  .close-button {
    @apply absolute top-1 right-4 text-4xl text-neutral-500 hover:text-neutral-700
           dark:text-neutral-400 dark:hover:text-neutral-200 z-10;
  }

  .modal-content {
    @apply flex-1 overflow-hidden;
  }

  .payments-iframe-container {
    @apply w-full h-full;
  }

  .supporters-container {
    @apply text-center;
  }
</style>
