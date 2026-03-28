<script lang="ts">
  let {
    title,
    link,
    source,
    description,
  }: { title: string; link?: string; source?: string; description: string } =
    $props();
</script>

<div class="text-white text-xs border rounded-lg p-4">
  <div class="flex space-x-5 border-b">
    <h1 class="text-md font-bold md:text-lg">{title}</h1>
    <div class="mt-auto ml-auto text-blue-400 md:flex hidden space-x-2">
      {#if source}
        <a href={source}>Code</a>
      {/if}
      {#if link}
        <a href={link}>Demo</a>
      {/if}
    </div>
  </div>
  <h1 class="p-2 pl-0">{description}</h1>

  <div class="mt-auto ml-auto text-blue-400 md:hidden flex">
    {#if source}
      <a href={source}>Code </a>
    {/if}
    {#if link}
      <a class="ml-auto" href={link}>Demo</a>
    {/if}
  </div>
</div>
