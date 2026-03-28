<script>
  import Contacts from "../Components/Contacts.svelte";
</script>

<div class="text-white h-full md:p-2 flex flex-row">
  <div class="md:flex flex-col w-4/12 h-full border-r p-2 pl-0 hidden">
    <div class="mb-auto">
      <h1 class="border-b mb-5 text-lg font-bold">Arcc</h1>
      <h1 class="text-sm font-bold">Programmer</h1>
      <h1 class="text-sm font-bold">Linux Enthusiast</h1>

      <h1 class="mt-5 text-xs font-bold">I use arch btw!</h1>
    </div>
    <div class="md:flex hidden">
      <Contacts />
    </div>
  </div>

  <div class="w-auto md:p-2 md:pr-0 md:pl-5 overflow-scroll text-xs">
    <h1>Hello There!</h1>
    <h1>I'm an 18 y/o malaysian programmer that is interested in</h1>

    <div class="py-2 text-xs">
      <ul>
        <li>Home Labbing</li>
        <li>Web development</li>
        <li>Shaders</li>
        <li>Linux</li>
      </ul>
    </div>

    <h1 class="mb-2">I sometimes post on youtube, go check it out</h1>

    <h1>Feel free to contact me anytime!</h1>

    <div class="md:hidden flex mt-auto">
      <Contacts />
    </div>
  </div>
</div>
