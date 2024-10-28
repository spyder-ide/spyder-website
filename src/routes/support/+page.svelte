<script>
  import Logo from "$lib/components/Logo.svelte";
</script>

<div class="download container max-w-2xl mt-32">
    <h1
    class="text-4xl
      xl:tracking-tight
      xl:text-6xl
      text-center
      tracking-tight
      font-extralight
      text-mine-shaft-600
      dark:text-mine-shaft-200
      mb-16 md:mb-32"
    >
    Support Us!
  </h1>

  <div class="border border-spring-wood-200 rounded-lg p-16 bg-contain bg-no-repeat bg-center bg-white shadow-2xl" style="background-image: url('/assets/media/bg.svg')">
    <Logo classes="mb-8 mx-auto"/>

    <div class="text-center mb-8 md:mb-16">
      <p>
        Spyder is a fully independent project, unaffiliated with Anaconda or
        other companies. As it’s developed by and for
        <em><strong>you</strong></em>, our beloved community, we need
        <em><strong>your</strong></em> support to help keep it moving forward!
        Your donation goes directly to funding Spyder development through
        <a href="https://numfocus.org/">NumFOCUS</a>, a recognized charitable
        organization.
      </p>
    </div>
    <a
      href="https://opencollective.com/spyder"
      class="button mx-auto"
      id="donate"
    >
      <img src="/assets/media/icon_donations.svg" alt="Donate!" />
    </a>
  </div>

</div>

<style>
  .button {
    width: 240px;
    height: 100px;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    @apply bg-red-berry-900;
  }

  .button:hover {
    @apply bg-red-berry-800;
  }

  .button img {
    width: 100%;
    height: auto;
  }
</style>
