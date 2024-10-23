<div class="download container max-w-2xl mt-32">
  <div class="info grid items-center justify-center">
    <div class="grid-center -mx-5">
      <img
        src="/assets/media/header_donations.svg"
        class="w-full"
        alt="Help Keep Spyder Strong!"
      />
      <div class="heart-container">
        <span class="heart heart-beat"></span>
      </div>
    </div>

    <a
      href="https://opencollective.com/spyder"
      class="button my-4 md:my-8 lg:my-16 mx-auto"
      id="donate"
    >
      <img src="/assets/media/icon_donations.svg" alt="Donate!" />
    </a>

    <div class="text-center">
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

  .heart-container {
    position: absolute;
    z-index: 2;
    top: 28%;
    right: 25%;
    display: grid;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }

  .heart {
    @apply bg-red-berry-800;
    position: relative;
    transform: rotate(45deg);
    display: block;
  }

  .heart::before,
  .heart::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: inherit;
    border-radius: 50%;
    display: block;
  }

  .heart::before {
    transform: translateY(-50%);
  }

  .heart::after {
    transform: translateX(-50%);
  }

  .heart-beat {
    height: 6vw;
    width: 6vw;
    animation: beat 1.4s infinite linear;
  }

  .grid-center {
    display: grid;
    position: relative;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  @keyframes beat {
    0% {
      transform: rotate(45deg) scale(1);
    }
    25% {
      transform: rotate(45deg) scale(1);
    }
    30% {
      transform: rotate(45deg) scale(1.4);
    }
    50% {
      transform: rotate(45deg) scale(1.2);
    }
    70% {
      transform: rotate(45deg) scale(1.4);
    }
    100% {
      transform: rotate(45deg) scale(1);
    }
  }
</style>
