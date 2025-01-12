<script setup lang="ts">

import HomeCard from "@/components/HomeCard.vue";
</script>

<template>
  <HomeCard route="/videoplayer">
    <div class="text-right text-sm group-hover/card:text-base  group-hover/card:font-bold transition-all duration-300 delay-0">
      Video player
    </div>
    <div class="absolute center top-0 left-0 w-full h-full flex items-center justify-center !bg-gradient-circle-c from-black/40 from-15% via-70% via-black/40 to-100% to-black/0">
      <span class="material-icons text-white text-4xl -mt-10">play_arrow</span>
    </div>

    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-neutral-900/60 to-neutral-800/60">
      <div class="flex items-center px-2 mt-2.5">
        <div class="flex flex-1 h-1 bg-neutral-700 rounded-full">
          <div class="h-full bg-white rounded-full" style="width: 50%"></div>
        </div>
      </div>
      <div class="flex items-center p-2 gap-2">
        <span class="material-icons text-white">play_arrow</span>
        <span class="material-icons text-white">skip_previous</span>
        <span class="material-icons text-white">skip_next</span>
        <span class="material-icons text-white">volume_up</span>
        <span class="font-mono text-white text-xs">2:10</span>
        <span class="flex flex-1"></span>
        <span class="font-mono text-white text-xs">4:20</span>
        <span class="material-icons text-white">subtitles</span>
        <span class="material-icons text-white">language</span>
        <span class="material-icons text-white">settings</span>
        <span class="material-icons text-white">fullscreen</span>

      </div>
    </div>

  </HomeCard>
</template>

<style scoped>
.material-icons {
  font-size: 1.2rem;
}
.center .material-icons {
  font-size: 3rem;
  transition: all 0.5s
}
.group\/card:hover  .center .material-icons {
  font-size: 3.5rem;
}
.group\/card:hover  .center .material-icons:hover {
  font-size: 4rem;
}
</style>