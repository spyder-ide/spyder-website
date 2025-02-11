<script>
  import { page } from '$app/stores';
</script>

<div class="mx-auto grid px-8 justify-center items-center">
  <div class="text-center">
    <h1 class="text-[10em] text-red-berry-900 font-extrabold">
      {$page.status}
    </h1>
    <h2 class="text-6xl font-extralight -mt-8">{$page.error.message}</h2>
  </div>
</div>
